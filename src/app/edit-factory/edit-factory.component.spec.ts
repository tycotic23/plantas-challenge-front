import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFactoryComponent } from './edit-factory.component';

describe('EditFactoryComponent', () => {
  let component: EditFactoryComponent;
  let fixture: ComponentFixture<EditFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFactoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
