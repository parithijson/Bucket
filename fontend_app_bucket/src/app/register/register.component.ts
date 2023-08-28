import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { OnInit, ViewChild, Input } from '@angular/core';
import { matchpassword } from './matchpassword.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponentComponent  {
  title = 'Password Match Validator';
  message: string = "";
  registerForm : FormGroup;
  imgSrc = "/assets/images/logo.svg"

  constructor(private userService : UserService,private router:Router){
    this.registerForm = new FormGroup({
      userName : new FormControl(null,[Validators.required,
        Validators.pattern(/^[A-z0-9]*$/),
        Validators.minLength(3)]),
        userEmail : new FormControl(null,[Validators.email, Validators.required]),
        userPassword : new FormControl(null,[
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        ),
        Validators.minLength(8)]),
      ConfirmPassword : new FormControl(null,[matchpassword])
    },
    {
      validators:matchpassword
    })
  }
  get userName()
 {
  return this.registerForm.get('userName');
 }
 get userEmail()
 {
  return this.registerForm.get('userEmail');
}
 get userPassword()
 {
  return this.registerForm.get('userPassword');
 }

toLogin(){
  this.router.navigate(['/login'])
}

  public AddNewUser():void{
     this.userService.AddUser(this.registerForm.value).subscribe( (response: any) => {
      this.message = response.message; console.log(response)
      if(response.success){
        this.router.navigate(['/login'])
      }
    });
  }

  // result => {alert("User Added"); console.log(result)},
}

