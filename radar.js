function init(h,w) {
	   
var radar = new pv.Panel()
  .width(w)
  .height(h)
  .canvas('radar');

// headline
radar.add(pv.Label)
  .left(40)
  .top(78)
  .text("Klarna Tech Radar")
  .font("40px sans-serif");

// legend
radar.add(pv.Dot)
  .top(940)
  .left(200)
  .shape("circle")
  .fillStyle("grey")
  .strokeStyle("grey")
  .size(16)
  .anchor("right")
  .add(pv.Label)
    .text("unchanged")
    .textStyle("black")
radar.add(pv.Dot)
  .top(940)
  .left(276)
  .shape("triangle")
  .fillStyle("grey")
  .strokeStyle("grey")
  .size(16)
  .angle(45)
  .anchor("right")
  .add(pv.Label)
    .text("changed")
    .textStyle("black")
radar.add(pv.Dot)
  .top(940)
  .left(344)
  .shape("diamond")
  .fillStyle("grey")
  .strokeStyle("grey")
  .size(16)
  .anchor("right")
  .add(pv.Label)
  .text("hold, discuss")
  .textStyle("black")
radar.add(pv.Dot)
  .top(940)
  .left(429)
  .shape("square")
  .fillStyle("grey")
  .strokeStyle("grey")
  .size(16)
  .anchor("right")
  .add(pv.Label)
  .text("hold, consolidation")
  .textStyle("black")
radar.add(pv.Dot)
  .top(940)
  .left(541)
  .shape("triangle")
  .fillStyle("grey")
  .strokeStyle("grey")
  .size(16)
  .anchor("right")
  .add(pv.Label)
  .text("hold, avoid")
  .textStyle("black");

// explanation
  radar.add(pv.Label)
    .left(205)
    .top(960)
    .text("Hover over a blip to get more information. Click a blip to go to the explanation.")

//quadrant lines -- vertical
radar.add(pv.Line)
  .data([(h/2-radar_arcs[radar_arcs.length-1].r),h-(h/2-radar_arcs[radar_arcs.length-1].r)])
  .lineWidth(1)
  .left(w/2)        
  .bottom(function(d) {return d;})       
  .strokeStyle("#bbb");

//quadrant lines -- horizontal 
radar.add(pv.Line)
  .data([(w/2-radar_arcs[radar_arcs.length-1].r),w-(w/2-radar_arcs[radar_arcs.length-1].r)])
  .lineWidth(1)
  .bottom(h/2)
  .left(function(d) {return d;})       
  .strokeStyle("#bbb");

// arcs
radar.add(pv.Dot)
  .data(radar_arcs)
  .left(w/2)
  .bottom(h/2)
  .radius(function(d) { return d.r; })
  .strokeStyle("#ccc")
  .anchor("top")
  .add(pv.Label)
    .textBaseline("top")
    .textMargin(40)
    .text(function(d) { return d.name; })
    .textStyle("#ccc")
    .font("bold 40px sans-serif");

//Quadrant Ledgends
var radar_quadrant_ctr=1;
var quadrantFontSize = 18;
var headingFontSize = 14;
var stageHeadingCount = 0;
var lastRadius = 0;
var lastQuadrant='';
var spacer = 16;
var fontSize = 10;
var total_index = 1;


for (var i = 0; i < radar_data.length; i++) {

  // quadrant title
  if (lastQuadrant != radar_data[i].quadrant) {
    lastQuadrant = radar_data[i].quadrant;
    radar.add(pv.Label)         
      .left(radar_data[i].left)         
      .top(radar_data[i].top)  
      .text(radar_data[i].quadrant)		 
      .strokeStyle(radar_data[i].color)
      .fillStyle(radar_data[i].color)                    
      .font(quadrantFontSize + "px sans-serif");
  }

  // re-order the items by radius, in order to logically group by ring
  var itemsByStage = _.groupBy(radar_data[i].items, function(item) { 
    if (item.pc.r <= radar_arcs[0].r) return 0;
    if (item.pc.r <= radar_arcs[1].r) return 1;
    if (item.pc.r <= radar_arcs[2].r) return 2;
    return 3;
  });
  var offsetIndex = 0;
  var midIndex = -1;

  for (var stageIndex in itemsByStage) {
    if (stageIndex > 0  && _.has(itemsByStage, stageIndex-1)) {
      offsetIndex = offsetIndex + itemsByStage[stageIndex-1].length + 1; 
    }
    if ((stageIndex > 1) && (midIndex < 0)) {
      midIndex = offsetIndex;
    }

    var left = radar_data[i].left;
    var top = radar_data[i].top + quadrantFontSize + spacer + (stageIndex * headingFontSize) + (offsetIndex * fontSize);
    if (stageIndex > 1) {
      left = left + 130;
      top = top - (2 * headingFontSize) - (midIndex * fontSize);
    }

    // stage label
    radar.add(pv.Label)         
      .left(left + headingFontSize)
      .top(top - headingFontSize / 2)
      .text(radar_arcs[stageIndex].name)
      .strokeStyle("#ccc")
      .fillStyle("#ccc")                    
      .font(headingFontSize + "px Courier New");

    // legend label
    radar.add(pv.Label)             
      .left(left)         
      .top(top)
      .strokeStyle(radar_data[i].color)
      .fillStyle(radar_data[i].color)                    
      .add(pv.Dot)            
        .def("i", top)
        .data(itemsByStage[stageIndex])            
        .top(function() { return ( this.i() + (this.index * fontSize) );})   
        .shape(function(d) {return d.shape.name; })
        .title(function(d) { return d.name + (d.reason ? (" (" + d.reason + ")") : "") + ": " + d.tags; })
        .cursor(function(d) { return ( d.url !== undefined ? "pointer" : "auto" ); })
        .event("click", function(d) { if ( d.url !== undefined ){self.location =  d.url}}) 
        .size(fontSize) 
        .angle(function(d) { return d.shape.angle; })
        .anchor("right")                
        .add(pv.Label)                
          .text(function(d) {return radar_quadrant_ctr++ + ". " + d.name;} );

    // the blip itself
    radar.add(pv.Dot)       
      .def("active", false)
      .data(itemsByStage[stageIndex])
      .size(function(d) { return (d.blipSize !== undefined ? d.blipSize : 70); })
      .left(function(d) { return polar_to_raster(d.pc.r, d.pc.t)[0]; })
      .bottom(function(d) { return polar_to_raster(d.pc.r, d.pc.t)[1]; })                                
      .title(function(d) { return d.name + (d.reason ? (" (" + d.reason + ")") : "") + ": " + d.tags; })
      .cursor(function(d) { return ( d.url !== undefined ? "pointer" : "auto" ); })                                                            
      .event("click", function(d) { if ( d.url !== undefined ){self.location =  d.url}})
      .angle(function(d) { return d.shape.angle; })
      .strokeStyle(radar_data[i].color)
      .fillStyle(radar_data[i].color)
      .shape(function(d) { return d.shape.name; })
      .anchor("center")
        .add(pv.Label)
        .text(function(d) {return total_index++;}) 
        .textBaseline("middle")
        .textStyle("white");
    }
  }      
       
  radar.anchor('radar');
  radar.render();   
};
