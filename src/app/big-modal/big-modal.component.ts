import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-big-modal',
  templateUrl: './big-modal.component.html',
  styleUrls: ['./big-modal.component.css'],
  host:{
    'class':'modal fade',
    'tabindex':'-1',
    'role':'dialog',
    'aria-labelledby':"myLargeModalLabel",
    'aria-hidden':'true'
  }

})
export class BigModalComponent implements OnInit {
@Input('title') title;
@Output() hideModal = new EventEmitter<any>()
  isLoggedIn:Observable<boolean>
  constructor(private auth:AuthService) {

  }

  ngOnInit() {
  this.isLoggedIn = this.auth.isLoggedIn();
}

  hide(){
    this.hideModal.emit()
  }

}

//class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"
