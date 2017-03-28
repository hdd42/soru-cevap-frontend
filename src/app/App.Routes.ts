import { Routes} from '@angular/router';

/** Navigasyon icin kullanacagimiz component lerin referanslari */
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {QuestionDetailsComponent} from "./question/question-de-tails/question-de-tails.component";
import {CategoriesComponent} from "./categories/categories.component";
import {AddCategoryComponent} from "./categories/add-category/add-category.component";
import {AuthComponent} from "./auth/auth/auth.component";
import {ListCategoryQuestions} from "./categories/list-category/list-category.component";
import {QuestionComponent} from "./question/question.component";
import {QuestionResolver} from "./services/resolvers/route-question.resolver.service";


export const appRoutes: Routes = [

  {path: '', component: HomePageComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'categories/add', component: AddCategoryComponent},
  {path: 'categories/:slug/questions', component: ListCategoryQuestions},
  {path: 'questions/:slug', component: QuestionDetailsComponent},
  {
    path: 'questions/:slug/edit', component: QuestionComponent,
    resolve: {
      question: QuestionResolver
    }
  },
  /** User Module. Will be loaded lazy */
  {
    path:'users',
    loadChildren:'app/users/user.module.ts#UserModule'
    // Kullanici modulunu baslangicta degil, lazim oldugunda yukleyecegiz
    //bu modulun app.module icinde referansi kalmamali!!!
  },

  /** User Module ENDS. */
  {path: 'auth', component: AuthComponent},
  {path: '**', component: PageNotFoundComponent}
];

