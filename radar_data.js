var h = 1000;
var w = 1450;

var radar_arcs = [
  {
    "name": "ADOPT",
    "r": 130
  },
  {
    "name": "TRIAL",
    "r": 220
  },
  {
    "name": "ASSESS",
    "r": 310
  },
  {
    "name": "HOLD",
    "r": 400
  }
];

// movement:
//   t = moved (triangle)
//   c = stayed put (circle)
//
// blipSize: 
//  This is optional, if you omit this property, then blip size will be 70.
//
// url:
//  This is optional, if you add it then blips will be clickable to some URL.
//
// pc: (polar coordinates)
//  r = distance away from origin ("radial coordinate")
//     - Each level is 100 points away from origin
//  t = angle of the point from origin ("angular coordinate")
//     - 0 degrees is due east
//
var radar_data = [
  { 
    "quadrant": "Techniques",
    "left" : 45,
    "top" : 188,
    "color" : "#8FA227",
    "items" : [
  {
    "name": "Circuit Breaker",
    "pc": {
      "r": 63,
      "t": 139
    },
    "movement": "c"
  },
  {
    "name": "Infrastructure as Code",
    "pc": {
      "r": 52,
      "t": 152
    },
    "movement": "c"
  },
  {
    "name": "Klarna Staging",
    "pc": {
      "r": 60,
      "t": 113
    },
    "movement": "c"
  },
  {
    "name": "Pair Programming",
    "pc": {
      "r": 65,
      "t": 100
    },
    "movement": "c"
  },
  {
    "name": "A Unified Service Stack",
    "pc": {
      "r": 282,
      "t": 136
    },
    "movement": "c"
  },
  {
    "name": "Contracts",
    "pc": {
      "r": 271,
      "t": 96
    },
    "movement": "c"
  },
  {
    "name": "Manual pipeline configuration",
    "pc": {
      "r": 325,
      "t": 150
    },
    "movement": "c"
  },
  {
    "name": "BFF (Backend for Frontend)",
    "pc": {
      "r": 193,
      "t": 134
    },
    "movement": "c"
  },
  {
    "name": "Logstash",
    "pc": {
      "r": 198,
      "t": 158
    },
    "movement": "c"
  }
]
  },
  { 
    "quadrant": "Platforms & Security",
    "left": w-300+30,
    "top" : 188,
    "color" : "#587486",
    "items" : [
  {
    "name": "Penetration tests",
    "pc": {
      "r": 105,
      "t": 23
    },
    "movement": "c"
  },
  {
    "name": "Regular machine replacement",
    "pc": {
      "r": 63,
      "t": 36
    },
    "movement": "c"
  },
  {
    "name": "Static analysis as part of pipeline",
    "pc": {
      "r": 86,
      "t": 49
    },
    "movement": "c"
  },
  {
    "name": "Regular application security training",
    "pc": {
      "r": 258,
      "t": 56
    },
    "movement": "c"
  },
  {
    "name": "Long-lived instances",
    "pc": {
      "r": 362,
      "t": 76
    },
    "movement": "c"
  },
  {
    "name": "Periodic blackbox vulnerability scanning",
    "pc": {
      "r": 155,
      "t": 68
    },
    "movement": "c"
  }
]
  },
  {   
    "quadrant": "Tools",
    "left" :45,
    "top" : (h/2 + 38),
    "color" : "#DC6F1D",
    "items" : [
  {
    "name": "Ansible",
    "pc": {
      "r": 81,
      "t": 229
    },
    "movement": "c"
  },
  {
    "name": "Docker",
    "pc": {
      "r": 94,
      "t": 255
    },
    "movement": "c"
  },
  {
    "name": "Git",
    "pc": {
      "r": 106,
      "t": 242
    },
    "movement": "c"
  },
  {
    "name": "JSON Web Token (JWT)",
    "pc": {
      "r": 118,
      "t": 190
    },
    "movement": "c"
  },
  {
    "name": "NGINX",
    "pc": {
      "r": 109,
      "t": 203
    },
    "movement": "c"
  },
  {
    "name": "API Blueprints",
    "pc": {
      "r": 281,
      "t": 236
    },
    "movement": "c"
  },
  {
    "name": "Airbrake/errbit",
    "pc": {
      "r": 378,
      "t": 224
    },
    "movement": "c"
  },
  {
    "name": "Chef",
    "pc": {
      "r": 348,
      "t": 192
    },
    "movement": "c"
  },
  {
    "name": "MySQL",
    "pc": {
      "r": 367,
      "t": 240
    },
    "movement": "c"
  },
  {
    "name": "Redislabs",
    "pc": {
      "r": 351,
      "t": 184
    },
    "movement": "c"
  },
  {
    "name": "Smartstack",
    "pc": {
      "r": 334,
      "t": 216
    },
    "movement": "c"
  },
  {
    "name": "Avro",
    "pc": {
      "r": 141,
      "t": 236
    },
    "movement": "c"
  }
]
  },
  { 
    "quadrant": "Languages & Frameworks",
    "color" : "#B70062",
    "left"  : (w-300+30),
    "top" :   (h/2 + 38),
    "items" : [
  {
    "name": "Dropwizard",
    "pc": {
      "r": 118,
      "t": 332
    },
    "movement": "c"
  },
  {
    "name": "Erlang",
    "pc": {
      "r": 70,
      "t": 319
    },
    "movement": "c"
  },
  {
    "name": "Java",
    "pc": {
      "r": 99,
      "t": 280
    },
    "movement": "c"
  },
  {
    "name": "JavaScript",
    "pc": {
      "r": 117,
      "t": 293
    },
    "movement": "c"
  },
  {
    "name": "PHP",
    "pc": {
      "r": 91,
      "t": 306
    },
    "movement": "c"
  },
  {
    "name": "Python",
    "pc": {
      "r": 88,
      "t": 345
    },
    "movement": "c"
  },
  {
    "name": "React",
    "pc": {
      "r": 90,
      "t": 338
    },
    "movement": "c"
  },
  {
    "name": "Ruby",
    "pc": {
      "r": 112,
      "t": 286
    },
    "movement": "c"
  },
  {
    "name": "Golang",
    "pc": {
      "r": 258,
      "t": 326
    },
    "movement": "c"
  },
  {
    "name": "vue.js",
    "pc": {
      "r": 269,
      "t": 346
    },
    "movement": "c"
  },
  {
    "name": "AngularJS",
    "pc": {
      "r": 335,
      "t": 314
    },
    "movement": "c"
  },
  {
    "name": "Backbone",
    "pc": {
      "r": 389,
      "t": 282
    },
    "movement": "c"
  },
  {
    "name": "CoffeeScript",
    "pc": {
      "r": 346,
      "t": 338
    },
    "movement": "c"
  },
  {
    "name": "Foundation",
    "pc": {
      "r": 343,
      "t": 274
    },
    "movement": "c"
  },
  {
    "name": "jQuery",
    "pc": {
      "r": 344,
      "t": 298
    },
    "movement": "c"
  },
  {
    "name": "Clojure",
    "pc": {
      "r": 160,
      "t": 350
    },
    "movement": "c"
  },
  {
    "name": "React Native",
    "pc": {
      "r": 154,
      "t": 338
    },
    "movement": "c"
  },
  {
    "name": "Scala",
    "pc": {
      "r": 208,
      "t": 314
    },
    "movement": "c"
  }
]
  }
];
