import {Component, HostBinding, OnInit} from '@angular/core';
import {CategoryService} from "../services/category.service";
import {slideInDownAnimation} from "../animations";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  animations: [ slideInDownAnimation ]
})
export class CategoriesComponent implements OnInit {
  /** Animations*/
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';

  /** Animations*/
  categories :any []

  constructor(private cs:CategoryService) { }

  ngOnInit() {
    this.cs.getCategories()
      .subscribe(_data =>{
        this.categories = _data.categories
      })
  }

}
