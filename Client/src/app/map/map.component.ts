import { MapService } from './../../service/map.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Map } from 'src/model/map';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '450px',
          width: '1200px',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          height: '450px',
          width: '740px',
          opacity: 0.8,
        })
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 20.5937;
  lng = 78.9629;

  form: FormGroup;
  polygonData: string;
  isForm: boolean = false;

  fileToUpload: File | null = null;
  filesToUpload: Array<File> = [];

  public errorMsg: string = '';
  data: any;
  formDataValue: Map[] = [];
  isOpen: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private mapService: MapService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  get about() {
    return this.form.get('about') as FormControl;
  }
  get file() {
    return this.form.get('file') as FormControl;
  }
  get address1() {
    return this.form.get('address1') as FormControl;
  }
  get address2() {
    return this.form.get('address2') as FormControl;
  }

  ngOnInit() {
    this.createForm();
    this.mapLoad();
    this.isOpen = true;
  }

  polygonInitialization() {
    if (this.data) {
      console.log(this.map);
      if (this.map.getLayer('maine')) this.map.removeLayer('maine');
      this.map.removeSource('maine');
      this.polygonCreate();
    }
  }

  polygonCreate() {
    if (this.data) {
      this.map.addSource('maine', {
        type: 'geojson',
        data: this.data,
      });
      this.map.addLayer({
        id: 'maine',
        type: 'fill',
        source: 'maine',
        layout: {},
        paint: {
          'fill-color': '#0080ff',
          'fill-opacity': 0.5,
        },
      });
      this.map.jumpTo({ center: this.data.geometry.coordinates[0][0] });
    }
  }

  mapLoad() {
    if (this.map) {
      this.map = null;
    }
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 6,
      antialias: true,
      center: [this.lng, this.lat],
    });

    // Search
    this.map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );

    // FullscreenControl
    this.map.addControl(new mapboxgl.FullscreenControl());

    // Add map controls Zoom in / Zoom Out
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

    this.map.on('load', () => {
      const layers = this.map.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;
      this.polygonCreate();
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

    // Polygon Tool
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: 'draw_polygon',
    });
    this.map.addControl(draw);
    const updateArea = (e) => {
      this.data = draw.getAll().features[0];
      this.polygonData = JSON.stringify(this.data);
      if (this.isOpen) {
        setTimeout(() => {
          this.mapLoad();
        }, 1000);
      } else {
        setTimeout(() => {
          this.polygonInitialization();
        }, 500);
      }
      this.isOpen = false;
      this.isForm = true;
    };
    this.map.on('draw.create', updateArea);
    this.map.on('draw.delete', updateArea);
    this.map.on('draw.update', updateArea);
  }

  createForm() {
    this.form = this.formBuilder.group({
      about: [null, [Validators.required, Validators.minLength(3)]],
      address1: [null, [Validators.required, Validators.minLength(3)]],
      address2: [''],
      file: [''],
    });
  }

  onSave() {
    const formData = new FormData();
    const files: Array<File> = this.filesToUpload;
    formData.append('about', this.about.value);
    for (let i = 0; i < files.length; i++) {
      formData.append('profile', files[i], files[i]['name']);
      console.log(files[i]);
    }

    formData.append('address1', this.address1.value);
    formData.append('address2', this.address2.value);
    formData.append('data', this.polygonData);

    var tempdata: Map = {
      about: this.about.value,
      file: this.filesToUpload,
      address1: this.address1.value,
      address2: this.address2.value,
      data: this.polygonData,
    };

    this.mapService.newMapData(formData).subscribe(
      (res) => {
        this.formDataValue.push(tempdata);
        this.openSnackBar('Map Data Submitted ', ''),
          {
            duration: 4000,
          };
        this.router.navigateByUrl('/map-list');
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = error.error.errorMsg;
        this.openSnackBar(' Address already exists!!! ', ''),
          {
            duration: 3000,
          };
        this.form.reset();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['custom-style'],
    });
  }
  toggle() {
    this.isOpen = true;
    setTimeout(() => {
      this.data = null;
      this.mapLoad();
    }, 500);
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = fileInput.target.files;
    console.log(fileInput.target.files);
  }
}
