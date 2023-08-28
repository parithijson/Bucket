import { FormBuilder, FormGroup } from '@angular/forms';
import { CommentService } from './../Services/comment.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { faHeart ,faHeartBroken} from '@fortawesome/free-solid-svg-icons';
import { HomeService } from '../Services/home.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-poject',
  templateUrl: './poject.component.html',
  styleUrls: ['./poject.component.css']
})
export class PojectComponent implements OnInit{
  public commentContent! : FormGroup;

  constructor(private fb:FormBuilder, private home:HomeService,private comment:CommentService,private route: ActivatedRoute){}
  list = [1,2,3,4,5,6,7,8];
  hearIcon =faHeart;
  projectId?:number;
  post:any;
  userId?:any;
  comments:any;

  public answer:boolean = false;

ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    // params will contain the route parameters
      this.projectId = Number( params.get('id'));
      // console.log(this.projectId);
      this.getAllPost();
    // You can access specific parameter values like params.paramNam
    this.init();


  });
      this.userId = Number(localStorage.getItem('userID'));


}

private init():void{
  this.commentContent = this.fb.group({
    content:[]
  })
}



toggleIcon() {
  this.answer = !this.answer;
  this.hearIcon = (this.answer)?faHeart:faHeartBroken;
}
public async getAllPost(){
 await this.home.GetPostById(this.projectId).subscribe((data)=>{
    this.post = data;
  })
}
public  commentPost(){

  console.log('1');
  this.comments = {'commentContent':this.commentContent.get('content')?.value,'userID':this.userId,'projectID':this.projectId}
  console.log(this.comments);

   this.comment.postComment(this.userId,this.comments).subscribe((data)=>{
    this.getAllPost();

  });
}}
