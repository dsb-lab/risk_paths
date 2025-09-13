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
var sources_num = ["181", "204", "196", "218", "192"]
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

const mapping = {
  "APOE_A1": "1",
  "APOE_A2": "2",
  "APOE": "3",
  "TOMM40_A1": "4",
  "TOMM40_A2": "5",
  "PHS": "6",
  "CIR": "7",
  "EUR_AB42": "8",
  "EUR_AB42/40": "9",
  "FUJI_AB42": "10",
  "FUJI_AB42/40": "11",
  "UGOT_PLASMAPTAU": "12",
  "TS_RATIO": "13",
  "TS_RATIO_ADJ": "14",
  "TL": "15",
  "BACE": "16",
  "APP": "17",
  "UPK_AB42": "18",
  "UPK_TAU": "19",
  "UPK_PTAU": "20",
  "UPKelec_AB42": "21",
  "UPKelec_TAU": "22",
  "UPKelec_PTAU": "23",
  "UPplasma_AB42": "24",
  "MEAN_METAROI_PONSVERMIS": "25",
  "BRAAK1_SUVR": "26",
  "BRAAK34_SUVR": "27",
  "BRAAK56_SUVR": "28",
  "CEREBELLUMGREYMATTER_AV45": "29",
  "WHOLECEREBELLUM_AV45": "30",
  "FRONTAL_AV45": "31",
  "CINGULATE_AV45": "32",
  "PARIETAL_AV45": "33",
  "TEMPORAL_AV45": "34",
  "COMPOSITE_AV45": "35",
  "SUMMARYSUVR_WHOLECEREBNORM_AV45": "36",
  "SUMMARYSUVR_COMPOSITE_REFNORM_AV45": "37",
  "LH_CAUDALANTERIORCINGULATE_AV45": "38",
  "LH_CAUDALMIDDLEFRONTAL_AV45": "39",
  "LH_CUNEUS_AV45": "40",
  "LH_ENTORHINAL_AV45": "41",
  "LH_FRONTALPOLE_AV45": "42",
  "LH_FUSIFORM_AV45": "43",
  "LH_INFERIORPARIETAL_AV45": "44",
  "LH_INFERIORTEMPORAL_AV45": "45",
  "LH_INSULA_AV45": "46",
  "LH_ISTHMUSCINGULATE_AV45": "47",
  "LH_LATERALOCCIPITAL_AV45": "48",
  "LH_LATERALORBITOFRONTAL_AV45": "49",
  "LH_LINGUAL_AV45": "50",
  "LH_MEDIALORBITOFRONTAL_AV45": "51",
  "LH_MIDDLETEMPORAL_AV45": "52",
  "LH_PARACENTRAL_AV45": "53",
  "LH_PARAHIPPOCAMPAL_AV45": "54",
  "LH_PARSOPERCULARIS_AV45": "55",
  "LH_PARSORBITALIS_AV45": "56",
  "LH_PARSTRIANGULARIS_AV45": "57",
  "LH_POSTCENTRAL_AV45": "58",
  "LH_POSTERIORCINGULATE_AV45": "59",
  "LH_PRECENTRAL_AV45": "60",
  "LH_PRECUNEUS_AV45": "61",
  "LH_ROSTRALANTERIORCINGULATE_AV45": "62",
  "LH_ROSTRALMIDDLEFRONTAL_AV45": "63",
  "LH_SUPERIORFRONTAL_AV45": "64",
  "LH_SUPERIORPARIETAL_AV45": "65",
  "LH_SUPERIORTEMPORAL_AV45": "66",
  "LH_SUPRAMARGINAL_AV45": "67",
  "LH_TEMPORALPOLE_AV45": "68",
  "LH_TRANSVERSETEMPORAL_AV45": "69",
  "RH_CAUDALANTERIORCINGULATE_AV45": "70",
  "RH_CAUDALMIDDLEFRONTAL_AV45": "71",
  "RH_CUNEUS_AV45": "72",
  "RH_ENTORHINAL_AV45": "73",
  "RH_FRONTALPOLE_AV45": "74",
  "RH_FUSIFORM_AV45": "75",
  "RH_INFERIORPARIETAL_AV45": "76",
  "RH_INFERIORTEMPORAL_AV45": "77",
  "RH_INSULA_AV45": "78",
  "RH_ISTHMUSCINGULATE_AV45": "79",
  "RH_LATERALOCCIPITAL_AV45": "80",
  "RH_LATERALORBITOFRONTAL_AV45": "81",
  "RH_LINGUAL_AV45": "82",
  "RH_MEDIALORBITOFRONTAL_AV45": "83",
  "RH_MIDDLETEMPORAL_AV45": "84",
  "RH_PARACENTRAL_AV45": "85",
  "RH_PARAHIPPOCAMPAL_AV45": "86",
  "RH_PARSOPERCULARIS_AV45": "87",
  "RH_PARSORBITALIS_AV45": "88",
  "RH_PARSTRIANGULARIS_AV45": "89",
  "RH_POSTCENTRAL_AV45": "90",
  "RH_POSTERIORCINGULATE_AV45": "91",
  "RH_PRECENTRAL_AV45": "92",
  "RH_PRECUNEUS_AV45": "93",
  "RH_ROSTRALANTERIORCINGULATE_AV45": "94",
  "RH_ROSTRALMIDDLEFRONTAL_AV45": "95",
  "RH_SUPERIORFRONTAL_AV45": "96",
  "RH_SUPERIORPARIETAL_AV45": "97",
  "RH_SUPERIORTEMPORAL_AV45": "98",
  "RH_SUPRAMARGINAL_AV45": "99",
  "RH_TEMPORALPOLE_AV45": "100",
  "RH_TRANSVERSETEMPORAL_AV45": "101",
  "ANGULL01_FDG": "102",
  "ANGULR01_FDG": "103",
  "ANGULR02_FDG": "104",
  "ANGULL02_FDG": "105",
  "ANGULR03_FDG": "106",
  "ANGULR04_FDG": "107",
  "ANGULR05_FDG": "108",
  "CINGPSTL01_FDG": "109",
  "CINGPSTL02_FDG": "110",
  "CINGPST03_FDG": "111",
  "CINGPST04_FDG": "112",
  "CINGPST05_FDG": "113",
  "CINGPST07_FDG": "114",
  "CINGPST09_FDG": "115",
  "CINGPSTR12_FDG": "116",
  "TMPINFR01_FDG": "117",
  "TMPINFL02_FDG": "118",
  "TMPINFL03_FDG": "119",
  "TMPINFR03_FDG": "120",
  "TMPINFL04_FDG": "121",
  "TMPINFR04_FDG": "122",
  "TMPINFR05_FDG": "123",
  "TMPINFL06_FDG": "124",
  "TMPINFR06_FDG": "125",
  "TMPINFL09_FDG": "126",
  "TMPINFL10_FDG": "127",
  "TMPINFL11_FDG": "128",
  "HCI_FDG": "129",
  "HCI_2014_FDG": "130",
  "CEREB_TCV": "131",
  "CEREB_TCB": "132",
  "CEREB_TCC": "133",
  "CEREB_GRAY": "134",
  "CEREB_WHITE": "135",
  "L_HIPPO": "136",
  "R_HIPPO": "137",
  "TBM_1": "138",
  "TBM_2": "139",
  "IPCA": "140",
  "LHIPPO": "141",
  "RHIPPO": "142",
  "ST103CV": "143",
  "ST111CV": "144",
  "ST115CV": "145",
  "ST116CV": "146",
  "ST118CV": "147",
  "ST119CV": "148",
  "ST12SV": "149",
  "ST24CV": "150",
  "ST26CV": "151",
  "ST29SV": "152",
  "ST31CV": "153",
  "ST32CV": "154",
  "ST35CV": "155",
  "ST40CV": "156",
  "ST44CV": "157",
  "ST52CV": "158",
  "ST55CV": "159",
  "ST56CV": "160",
  "ST57CV": "161",
  "ST59CV": "162",
  "ST60CV": "163",
  "ST71SV": "164",
  "ST74CV": "165",
  "ST83CV": "166",
  "ST85CV": "167",
  "ST88SV": "168",
  "ST90CV": "169",
  "ST91CV": "170",
  "ST94CV": "171",
  "ST99CV": "172",
  "AXNAUSEA": "173",
  "AXVOMIT": "174",
  "AXDIARRH": "175",
  "AXCONSTP": "176",
  "AXABDOMN": "177",
  "AXSWEATN": "178",
  "AXDIZZY": "179",
  "AXENERGY": "180",
  "AXDROWSY": "181",
  "AXVISION": "182",
  "AXHDACHE": "183",
  "AXDRYMTH": "184",
  "AXBREATH": "185",
  "AXCOUGH": "186",
  "AXPALPIT": "187",
  "AXCHEST": "188",
  "AXURNDIS": "189",
  "AXURNFRQ": "190",
  "AXANKLE": "191",
  "AXMUSCLE": "192",
  "AXRASH": "193",
  "AXINSOMN": "194",
  "AXDPMOOD": "195",
  "AXCRYING": "196",
  "AXELMOOD": "197",
  "AXWANDER": "198",
  "AXFALL": "199",
  "HMONSET": "200",
  "HMSTEPWS": "201",
  "HMSOMATC": "202",
  "HMEMOTIO": "203",
  "HMHYPERT": "204",
  "HMSTROKE": "205",
  "HMNEURSM": "206",
  "HMNEURSG": "207",
  "HMSCORE": "208",
  "PTGENDER": "209",
  "PTDOBYY": "210",
  "PTHAND": "211",
  "PTMARRY": "212",
  "PTEDUCAT": "213",
  "GDS": "214",
  "MHPSYCH": "215",
  "MH2NEURL": "216",
  "MH3HEAD": "217",
  "MH4CARD": "218",
  "MH5RESP": "219",
  "MH6HEPAT": "220",
  "MH7DERM": "221",
  "MH8MUSCL": "222",
  "MH9ENDO": "223",
  "MH10GAST": "224",
  "MH11HEMA": "225",
  "MH12RENA": "226",
  "MH13ALLE": "227",
  "MH14ALCH": "228",
  "MH15DRUG": "229",
  "MH16SMOK": "230",
  "MH17MALI": "231",
  "MH18SURG": "232",
  "MMSE": "233",
  "MOCA": "234",
  "CDR": "235",
  "ADSP_DX": "236",
  "ADSP_MEM": "237",
  "ADSP_EXF": "238",
  "ADSP_LAN": "239",
  "ADSP_VSP": "240",
  "ADAS11": "241",
  "ADAS13": "242",
  "UW_MEM": "243",
  "UW_EF": "244"
}

Object.keys(nodes_source_id).forEach(function(key) {
  let selectors = nodes_source_id[key];

  // Reemplaza cada ocurrencia de "name = 'XYZ'" por el número mapeado
  Object.keys(mapping).forEach(function(originalName) {
      const regex = new RegExp("name = '" + originalName + "'", "g");
      if (selectors.includes(originalName)) {
          selectors = selectors.replace(regex, "name = '" + mapping[originalName] + "'");
      }
  });

  // Actualizamos el valor
  nodes_source_id[key] = selectors;
});

// Function to load a new dataset
function loadDataset(index_source) {
  var node_source = sources[index_source];
  var edges_id = edges_source_id[node_source];
  var node_id = nodes_source_id[node_source];
  var node_source_num = sources_num[index_source]
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
        "font-size" : 19,
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
      "selector" : 'node[name = "' + node_source_num + '"]',
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
  
  dataset.nodes.forEach(function(node) {
      if (mapping[node.data.id_original]) {
        node.data.name = mapping[node.data.id_original];
        }
    });
  

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