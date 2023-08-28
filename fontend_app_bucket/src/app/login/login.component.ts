import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormGroup , FormControl , Validators} from '@angular/forms'
import { LoginService } from '../Services/login.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {


  constructor(private login:LoginService, private router:Router){}
user:any = {userName:'',userPassword:''};
public userResult:any;
public userSuccess:any;
public userID:any;
public message = "potter";
  imgSrc = "/assets/images/logo.svg"


OnInit(){


}
loginForm = new FormGroup({
  username: new FormControl(null,[Validators.required]),
  password: new FormControl(null, [Validators.required,
        Validators.minLength(8)])
})

loginUser(){
  this.user.userName = this.loginForm.get('username')?.value;
  this.user.userPassword = this.loginForm.get('password')?.value;
  this.login.login(this.user).subscribe((result)=>{
  this.userResult = result;

  if(this.userResult.success){
    this.userSuccess = this.userResult.success;
    this.userID = this.userResult.userId;
    localStorage.setItem('userSuccess',this.userSuccess);
    localStorage.setItem('userID',this.userID);
    this.router.navigate(['']);
  }



  })

}
toRegister(){
  this.router.navigate(['/register'])
}



get username(){
  return this.loginForm.get('username');
}
get password(){
  return this.loginForm.get('password');
}

}
