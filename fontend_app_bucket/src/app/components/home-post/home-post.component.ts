import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { faHeart,faFilter,faFire,faDroplet,faSearch } from '@fortawesome/free-solid-svg-icons';
import { Route, Router } from '@angular/router';
import { HomeService } from 'src/app/Services/home.service';
import { SearchService } from 'src/app/Services/search.service';
import { SharedServiceService } from 'src/app/Services/shared-service.service';


@Component({
  selector: 'app-home-post',
  templateUrl: './home-post.component.html',
  styleUrls: ['./home-post.component.css']
})
export class HomePostComponent implements OnInit{
  inputValue: string = '';
  searchlist:any;
  searchIcon = faSearch;

recetnPost(){
  this.PostList.reverse();
}




  constructor(private getposts:HomeService,private router:Router,private search:SearchService,private shared:SharedServiceService,    private cdRef: ChangeDetectorRef){


  }

  onInputChange(event: any): void {
    const inputValue = event.target.value;
    if (inputValue !== null) {
        this.search.searchPostByInput(inputValue).subscribe((result=>{
        this.PostList = result;

        }))

      // this.shared.setInputValue(inputValue);
    }
  }



  ngOnInit(): void {

     this.getAllPost();


       this.userSuccess = localStorage.getItem('userSuccess');
       console.log(this.userSuccess);


        // this.inputValue = this.shared.getInputValue();
    console.log(this.inputValue);
    this.cdRef.detectChanges();



  }
PostList : any;
  userSuccess:any;

  public userLoggedin = true;


toLogin(){
  this.router.navigate(['/login'])

}

  public getAllPost(){
      this.getposts.GetAllPost().subscribe((data)=>{
      this.PostList = data
      console.log(this.PostList);
      });
    };





heartIcon = faHeart;
filterIcon = faFilter;
fireIcone = faFire;
dropIcon = faDroplet;

}


// export class Post{

//   projectTitle : string;
//   projectURL : string;
//   likeCount : number;
//   userName  : string;

//   constructor(
// projectTitle : string,
//   projectURL : string,
//   likeCount : number,
//   userName  : string
//   ){
// this.projectTitle = projectTitle;
// this.projectURL = projectURL;
// this.likeCount = likeCount;
// this.userName = userName;
//   }



// };
