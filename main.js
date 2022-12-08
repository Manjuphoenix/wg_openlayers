import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import {fromLonLat} from "ol/proj";
import {coordinates} from "ol/geom/flat/reverse";
import {packColor} from "ol/renderer/webgl/shaders";



var yourData;
$.ajax({
  type: 'GET',
  url: 'http://10.84.240.111/dummy.php?esr=3',
  dataType: 'json',
  success: function(data) {
    yourData=data;
    //and whatever you need
  },
  data: {},
  async: false
});
console.log(yourData)

// displayProjection: new OpenLayers.Projection("EPSG:3857")

var wg_villages = new TileLayer({
    opacity: 0.4,
    title: 'villages',
    source: new TileWMS({
        // projection: map.displayProjection,
        url: 'http://localhost:8080/geoserver/WesternGhats/wms',
        params: {'LAYERS': 'WesternGhats:wg_villages', 'TILED': true},
        serverType: 'geoserver',
        visible: true
    })
});

var wg_taluks = new TileLayer({
    title: 'taluks',
    source: new TileWMS({
        // projection: map.displayProjection,
        url: 'http://localhost:8080/geoserver/WesternGhats/wms',
        params: {'LAYERS': 'WesternGhats:wg_taluks', 'TILED': true},
        serverType: 'geoserver',
        visible: true
    })
});



// var wg_districts = new TileLayer({
//     title: 'districts',
//     source: new TileWMS({
//         url: 'http://localhost:8080/geoserver/WesternGhats/wms',
//         params: {'LAYERS': 'WesternGhats:wg_districts', 'TILED': true},
//         serverType: 'geoserver',
//         visible: true
//     })
// });

var wg_states_layer = new TileLayer({
    title: 'states',
    source: new TileWMS({
        // projection: map.displayProjection,
        url: 'http://localhost:8080/geoserver/WesternGhats/wms',
        params: {'LAYERS': 'WesternGhats:wg_states', 'TILED': true},
        serverType: 'geoserver',
        visible: true
    })
});

var wg_grids = new TileLayer({
    title: 'districts',
    source: new TileWMS({
        // projection: map.displayProjection,
        url: 'http://localhost:8080/geoserver/WesternGhats/wms',
        params: {'LAYERS': 'WesternGhats:wg_grids', 'TILED': true},
        serverType: 'geoserver',
        visible: true
    })
});

var wg_westernghats = new TileLayer({
    title: 'western_ghats',
    source: new TileWMS({
        // projection: map.displayProjection,
        url: 'http://localhost:8080/geoserver/WesternGhats/wms',
        params: {'LAYERS': 'WesternGhats:western_ghats', 'TILED': true},
        serverType: 'geoserver',
        visible: true
    })
});

var wg_districts = new TileLayer({
    title: 'districts',
    source: new TileWMS({
        url: 'http://localhost:8080/geoserver/WesternGhats/wms',
        params: {'LAYERS': 'WesternGhats:wg_districts', 'TILED': true},
        serverType: 'geoserver',
        visible: true
    })
});

function westernghats() {
    map.addLayer(wg_westernghats);
    map.on('singleclick', function (evt) {
  const viewResolution = /** @type {number} */ (view.getResolution());
  // wg_villages.addFeature(selected_polygon_style);
  var url = wg_westernghats.getSource().getFeatureInfoUrl(
    evt.coordinate,
    viewResolution,
    'EPSG:3857',
    {
        'LAYERS': 'WesternGhats:western_ghats',
    }
  );
  // console.log(url);
  if (url) {
    fetch(url)
      .then((response) => response.text()
      )
      .then((text) => {
        // document.getElementById('info').innerText = text;
        // console.log(text);
        var ESR = "";
        console.log(text);
        var index = text.indexOf('id');
                var newstring = text.slice(index);
                // console.log(newstring)
                // var newindex1 = text.indexOf('IISC_WGESR');
                // IISC_EWG = text.slice(newindex1);
                ESR = newstring.split("\n");
        document.getElementById('westernghats_area').innerText = ESR[1];
        document.getElementById('westernghats_ar').innerText = ESR[2];
      });
  }
});
};

