import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDeleteDialogboxComponent } from './map-delete-dialogbox.component';

describe('MapDeleteDialogboxComponent', () => {
  let component: MapDeleteDialogboxComponent;
  let fixture: ComponentFixture<MapDeleteDialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapDeleteDialogboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDeleteDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
