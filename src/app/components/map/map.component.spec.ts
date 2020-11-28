import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { mockProvider } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { MapboxService } from 'src/app/services/mapbox.service';
import { StatesDataComponent } from '../states-data/states-data.component';
import { MapComponent } from './map.component';
import * as mapboxgl from 'mapbox-gl';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  const stateData = [
    {
      lon: -12,
      lat: 12,
      state: 'Hawaii',
      city: 'Honolulu',
    },
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent, MockComponent(StatesDataComponent)],
      providers: [
        mockProvider(MapboxService, {
          fetchUSStateCapitals: () => of(stateData),
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call all necessary methods in ngOnInit', () => {
    spyOn(component, 'buildMap');
    spyOn(component, 'verifyMapGLSupported');
    spyOn(component, 'disableScrollZoom');
    spyOn(component, 'addMarkersToMap');
    fixture.detectChanges();
    expect(component.buildMap).toHaveBeenCalledTimes(1);
    expect(component.verifyMapGLSupported).toHaveBeenCalledTimes(1);
    expect(component.disableScrollZoom).toHaveBeenCalledTimes(1);
    expect(component.addMarkersToMap).toHaveBeenCalledTimes(1);
  });

  describe('map related functions', () => {
    beforeEach(() => {
      component.buildMap();
    });

    it('should assign map config to map variable', () => {
      expect(component.map).toBeDefined();
    });

    it('should disable ScrollZoom on map', () => {
      spyOn(component.map.scrollZoom, 'disable');
      component.disableScrollZoom();
      expect(component.map.scrollZoom.disable).toHaveBeenCalled();
    });

    it('should not assign value to notSupprotedMessage MapGL is supported', () => {
      spyOn(mapboxgl, 'supported').and.returnValue(true);
      component.verifyMapGLSupported();
      expect(component.notSupprotedMessage).not.toBeDefined();
    });

    it('should assign value to notSupprotedMessage MapGL is not supported', () => {
      spyOn(mapboxgl, 'supported').and.returnValue(false);
      component.verifyMapGLSupported();
      expect(component.notSupprotedMessage).toEqual('Your browser does not support Mapbox GL');
    });

    it('should zoom to selected city with flyTo method', () => {
      spyOn(component.map, 'flyTo');
      component.zoomMapToSelectedCoordinates({ lon: 1, lat: 2, city: 'Test', state: 'Test' });
      expect(component.map.flyTo).toHaveBeenCalledWith({
        center: [1.05, 1.95],
        essential: true,
        zoom: 9.1,
      });
    });

    it('should assign value to stateData from API', fakeAsync(() => {
      component.getStatesData();
      tick(100);
      expect(component.stateData.length).toEqual(1);
    }));

    it('should add markers to the map', () => {
      component.stateData = stateData;
      spyOn(component, 'getStatesData').and.returnValue(stateData);
      component.addMarkersToMap();
      expect(component.getStatesData).toHaveBeenCalled();
    });
  });
});
