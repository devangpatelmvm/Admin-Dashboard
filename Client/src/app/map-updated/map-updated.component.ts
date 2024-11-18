import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment'
import * as mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { ActivatedRoute } from '@angular/router';
import { MapService } from 'src/service/map.service';


@Component({
  selector: 'app-map-updated',
  templateUrl: './map-updated.component.html',
  styleUrls: ['./map-updated.component.css']
})
export class MapUpdatedComponent implements OnInit {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 20.5937;
  lng = 78.9629;
  id: string;
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private mapService: MapService) { }
  ngOnInit() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 6,
        center: [this.lng, this.lat],
        hash: true
    });

        // Search
        this.map.addControl(
          new MapboxGeocoder({
              accessToken: mapboxgl.accessToken,
              mapboxgl: mapboxgl
          })
      );
   

   this.map.addControl(new mapboxgl.FullscreenControl());   
   this.map.addControl(new mapboxgl.NavigationControl());
  

   
       // Add geolocate control to the map.
       this.map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        })
    );


    var draw = new MapboxDraw({
      userProperties: true,
      
        id: 'gl-draw-polygon-fill',
        type: 'fill',
        filter: ['all', ['==', '$type', 'Polygon'],
          ['!=', 'mode', 'static']
        ],
        paint: {
          'fill-color': '#120404',
          'fill-outline-color': '#120404',
          'fill-opacity': 1
        
        }
        });


      // Polygon Tool
  //   const draw = new MapboxDraw({
  //     displayControlsDefault: false,
  //     // Select which mapbox-gl-draw control buttons to add to the map.
  //     controls: {
  //         polygon: true,
  //         trash: true
  //     },
  //     // Set mapbox-gl-draw to draw by default.
  //     // The user does not have to click the polygon control button first.
  //     defaultMode: 'draw_polygon'
  // });
  this.map.addControl(draw);
  // draw.editing.enable();
  
  // this.map.on('draw.create', updateArea);
  // this.map.on('draw.delete', updateArea);
  // this.map.on('draw.update', updateArea);

  // function updateArea(e) {
      // const data = draw.getAll();
      
  // }

  this.id = this.route.snapshot.paramMap.get('id');
  var request: any = {
    id: this.id,
  };

  this.map.on('load', () => {
    this.mapService.mapView(this.id, request).subscribe((res: any) => {
      let x = JSON.parse(res.data[0].data)
       this.map.addSource('maine', {
        'type': 'geojson',
        'data': x
        //  {
        //   "type": "Feature",
        //   "properties": {
        //     "class_id": 2
        //   },
        //   "geometry": {
        //     "type": "Polygon",
        //     "coordinates":[
        //       [
        //           [
        //               78.69190368272996,
        //               21.257287262551415
        //           ],
        //           [
        //               79.50489196398036,
        //               21.400561108099083
        //           ],
        //           [
        //               79.16431579210615,
        //               21.001094606681917
        //           ],
        //           [
        //               78.69190368272996,
        //               21.257287262551415
        //           ]
        //       ]
        //   ]
        //   }
        // }
        
       });
    
    // Add a new layer to visualize the polygon.
    this.map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': 'maine', // reference the data source
        'layout': {},
        'paint': {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5
        }
    });
    // Add a black outline around the polygon.
    this.map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'maine',
        'layout': {},
        'paint': {
        'line-color': '#000',
        'line-width': 2
        }
    });
  });
});



  }

  
}

