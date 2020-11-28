import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { CONSTANTS } from 'src/app/constants';
import { StateCapitals } from 'src/app/models/StateCapitals';
import { MapboxService } from 'src/app/services/mapbox.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  notSupprotedMessage: string;
  stateData: StateCapitals[] = [];

  constructor(private readonly mapService: MapboxService) {}

  ngOnInit() {
    this.verifyMapGLSupported();
    this.buildMap();
    this.disableScrollZoom();
    this.addMarkersToMap();
  }

  verifyMapGLSupported(): void {
    if (!mapboxgl.supported()) {
      this.notSupprotedMessage = 'Your browser does not support Mapbox GL';
      return;
    }
  }

  buildMap(): void {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapboxAccessToken,
      container: 'map',
      style: CONSTANTS.STYLE_URL,
      zoom: CONSTANTS.ZOOM_LEVEL,
      center: [CONSTANTS.LONGTITUDE, CONSTANTS.LATITUDE],
    });
  }

  async addMarkersToMap() {
    await this.getStatesData();
    this.stateData.map((data) => {
      new mapboxgl.Marker().setLngLat([data.lon, data.lat]).addTo(this.map);
    });
  }

  disableScrollZoom(): void {
    this.map.scrollZoom.disable();
  }

  zoomMapToSelectedCoordinates({ lon, lat }: StateCapitals): void {
    this.map.flyTo({
      center: [lon + 0.05, lat - 0.05],
      essential: true,
      zoom: 9.1,
    });
  }

  async getStatesData() {
    this.stateData = await this.mapService.fetchUSStateCapitals().toPromise();
  }
}
