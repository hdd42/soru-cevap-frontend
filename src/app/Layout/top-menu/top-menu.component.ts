import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  user : Observable<any>;
  isLoggedIn :Observable<boolean>

  constructor(private auth : AuthService) { }

  ngOnInit() {
   this.isLoggedIn = this.auth.isLoggedIn()
   this.user = this.auth.getUser()

  }

  logout(){
    this.auth.logout()
  }

}
