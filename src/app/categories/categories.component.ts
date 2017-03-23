import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../services/category.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories :any []

  constructor(private cs:CategoryService) { }

  ngOnInit() {
    this.cs.getCategories()
      .subscribe(_data =>{
        this.categories = _data.categories
      })
  }

}
