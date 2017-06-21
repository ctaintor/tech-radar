#!/usr/bin/env ruby

require "csv"
require "json"
require "liquid"

class Hash
  def remap(hash={})
    each {|k, v| yield hash, k, v}
    hash
  end
end


ARCS = [
    {name: 'ADOPT', r: 130},
    {name: 'TRIAL', r: 220},
    {name: 'ASSESS', r: 310},
    {name: 'HOLD', r: 400}
]

class Layout

  OFFSET = {
      'Platforms & Security' => 0,
      'Techniques' => 90,
      'Tools' => 180,
      'Languages & Frameworks' => 270,
  }

  def self.angles(start, step)
    Proc.new do
      Range.new(start, 90-start).step(step).to_a.shuffle +
          Range.new(start + (step * 0.5).to_i, 90-start).step(step).to_a.shuffle
    end
  end

  ANGLES = {
      'adopt' => angles(4, 5),
      'trial' => angles(8, 12),
      'assess' => angles(6, 10),
      'hold' => angles(4, 8)
  }

  def self.instance(quadrant, ring)
    @instances ||= {}
    @instances["#{quadrant}:#{ring}"] ||= Layout.new(quadrant, ring)
  end

  def initialize(quadrant, ring)
    @offset = OFFSET[quadrant]
    @angles = ANGLES[ring].call
  end

  def next_angle
    @offset + @angles.shift.to_i
  end
end


class Blip
  attr_reader :name, :quadrant, :ring, :reason, :tags, :url

  def initialize(name, quadrant, ring, reason, tags, url)
    @name, @quadrant, @ring, @reason, @tags, @url = name, quadrant, ring, reason, tags, url
    @moved = false
  end

  def moved!
    @moved = true
  end

  def radius
    case ring
      when 'adopt'
        (30..ARCS[0][:r]-10).to_a.sample
      when 'trial'
        (ARCS[0][:r]+10..ARCS[1][:r]-10).to_a.sample
      when 'assess'
        (ARCS[1][:r]+10..ARCS[2][:r]-10).to_a.sample
      when 'hold'
        (ARCS[2][:r]+10..ARCS[3][:r]-10).to_a.sample
    end
  end

  def angle
    Layout.instance(quadrant, ring).next_angle
  end

  def movement
    @moved ? "t" : "c"
  end

  def sortkey
    [ring, name.downcase]
  end

  def shape
    if ring == 'hold'
      case reason
        when 'Discuss'
          {name: 'diamond', angle: 0}
        when 'Consolidation'
          {name: 'square', angle: 0}
        when 'Avoid'
          {name: 'triangle', angle: 0}
      end
    else
      @moved ? {name: 'triangle', angle: 45} : {name: 'circle', angle: 0}
    end
  end

  def as_json
    {name: name, pc: {r: radius, t: angle}, shape: shape, url: url, tags: tags, reason: reason}
  end
end


class Radar
  def initialize(path)
    @blips = Radar.parse(path)
  end

  def [](name)
    @blips[name]
  end

  def track_moves(previous)
    @blips.each do |name, blip|
      prev_ring = previous[name].ring rescue "nil"
      if prev_ring != blip.ring
        puts "#{name}: #{prev_ring.upcase} --> #{blip.ring.upcase}"
        blip.moved!
      end
    end
  end

  # render blips as json into js template
  def render
    snippets = @blips.values.group_by(&:quadrant).remap do |hash, key, value|
      short_key = key.scan(/\w+/).first.downcase
      hash[short_key] = JSON.pretty_generate(value.sort_by(&:sortkey).map(&:as_json))
    end
    snippets["arcs"] = JSON.pretty_generate(ARCS)
    template = Liquid::Template.parse(open("radar_data.js.liquid").read)
    open("radar_data.js", "w") do |out|
      out.puts template.render(snippets)
    end
  end

  # parse tab-separated data (exported from google doc)
  def self.parse(path)
    blips = {}
    CSV.open(path, 'rb', headers: true, col_sep: "\t").each do |line|
      next if line['Ring'].nil? || line['Ring'].strip.empty?
      blip = Blip.new(
          line['Name'],
          line['Quadrant'],
          line['Ring'],
          line['Reason'],
          line['Tags'],
          line['Url']
      )
      blips[blip.name] = blip
    end
    blips
  end
end

files = Dir["data/*.tsv"]
radar = Radar.new(files.pop)
previous = files.pop
radar.track_moves(Radar.new(previous)) if previous
radar.render