function grids() {
    map.addLayer(wg_grids);
    map.on('singleclick', function (evt) {
  const viewResolution = /** @type {number} */ (view.getResolution());
  // wg_villages.addFeature(selected_polygon_style);
  var url = wg_grids.getSource().getFeatureInfoUrl(
    evt.coordinate,
    viewResolution,
    'EPSG:3857',
    {
        'LAYERS': 'WesternGhats:wg_grids',
    }
  );
  // console.log(url);
  if (url) {
    fetch(url)
      .then((response) => response.text()
      )
      .then((text) => {
        // document.getElementById('info').innerText = text;
        // console.log(text);
        var ESR = "";
        console.log(text);
        var index = text.indexOf('id');
                var newstring = text.slice(index);
                // console.log(newstring)
                // var newindex1 = text.indexOf('IISC_WGESR');
                // IISC_EWG = text.slice(newindex1);
                ESR = newstring.split("\n");
        document.getElementById('grid_id').innerText = ESR[2];
        document.getElementById('grid_nid').innerText = ESR[3];
        document.getElementById('grid_intfsum').innerText = ESR[4];
        document.getElementById('grid_forest18').innerText = ESR[5];
        document.getElementById('grid_forest18p').innerText = ESR[6];
        document.getElementById('grid_intfor').innerText = ESR[7];
        document.getElementById('grid_elevmean').innerText = ESR[8];
        document.getElementById('grid_slopemean').innerText = ESR[9];
        document.getElementById('grid_state_name').innerText = ESR[10];
        document.getElementById('grid_wgrainfall').innerText = ESR[11];
        document.getElementById('grid_population').innerText = ESR[12];
        document.getElementById('grid_tribal_pop').innerText = ESR[13];
      });
  }
});
};

function taluks() {
    map.addLayer(wg_taluks);
    map.on('singleclick', function (evt) {
  const viewResolution = /** @type {number} */ (view.getResolution());
  // wg_villages.addFeature(selected_polygon_style);
  var url = wg_taluks.getSource().getFeatureInfoUrl(
    evt.coordinate,
    viewResolution,
    'EPSG:3857',
    {
        'LAYERS': 'WesternGhats:wg_taluks',
    }
  );
  // console.log(url);
  if (url) {
    fetch(url)
      .then((response) => response.text()
      )
      .then((text) => {
        // document.getElementById('info').innerText = text;
        // console.log(text);
        var ESR = "";
        console.log(text)
        var index = text.indexOf('type_3');
                var newstring = text.slice(index);
                // console.log(newstring)
                // var newindex1 = text.indexOf('IISC_WGESR');
                // IISC_EWG = text.slice(newindex1);
                ESR = newstring.split("\n");
        document.getElementById('taluk_esa').innerText = ESR[1];
        document.getElementById('taluk_state_name').innerText = ESR[2];
        document.getElementById('taluk_dist_name').innerText = ESR[3];
        document.getElementById('taluk_taluk_name').innerText = ESR[4];
        document.getElementById('taluk_area').innerText = ESR[5];
        document.getElementById('taluk_country').innerText = ESR[7];
      });
  }
});
};

function wg_states() {
    map.addLayer(wg_states_layer);
    map.on('singleclick', function (evt) {
  const viewResolution = /** @type {number} */ (view.getResolution());
  // wg_villages.addFeature(selected_polygon_style);
  var url = wg_states_layer.getSource().getFeatureInfoUrl(
    evt.coordinate,
    viewResolution,
    'EPSG:3857',
    {
        'LAYERS': 'WesternGhats:wg_states',
    }
  );
  // console.log(url);
  if (url) {
    fetch(url)
      .then((response) => response.text()
      )
      .then((text) => {
        // document.getElementById('info').innerText = text;
        // console.log(text);
        var ESR = "";
        console.log(text)
        var index = text.indexOf('type_3');
                var newstring = text.slice(index);
                // console.log(newstring)
                // var newindex1 = text.indexOf('IISC_WGESR');
                // IISC_EWG = text.slice(newindex1);
                ESR = newstring.split("\n");
        document.getElementById('taluk_esa').innerText = ESR[1];
        document.getElementById('taluk_state_name').innerText = ESR[2];
        document.getElementById('taluk_dist_name').innerText = ESR[3];
        document.getElementById('taluk_taluk_name').innerText = ESR[4];
        document.getElementById('taluk_area').innerText = ESR[5];
        document.getElementById('taluk_country').innerText = ESR[7];
      });
  }
});
};

