import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordFactoriesComponent } from './record-factories.component';

describe('RecordFactoriesComponent', () => {
  let component: RecordFactoriesComponent;
  let fixture: ComponentFixture<RecordFactoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordFactoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordFactoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
