import { NgModule,  } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { UserIndexComponent } from './user-index/user-index.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {Routes, RouterModule} from "@angular/router";
import { UserHomeComponent } from './user-home/user-home.component';
import { UserIndexDetailComponent } from './user-index-detail/user-index-detail.component';
import { UserLayoutBoxComponent } from './user-layout-box/user-layout-box.component';
import {CommonModule} from "@angular/common";
import {ButtonsModule} from "ng2-bootstrap";





const userRoutes: Routes = [
  {
    path: '',
    component:UserHomeComponent ,
    //canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // canActivateChild: [AuthGuard],
        children: [
          {
            path: 'index', component: UserIndexComponent,
            children:[
              {path:'' , component:UserIndexDetailComponent},
              {path:'profile/:userId' , component:UserProfileComponent},
            ]

          }
        ]
      }
    ]
  }
];



@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ButtonsModule.forRoot(),
    RouterModule.forChild(userRoutes)
  ],
  exports:[
    RouterModule
  ],
  declarations: [UserIndexComponent, UserProfileComponent, UserHomeComponent, UserIndexDetailComponent, UserLayoutBoxComponent]
})
export class UserModule { }



