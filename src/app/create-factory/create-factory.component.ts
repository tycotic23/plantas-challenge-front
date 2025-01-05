import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-factory',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-factory.component.html',
  styleUrl: './create-factory.component.css'
})
export class CreateFactoryComponent {
  createFactoryForm:FormGroup;

  constructor(){
    this.createFactoryForm=new FormGroup({
      name:new FormControl("",Validators.required),
      country_id:new FormControl("",Validators.required)
    });
  }
}