function wg_village() {
    map.addLayer(wg_villages);
    map.removeLayer(wg_districts);
    document.getElementById('district').innerText = "";
    document.getElementById('st_name').innerText = "";
    document.getElementById('area').innerText = "";


    map.on('singleclick', function (evt) {
  const viewResolution = /** @type {number} */ (view.getResolution());
  // wg_villages.addFeature(selected_polygon_style);
  var url = wg_villages.getSource().getFeatureInfoUrl(
    evt.coordinate,
    viewResolution,
    'EPSG:3857',
    {
        'LAYERS': 'WesternGhats:wg_villages',
    }
  );
  // console.log(url);
  if (url) {
    fetch(url)
      .then((response) => response.text()
      )
      .then((text) => {
        // document.getElementById('info').innerText = text;
        // console.log(text);
        var ESR = "";
        console.log(text)
        var index = text.indexOf('objectid');
                var newstring = text.slice(index);
                // console.log(newstring)
                // var newindex1 = text.indexOf('IISC_WGESR');
                // IISC_EWG = text.slice(newindex1);
                ESR = newstring.split("\n");
        document.getElementById('st_nm').innerText = ESR[1];
        document.getElementById('tehs_nm').innerText = ESR[2];
        document.getElementById('dist_nm').innerText = ESR[4];
        document.getElementById('no_hh').innerText = ESR[5];
        document.getElementById('tot_p').innerText = ESR[6];
        document.getElementById('tot_m').innerText = ESR[7];
        document.getElementById('tot_f').innerText = ESR[8];
        document.getElementById('p_sc').innerText = ESR[9];
        document.getElementById('p_st').innerText = ESR[10];
        document.getElementById('p_lit').innerText = ESR[11];
        document.getElementById('p_ill').innerText = ESR[12];
        document.getElementById('tot_wk_p').innerText = ESR[13];
        document.getElementById('tot_wk_m').innerText = ESR[14];
        document.getElementById('tot_wk_f').innerText = ESR[15];
        document.getElementById('orig_fid').innerText = ESR[16];
        document.getElementById('village_nm').innerText = ESR[17];
        document.getElementById('esr').innerText = ESR[22];
      });
  }
});
};

function setGlobal(distid){
    console.log(distid);
}

function wg_district() {
    map.removeLayer(wg_villages);
    // map.removeInteraction(wg_villages);
    // map.removeControl(wg_villages);
    // map.removeEventListener(wg_villages);
    // map.removeOverlay(wg_villages);
    document.getElementById('st_nm').innerText = "";
    document.getElementById('tehs_nm').innerText = "";
    document.getElementById('dist_nm').innerText = "";
    document.getElementById('village_nm').innerText = "";
    document.getElementById('esr').innerText = "";
    map.getLayers(wg_village);
    map.addLayer(wg_districts);

    map.on('singleclick', function (evt) {
  const viewResolution = /** @type {number} */ (view.getResolution());
  var url1 = wg_districts.getSource().getFeatureInfoUrl(
    evt.coordinate,
    viewResolution,
    'EPSG:3857',
    {
        'LAYERS': 'WesternGhats:wg_districts',

    }
  );
  // console.log(url1);
  if (url1) {
    fetch(url1)
      .then((response) => response.text()
      )
      .then((text) => {
          // var values = document.getElementById('info').innerText = text;
          // console.log(text);
        var ESR = "";
        var index = text.indexOf('id');
                var newstring = text.slice(index);
                // var newindex1 = text.indexOf('IISC_WGESR');
                // IISC_EWG = text.slice(newindex1);
                ESR = newstring.split("\n");
                // console.log(ESR[0]);
                // console.log(ESR[1]);
                // console.log(ESR[2]);
                // console.log(ESR[3]);
                // console.log(ESR[4]);
                // console.log(ESR[5]);
        document.getElementById('district').innerText = ESR[1];
        document.getElementById('st_name').innerText = ESR[2];
        document.getElementById('area').innerText = ESR[3];
          // console.log(typeof values);
        // var district_id = text.slice(119, 121);
        // setGlobal(district_id);
        // console.log(district_id);
        // var values = JSON.parse(text["Results for FeatureType 'https://wgbis.ces.iisc.ac.in:wg_districts':"]);
        // console.log(values);

      });
  }
});
};


window.villages = wg_village;
window.districts = wg_district;
window.westernghats = westernghats;
window.grids = grids;
window.wg_states = wg_states;
window.taluks = taluks;

const view = new View({
    center: fromLonLat([74.312, 17.393]),
    zoom: 5,
});

const map = new Map({
    layers: [
        new TileLayer({
            source: new OSM(),
        })
    ],
    target: 'map',
    view: view
});