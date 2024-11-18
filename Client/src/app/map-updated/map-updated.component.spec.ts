import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapUpdatedComponent } from './map-updated.component';

describe('MapUpdatedComponent', () => {
  let component: MapUpdatedComponent;
  let fixture: ComponentFixture<MapUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapUpdatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
