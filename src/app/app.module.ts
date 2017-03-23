/** Core */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import './RxJSimports'

/** Third Parties*/
import  {Ng2BootstrapModule} from 'ng2-bootstrap'


/** Internal */
import { AppComponent } from './app.component';
import { LeftMenuComponent } from './Layout/left-menu/left-menu.component';
import { TopMenuComponent } from './Layout/top-menu/top-menu.component';
import { LayoutContainerComponent } from './Layout/layout-container/layout-container.component';
import { LayoutBodyComponent } from './Layout/layout-body/layout-body.component';
import { HomePageComponent } from './home-page/home-page.component';
import { appRoutes } from './App.Routes';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { QuestionDetailsComponent } from './question/question-de-tails/question-de-tails.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { CategoriesComponent } from './categories/categories.component';
import { QuestionComponent } from './question/question.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthFormComponent } from './auth/auth-form/auth-form.component'
import {QuestionService} from "./services/question.service";
import {CategoryService} from "./services/category.service";
import {environment} from '../environments/environment';
import { ListCategoryQuestions } from './categories/list-category/list-category.component'
import {AuthService} from "./services/auth.service";
import { QuestionListComponent } from './question/question-list/question-list.component';
import { QuestionItemComponent } from './question/question-item/question-item.component';
import { CategoryMenuComponent } from './category-menu/category-menu.component';
import { AnswersComponent } from './answers/answers.component';
import { SearchGlobalComponent } from './search-global/search-global.component';
import { NeedLoginComponent } from './need-login/need-login.component';
import { AnswerItemComponent } from './answers/answer-item/answer-item.component';
import {AnswerService} from "./services/answers.service";
import { BigModalComponent } from './big-modal/big-modal.component';
import { AnswerFormComponent } from './answers/answer-form/answer-form.component';
import { LayoutBoxComponent } from './layout-box/layout-box.component';
import { QuestionHeaderComponent } from './question/question-header/question-header.component';
import { QuestionBlockComponent } from './question/question-block/question-block.component';
import { QuestionFooterComponent } from './question/question-footer/question-footer.component';
import {requestOptionsProvider} from "./services/requestDefaultOptions";

@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    TopMenuComponent,
    LayoutContainerComponent,
    LayoutBodyComponent,
    HomePageComponent,
    PageNotFoundComponent,
    QuestionDetailsComponent,
    TextEditorComponent,
    CategoriesComponent,
    QuestionComponent,
    AddCategoryComponent,
    AuthComponent,
    AuthFormComponent,
    ListCategoryQuestions,
    QuestionListComponent,
    QuestionItemComponent,
    CategoryMenuComponent,
    AnswersComponent,
    SearchGlobalComponent,
    NeedLoginComponent,
    AnswerItemComponent,
    BigModalComponent,
    AnswerFormComponent,
    LayoutBoxComponent,
    QuestionHeaderComponent,
    QuestionBlockComponent,
    QuestionFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    Ng2BootstrapModule.forRoot()

  ],
  providers: [
    requestOptionsProvider,
    QuestionService, CategoryService ,AuthService,AnswerService,
    {provide:'Api', useValue:environment.api},
    {provide:'Auth', useValue:environment.auth}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
