import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {CategoryService} from "../services/category.service";

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent implements OnInit {

  categories = []
  constructor(private http:Http , private cs:CategoryService) { }

  ngOnInit() {
    this.cs.getCategories()
      .subscribe(_res => this.categories = _res.categories)
  }

}
