import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  @Input('operation') operation
  operationText= 'Giris Yap';
  errorMessage = '';
  successMessage = '';

  authForm:FormGroup
  emailCtrl:FormControl;
  passwordCtrl:FormControl;
  password2Ctrl:FormControl;
  nameCtrl:FormControl;


  constructor(private auth:AuthService, private router:Router , private fb:FormBuilder) {
    this.emailCtrl = new FormControl('', Validators.required)
    this.passwordCtrl = new FormControl('', Validators.required)

    this.authForm = fb.group({
      email:this.emailCtrl,
      password:this.passwordCtrl
    })
  }

  ngOnInit() {
    if(this.operation){
      this.operationText='Kayit Ol'
      this.password2Ctrl = new FormControl('', Validators.required)
      this.nameCtrl = new FormControl('', Validators.required)
      this.authForm.addControl('password2', this.password2Ctrl)
      this.authForm.addControl('name', this.nameCtrl)
    }
  }

  authHandle(){
    this.operationText =='Giris Yap' ? this.login() : this.register()
  }

  login(){
    this.errorMessage='';
    this.successMessage=''
    let {email , password} = this.authForm.value;
    this.auth.login(email , password)
      .subscribe(_res => {
        console.log("Res : ", _res)
        if(_res){
          console.log(_res)
          this.router.navigate(['/'])
        }

        else{
          this.errorMessage = 'Beklenmeyen bir durum olustu! lutfen tekrar deneyiniz'
        }
      },
        (err => {
          let res = err.json();
          this.errorMessage  =res.error.message || 'Beklenmeyen bir durum olustu! lutfen tekrar deneyiniz'
          console.log(res)
        })
      )

  }

  register(){
    this.errorMessage='';
    this.successMessage=''
    let {email, password ,password2,name} = this.authForm.value
    this.auth.register(email,password,password2,name)
      .subscribe(_res => {
          console.log("Res : ", _res)
          if(_res){
            console.log(_res)
            this.successMessage='Kayit Islemi Basarili! Simdi Lutfen Giris Yapin!'
          }

          else{
            this.errorMessage = 'Beklenmeyen bir durum olustu! lutfen tekrar deneyiniz'
          }
        },
        (err => {
          let res = err.json();
          this.errorMessage  =res.error.message || 'Beklenmeyen bir durum olustu! lutfen tekrar deneyiniz'
          console.log(res)
        })
      )

  }

}
