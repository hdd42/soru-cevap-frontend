import { NgModule } from '@angular/core';



/** import routes*/
import {appRoutes}from '../App.Routes'
/** import Router*/
import {PreloadAllModules, RouterModule} from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ],
  declarations: [

  ]
})
export class AppRoutingModule { }
