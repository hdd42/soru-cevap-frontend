import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-category',
  templateUrl: 'add-category.component.html',
  styleUrls: ['add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categoryForm : FormGroup;
  titleCtrl:FormControl;
  descriptionCtrl:FormControl;

  constructor(private cs:CategoryService, private fb:FormBuilder, private router:Router) {
    this.titleCtrl = new FormControl('', Validators.required)
    this.descriptionCtrl = new FormControl('', Validators.required)

    this.categoryForm = fb.group({
      name:this.titleCtrl,
      description:this.descriptionCtrl
    })
  }

  ngOnInit() {
  }

  addCategory(){
    this.cs.addCategory(this.categoryForm.value)
      .subscribe(_res => this.router.navigate(['/categories']) )
  }

}
