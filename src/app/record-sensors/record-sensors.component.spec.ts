import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordSensorsComponent } from './record-sensors.component';

describe('RecordSensorsComponent', () => {
  let component: RecordSensorsComponent;
  let fixture: ComponentFixture<RecordSensorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordSensorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
