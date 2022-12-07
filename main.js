import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View';
import OSM from 'ol/source/OSM';

const style = new Style({
  fill: new Fill({
    color: '#eeeeee',
  }),
});


var wg_villages = new TileLayer({
    title: 'villages',
    source: new TileWMS({
        url: 'http://localhost:8080/geoserver/WesternGhats/wms',
        params: {'LAYERS': 'WesternGhats:wg_villages', 'TILED': true},
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
        var index = text.indexOf('objectid');
                var newstring = text.slice(index);
                // console.log(newstring)
                // var newindex1 = text.indexOf('IISC_WGESR');
                // IISC_EWG = text.slice(newindex1);
                ESR = newstring.split("\n");
                // console.log(ESR[0]);
                // console.log(ESR[1]);
                // console.log(ESR[2]);
                // console.log(ESR[3]);
                // console.log(ESR[4]);
                // console.log(ESR[5]);
        document.getElementById('st_nm').innerText = ESR[2];
        document.getElementById('tehs_nm').innerText = ESR[3];
        document.getElementById('dist_nm').innerText = ESR[5];
        document.getElementById('village_nm').innerText = ESR[18];
        document.getElementById('esr').innerText = ESR[23];
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

const view = new View({
    center: [0, 0],
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
