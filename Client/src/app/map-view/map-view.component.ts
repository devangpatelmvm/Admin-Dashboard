import { MapService } from './../../service/map.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements OnInit {
  url = 'http://localhost:5000/sentFiles/';
  constructor(private route: ActivatedRoute, private mapService: MapService) {}

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  // style: 'mapbox://styles/mapbox/satellite-v9';
  lat = 20.5937;
  lng = 78.9629;
  id: string;

   imgs: string[] =[];
   imgUrl:any;
   imageUrls = [];

  ngOnInit() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 6,
      center: [this.lng, this.lat],
      antialias: true,
    });

    this.map.on('load', () => {
      // Insert the layer beneath any symbol layer.
      const layers = this.map.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;

      this.map.addLayer(
        {
          id: 'add-3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',

            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height'],
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height'],
            ],
            'fill-extrusion-opacity': 0.6,
          },
        },
        labelLayerId
      );
    });

    // Search
    this.map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );

    this.map.addControl(new mapboxgl.FullscreenControl());
    this.map.addControl(new mapboxgl.NavigationControl());

    // Add geolocate control to the map.
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    this.id = this.route.snapshot.paramMap.get('id');
    var request: any = {
      id: this.id,
    };

    // Polygon Layer
    this.mapService.mapView(this.id, request).subscribe((res: any) => {
      let x = JSON.parse(res.data[0].data);
      this.map.on('load', () => {
        this.map.addSource('maine', {
          type: 'geojson',
          data: x,
        });

        // Add a new layer to visualize the polygon.
        this.map.addLayer({
          id: 'maine',
          type: 'fill',
          source: 'maine', // reference the data source
          layout: {},
          paint: {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5,
          },
        });
        // Add a black outline around the polygon.
        this.map.addLayer({
          id: 'outline',
          type: 'line',
          source: 'maine',
          layout: {},
          paint: {
            'line-color': '#000',
            'line-width': 2,
          },
        });
      });

      this.map.on('click', 'maine', (e) => {

        // this.url = 'http://localhost:5000/sentFiles/';
        // this.url += res.data[0].file.substring(9);
        // console.log(this.url);
        this.imgs = res.data[0].file.split(',');
        // let imageUrls = [];
        for(let i=0;i<this.imgs.length; i++){
        this.imgUrl = 'http://localhost:5000/sentFiles/'+this.imgs[i].substring(9);
          this.imageUrls.push(this.imgUrl);
          console.log(this.imgUrl);
          console.log(this.imageUrls);
        }

        console.log(this.imageUrls);
        var indicators = '';
        var items = '';
        for (let index = 0; index < this.imageUrls.length; index++) {
          indicators += `<li data-target="#carouselExampleIndicators" data-slide-to="${index}" class="${index == 0 ? 'active' : ''}"></li>`
          items += ` <div class="carousel-item ${index == 0 ? 'active' : ''}">
        <img class="d-block w-100" src=" ${this.imageUrls[index]}">
      </div>`
        }
        var carousel1 = `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
       <ol class="carousel-indicators">${indicators}</ol>

       <div class="carousel-inner">${items}</div>

       <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
       <span class="carousel-control-prev-icon" aria-hidden="true"></span>
       <span class="sr-only">Previous</span>
       </a>
       <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
       <span class="carousel-control-next-icon" aria-hidden="true"></span>
       <span class="sr-only">Next</span>
       </a>
       </div>`;

        

        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML( carousel1
             + '<br>' +
              'About  : ' +
              res.data[0].about +
              '<br>' +
              'Location1  : ' +
              res.data[0].address1 +
              '<br>' +
              'Location2  : ' +
              res.data[0].address2
          )
          .addTo(this.map);
      });

      this.map.on('click', 'maine', (e) => {
        this.map.flyTo({
          center: e.lngLat,
        });
      });
    });

    this.map.on('mouseenter', 'maine', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });

    this.map.on('mouseleave', 'maine', () => {
      this.map.getCanvas().style.cursor = '';
    });
  }
}
