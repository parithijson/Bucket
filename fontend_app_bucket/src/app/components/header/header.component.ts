import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faRightFromBracket,faGear,faDroplet } from '@fortawesome/free-solid-svg-icons';
import { SharedServiceService } from 'src/app/Services/shared-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  id:any = 12;

  constructor(private router:Router,private shared:SharedServiceService) {}

  // onInputChange(value: string): void {
  //   this.shared.setInputValue(value);
  // }


ngOnInit(): void {
   this.userSuccess = localStorage.getItem('userSuccess');
   this.id = localStorage.getItem('userID');
    console.log(this.userSuccess);
}
  settingsIcon = faGear;
  logoutIcon = faRightFromBracket;
  dropIcon = faDroplet;
  imgSrc = "/assets/images/logo.svg"
  userSuccess:any;
  loggedin = true;


logOut(){

  localStorage.removeItem('userSuccess');
  console.log('loggoed out');

  this.router.navigate([''])
  this.ngOnInit();

}

// public searchPostByInput(){
//       this.search.searchPostByInput()
// }


toSettings(){
  this.router.navigate([`/profile/${this.id}`])
}
toRegister(){
  this.router.navigate(['/register'])
}
toDrop(){
  this.router.navigate(['/drop'])
}
toLogin(){
  this.router.navigate(['/login'])

  console.log(this.userSuccess);

}

}
