import {Routes} from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {QuestionDetailsComponent} from "./question/question-de-tails/question-de-tails.component";
import {CategoriesComponent} from "./categories/categories.component";
import {AddCategoryComponent} from "./categories/add-category/add-category.component";
import {AuthComponent} from "./auth/auth/auth.component";
import {ListCategoryQuestions} from "./categories/list-category/list-category.component";


export const appRoutes: Routes = [

  {path: '', component: HomePageComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'categories/add', component: AddCategoryComponent},
  {path: 'categories/:slug/questions', component: ListCategoryQuestions},
  {path: 'questions/:slug', component: QuestionDetailsComponent},
  {path: 'auth', component: AuthComponent},
  {path: '**', component: PageNotFoundComponent}
];

