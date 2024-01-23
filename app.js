var saveAsSvg = function(cy, filename) {
  var svgContent = cy.svg({scale: 2, full: true});
  var blob = new Blob([svgContent], {type:"image/svg+xml;charset=utf-8"});
  saveAs(blob, filename);
};

var getSvgUrl = function(cy) {
  var svgContent = cy.svg({scale: 2, full: true});
  var blob = new Blob([svgContent], {type:"image/svg+xml;charset=utf-8"});
  var url = URL.createObjectURL(blob);
  return url;
};

var saveAsPng = function(cy, filename) {
  var pngContent = cy.png({
    scale: 2, // increase the scale to double the resolution
    full: true // capture the full viewport
  });
  var blob = dataURLtoBlob(pngContent);
  saveAs(blob, filename);
};

// Utility function to convert a data URL to a Blob object
function dataURLtoBlob(dataURL) {
  var binary = atob(dataURL.split(',')[1]);
  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: 'image/png'});
}

var sources = ['AXDROWSY', 'HMHYPERT', 'AXCRYING', 'MH4CARD', 'AXMUSCLE'];
var nodes_source_id = {
  'AXDROWSY': "node[ name = 'AXDROWSY' ], node[ name = 'AXENERGY' ], node[ name = 'MOCA' ], node[ name = 'ADSP_LAN' ], node[ name = 'ADSP_EXF' ], node[ name = 'UW_EF' ], node[ name = 'MMSE' ], node[ name = 'ADSP_VSP' ], node[ name = 'ADSP_MEM' ], node[ name = 'UW_MEM' ]",
  'HMHYPERT': "node[ name = 'HMHYPERT' ], node[ name = 'HMSCORE' ], node[ name = 'ADSP_LAN' ], node[ name = 'ADSP_MEM' ]",
  'AXCRYING': "node[ name = 'AXCRYING' ], node[ name = 'AXDPMOOD' ], node[ name = 'ADSP_MEM' ], node[ name = 'UW_MEM' ], node[ name = 'MMSE' ], node[ name = 'ADSP_EXF' ], node[ name = 'UW_EF' ]",
  'MH4CARD': "node[ name = 'MH4CARD' ], node[ name = 'HMSCORE' ], node[ name = 'ADSP_VSP' ], node[ name = 'ADSP_EXF' ]",
  'AXMUSCLE': "node[ name = 'AXMUSCLE'], node[ name = 'AXENERGY' ], node[ name = 'ADSP_EXF' ], node[ name = 'ADSP_VSP' ], node[ name = 'MMSE' ]"
};
var edges_source_id = {
  'AXDROWSY': "edge[ id = '209' ], edge[ id = '224' ], edge[ id = '227' ], edge[ id = '230' ], edge[ id = '233' ], edge[ id = '236' ], edge[ id = '239' ], edge[ id = '242' ], edge[ id = '245' ]",
  'HMHYPERT': "edge[ id = '278' ], edge[ id = '269' ], edge[ id = '251' ]",
  'AXCRYING': "edge[ id = '284' ], edge[ id = '272' ], edge[ id = '275' ], edge[ id = '263' ], edge[ id = '260' ], edge[ id = '254' ]",
  'MH4CARD': "edge[ id = '281' ], edge[ id = '266' ], edge[ id = '257' ]",
  'AXMUSCLE': "edge[ id = '248' ], edge[ id = '239' ], edge[ id = '236' ], edge[ id = '230' ]"
};

// Set the initial conditions to display
var currentsource = 0;

// Function to load a new dataset
function loadDataset(index_source) {
  var node_source = sources[index_source];
  var edges_id = edges_source_id[node_source];
  var node_id = nodes_source_id[node_source];
  var dataset = {
    "nodes" : [ {
      "data" : {
        "id" : "206",
        "shared_name" : "AXMUSCLE",
        "degree_layout" : 1,
        "name" : "AXMUSCLE",
        "SUID" : 206,
        "id_original" : "AXMUSCLE",
        "value" : "AXMUSCLE",
        "layer" : "RISKFACTORS",
        "selected" : false
      },
      "position" : {
        "x" : 63.76369238339248,
        "y" : 106.54203928760035
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "203",
        "shared_name" : "MH4CARD",
        "degree_layout" : 1,
        "name" : "MH4CARD",
        "SUID" : 203,
        "id_original" : "MH4CARD",
        "value" : "MH4CARD",
        "layer" : "RISKFACTORS",
        "selected" : false
      },
      "position" : {
        "x" : -38.326916960359085,
        "y" : 150.4036265424911
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "200",
        "shared_name" : "AXDPMOOD",
        "degree_layout" : 6,
        "name" : "AXDPMOOD",
        "SUID" : 200,
        "id_original" : "AXDPMOOD",
        "value" : "AXDPMOOD",
        "layer" : "RISKFACTORS",
        "selected" : false
      },
      "position" : {
        "x" : -117.91812448452401,
        "y" : 72.86930486787605
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "197",
        "shared_name" : "AXCRYING",
        "degree_layout" : 1,
        "name" : "AXCRYING",
        "SUID" : 197,
        "id_original" : "AXCRYING",
        "value" : "AXCRYING",
        "layer" : "RISKFACTORS",
        "selected" : false
      },
      "position" : {
        "x" : -102.5159832733807,
        "y" : 108.7187594785828
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "194",
        "shared_name" : "HMSCORE",
        "degree_layout" : 6,
        "name" : "HMSCORE",
        "SUID" : 194,
        "id_original" : "HMSCORE",
        "value" : "HMSCORE",
        "layer" : "RISKFACTORS",
        "selected" : false
      },
      "position" : {
        "x" : -74.56726791267283,
        "y" : 135.94519258060245
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "191",
        "shared_name" : "HMHYPERT",
        "degree_layout" : 1,
        "name" : "HMHYPERT",
        "SUID" : 191,
        "id_original" : "HMHYPERT",
        "value" : "HMHYPERT",
        "layer" : "RISKFACTORS",
        "selected" : false
      },
      "position" : {
        "x" : 0.6878046706260648,
        "y" : 149.89289585946244
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "188",
        "shared_name" : "UW_MEM",
        "name" : "UW_MEM",
        "SUID" : 188,
        "id_original" : "UW_MEM",
        "value" : "UW_MEM",
        "layer" : "PHENOTYPE",
        "selected" : false
      },
      "position" : {
        "x" : -102.99773039150386,
        "y" : -120.40147857446209
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "185",
        "shared_name" : "ADSP_MEM",
        "name" : "ADSP_MEM",
        "SUID" : 185,
        "id_original" : "ADSP_MEM",
        "value" : "ADSP_MEM",
        "layer" : "PHENOTYPE",
        "selected" : false
      },
      "position" : {
        "x" : -77.01631666256435,
        "y" : -91.29176386581821
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "182",
        "shared_name" : "ADSP_VSP",
        "name" : "ADSP_VSP",
        "SUID" : 182,
        "id_original" : "ADSP_VSP",
        "value" : "ADSP_VSP",
        "layer" : "PHENOTYPE",
        "selected" : false
      },
      "position" : {
        "x" : -42.36801739188013,
        "y" : -73.68339473490414
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "179",
        "shared_name" : "MMSE",
        "name" : "MMSE",
        "SUID" : 179,
        "id_original" : "MMSE",
        "value" : "MMSE",
        "layer" : "PHENOTYPE",
        "selected" : false
      },
      "position" : {
        "x" : 33.42381930965712,
        "y" : -84.33524272855357
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "176",
        "shared_name" : "UW_EF",
        "name" : "UW_EF",
        "SUID" : 176,
        "id_original" : "UW_EF",
        "value" : "UW_EF",
        "layer" : "PHENOTYPE",
        "selected" : false
      },
      "position" : {
        "x" : -115.8616212215129,
        "y" : -157.23800477455006
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "173",
        "shared_name" : "ADSP_EXF",
        "name" : "ADSP_EXF",
        "SUID" : 173,
        "id_original" : "ADSP_EXF",
        "value" : "ADSP_EXF",
        "layer" : "PHENOTYPE",
        "selected" : false
      },
      "position" : {
        "x" : 62.533534018304636,
        "y" : -110.31665645750036
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "170",
        "shared_name" : "ADSP_LAN",
        "name" : "ADSP_LAN",
        "SUID" : 170,
        "id_original" : "ADSP_LAN",
        "value" : "ADSP_LAN",
        "layer" : "PHENOTYPE",
        "selected" : false
      },
      "position" : {
        "x" : -3.4127068904344924,
        "y" : -71.4713518985518
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "167",
        "shared_name" : "MOCA",
        "name" : "MOCA",
        "SUID" : 167,
        "id_original" : "MOCA",
        "value" : "MOCA",
        "layer" : "PHENOTYPE",
        "selected" : false
      },
      "position" : {
        "x" : 79.48474705137414,
        "y" : -145.4601583672884
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "164",
        "shared_name" : "AXENERGY",
        "degree_layout" : 10,
        "name" : "AXENERGY",
        "SUID" : 164,
        "id_original" : "AXENERGY",
        "value" : "AXENERGY",
        "layer" : "RISKFACTORS",
        "selected" : false
      },
      "position" : {
        "x" : 36.537259281336446,
        "y" : 134.49075464831913
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "151",
        "shared_name" : "AXDROWSY",
        "degree_layout" : 1,
        "name" : "AXDROWSY",
        "SUID" : 151,
        "id_original" : "AXDROWSY",
        "value" : "AXDROWSY",
        "layer" : "RISKFACTORS",
        "selected" : false
      },
      "position" : {
        "x" : 78.22212634520838,
        "y" : 70.30168833530479
      },
      "selected" : false
    } ],
    "edges" : [ {
      "data" : {
        "id" : "284",
        "source" : "197",
        "target" : "200",
        "color" : "green",
        "weight" : 4.823987500494317,
        "SUID" : 284,
        "source_original" : "AXCRYING",
        "selected" : false,
        "target_original" : "AXDPMOOD"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "281",
        "source" : "194",
        "target" : "203",
        "color" : "orange",
        "weight" : 4.86558843320843,
        "SUID" : 281,
        "source_original" : "HMSCORE",
        "selected" : false,
        "target_original" : "MH4CARD"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "278",
        "source" : "191",
        "target" : "194",
        "color" : "blue",
        "weight" : 4.777770592029267,
        "SUID" : 278,
        "source_original" : "HMHYPERT",
        "selected" : false,
        "target_original" : "HMSCORE"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "275",
        "source" : "188",
        "target" : "200",
        "color" : "green",
        "weight" : 4.816823760969244,
        "SUID" : 275,
        "source_original" : "UW_MEM",
        "selected" : false,
        "target_original" : "AXDPMOOD"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "272",
        "source" : "185",
        "target" : "200",
        "color" : "green",
        "weight" : 4.813109035687891,
        "SUID" : 272,
        "source_original" : "ADSP_MEM",
        "selected" : false,
        "target_original" : "AXDPMOOD"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "269",
        "source" : "185",
        "target" : "194",
        "color" : "blue",
        "weight" : 4.777770592029267,
        "SUID" : 269,
        "source_original" : "ADSP_MEM",
        "selected" : false,
        "target_original" : "HMSCORE"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "266",
        "source" : "182",
        "target" : "194",
        "color" : "orange",
        "weight" : 4.842655941260882,
        "SUID" : 266,
        "source_original" : "ADSP_VSP",
        "selected" : false,
        "target_original" : "HMSCORE"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "263",
        "source" : "179",
        "target" : "200",
        "color" : "green",
        "weight" : 4.818065477276901,
        "SUID" : 263,
        "source_original" : "MMSE",
        "selected" : false,
        "target_original" : "AXDPMOOD"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "260",
        "source" : "176",
        "target" : "200",
        "color" : "green",
        "weight" : 4.823987500494317,
        "SUID" : 260,
        "source_original" : "UW_EF",
        "selected" : false,
        "target_original" : "AXDPMOOD"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "257",
        "source" : "173",
        "target" : "194",
        "color" : "orange",
        "weight" : 4.86558843320843,
        "SUID" : 257,
        "source_original" : "ADSP_EXF",
        "selected" : false,
        "target_original" : "HMSCORE"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "254",
        "source" : "173",
        "target" : "200",
        "color" : "green",
        "weight" : 4.821801101135333,
        "SUID" : 254,
        "source_original" : "ADSP_EXF",
        "selected" : false,
        "target_original" : "AXDPMOOD"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "251",
        "source" : "170",
        "target" : "194",
        "color" : "blue",
        "weight" : 4.763078764442283,
        "SUID" : 251,
        "source_original" : "ADSP_LAN",
        "selected" : false,
        "target_original" : "HMSCORE"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "248",
        "source" : "164",
        "target" : "206",
        "color" : "purple",
        "weight" : 4.960351503102434,
        "SUID" : 248,
        "source_original" : "AXENERGY",
        "selected" : false,
        "target_original" : "AXMUSCLE"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "245",
        "source" : "164",
        "target" : "188",
        "color" : "red",
        "weight" : 4.762474653036561,
        "SUID" : 245,
        "source_original" : "AXENERGY",
        "selected" : false,
        "target_original" : "UW_MEM"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "242",
        "source" : "164",
        "target" : "185",
        "color" : "red",
        "weight" : 4.7594460605244535,
        "SUID" : 242,
        "source_original" : "AXENERGY",
        "selected" : false,
        "target_original" : "ADSP_MEM"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "239",
        "source" : "164",
        "target" : "182",
        "color" : "purple",
        "weight" : 4.942380071246051,
        "SUID" : 239,
        "source_original" : "AXENERGY",
        "selected" : false,
        "target_original" : "ADSP_VSP"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "236",
        "source" : "164",
        "target" : "179",
        "color" : "purple",
        "weight" : 4.960351503102434,
        "SUID" : 236,
        "source_original" : "AXENERGY",
        "selected" : false,
        "target_original" : "MMSE"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "233",
        "source" : "164",
        "target" : "176",
        "color" : "red",
        "weight" : 4.749754540065519,
        "SUID" : 233,
        "source_original" : "AXENERGY",
        "selected" : false,
        "target_original" : "UW_EF"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "230",
        "source" : "164",
        "target" : "173",
        "color" : "purple",
        "weight" : 4.941011894654281,
        "SUID" : 230,
        "source_original" : "AXENERGY",
        "selected" : false,
        "target_original" : "ADSP_EXF"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "227",
        "source" : "164",
        "target" : "170",
        "color" : "red",
        "weight" : 4.738849568078831,
        "SUID" : 227,
        "source_original" : "AXENERGY",
        "selected" : false,
        "target_original" : "ADSP_LAN"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "224",
        "source" : "164",
        "target" : "167",
        "color" : "red",
        "weight" : 4.728723082418918,
        "SUID" : 224,
        "source_original" : "AXENERGY",
        "selected" : false,
        "target_original" : "MOCA"
      },
      "selected" : false
    }, {
      "data" : {
        "id" : "209",
        "source" : "151",
        "target" : "164",
        "color" : "red",
        "weight" : 4.762474653036561,
        "SUID" : 209,
        "source_original" : "AXDROWSY",
        "selected" : false,
        "target_original" : "AXENERGY"
      },
      "selected" : false
    } ],
    "style" : [ {
      "selector" : "node",
      "css" : {
        "text-valign" : "center",
        "text-halign" : "center",
        "text-wrap": "wrap",
        "text-max-width": 50.0,
        "width" : 40.0,
        "background-opacity" : 1.0,
        "background-color" : function(ele) {
          var layer = ele.data('layer');
          if (layer === 'RISKFACTORS') {
              var baseColor = [109, 112, 4];
            } else if (layer == 'PHENOTYPE') {
              var baseColor = [87, 87, 220];
            }
            var colorValue = Math.floor((1-0.75) * 255);
            // Crea el gradiente de color utilizando el valor de color calculado
            var redValue = baseColor[0] + colorValue;
            var greenValue = baseColor[1] + colorValue;
            var blueValue = baseColor[2] + colorValue;
            // Asegura que los valores RGB estén dentro del rango válido de 0 a 255
            redValue = Math.max(0, redValue);
            greenValue = Math.max(0, greenValue);
            blueValue = Math.max(0, blueValue);
            redValue = Math.min(255, redValue);
            greenValue = Math.min(255, greenValue);
            blueValue = Math.min(255, blueValue);
            return 'rgb(' + redValue + ',' + greenValue + ',' + blueValue + ')';
          },
        "font-size" : 7,
        "font-family" : "sans-serif",
        "font-weight" : "bold",
        "border-color" : function(ele) {
          var backgroundColor = ele.css("background-color");
          var rgbArray = backgroundColor.match(/\d+/g);
          var r = parseInt(rgbArray[0]);
          var g = parseInt(rgbArray[1]);
          var b = parseInt(rgbArray[2]);
          var brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
          if (brightness > 125) {
            return '#000000';
          } else {
            return '#ffffff';
          }
        },
        "height" : 40.0,
        "shape" : "ellipse",
        "border-width" : 1.0,
        "text-opacity" : 1.0,
        "border-opacity" : 1.0,
        "color": function(ele) {
          var backgroundColor = ele.css("background-color");
          var rgbArray = backgroundColor.match(/\d+/g);
          var r = parseInt(rgbArray[0]);
          var g = parseInt(rgbArray[1]);
          var b = parseInt(rgbArray[2]);
          var brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
          if (brightness > 125) {
            return '#000000';
          } else {
            return '#ffffff';
          }
        },
        "content" : "data(name)"
      }
    }, {
      "selector" : node_id,
      "css" : {
        "border-color" : "rgb(255,0,0)",
        "border-width" : 2.0,
        "height": 50.0,
        "width": 50.0
      }
    }, {
      "selector" : 'node[name = "' + node_source + '"]',
      "css" : {
        "background-color" : "rgb(255,0,0)"
      }
    }, {
      "selector" : "node:selected",
      "css" : {
        "background-color" : "rgb(255,255,0)"
      }
    }, {
      "selector" : "edge",
      "css" : {
        "text-opacity" : 1.0,
        "line-color" : "rgb(0,0,0)",
        "font-size" : 10,
        "color" : "rgb(0,0,0)",
        "opacity" : 1.0,
        "target-arrow-shape" : "none",
        "source-arrow-shape" : "none",
        "source-arrow-color" : "rgb(0,0,0)",
        "target-arrow-color" : "rgb(0,0,0)",
        "font-family" : "system-ui",
        "font-weight" : "normal",
        "content" : "",
        "width" : 1.0,
        "line-style" : "solid",
        "curve-style": "unbundled-bezier",
        // "control-point-distances": [100, -150]
        // "control-point-weights": [0.5, 0.5]
      }
    }, {
      "selector" : edges_id,
      "css" : {
        "line-color" : "rgb(255,0,0)",
        "width" : 3.0
      }
    }, {
      "selector" : "edge:selected",
      "css" : {
        "line-color" : "rgb(255,0,0)"
      }
    } ]
  };

  var cy = window.cy = cytoscape({
      container: document.getElementById('cy'),
      elements: {
          nodes: dataset.nodes,
          edges: dataset.edges
      },
      style: dataset.style,
      layout: {name: 'preset'}
  });

  return cy;
}

$(document).ready(function() {
  var cy = loadDataset(currentsource);
});

// Event listener for the source selector dropdown
$('#source-select').on('change', function() {
  currentsource = $(this).val();
  var cy = loadDataset(currentsource);
});

// Event listener for the save button
$('#save-button').on('click', function() {
  saveAsSvg(cy, 'network.svg');
});

// Event listener for the view button
$('#view-button').on('click', function() {
  var url = getSvgUrl(cy);
  window.open(url);
});

$('#save-png-button').on('click', function() {
  saveAsPng(cy, 'demo.png');
});