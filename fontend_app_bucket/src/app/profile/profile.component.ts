import { ProjectService } from './../Services/project.service';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { faHeart,faEdit,faRecycle } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { GetbyuserService } from '../Services/getbyuser.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editIcon= faEdit;
  projectId?:any;
  PostList?:any;
  userId?:number;
  heartIcon = faHeart;
  recycleIcon = faRecycle;
  constructor(private route:ActivatedRoute,private postproj:ProjectService,private router:Router,private getuserbyid:GetbyuserService){}
ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    // params will contain the route parameters

      this.userId = Number( params.get('id'));

      console.log(this.userId);
       this.getpostbyuser();

  });


}
 public getpostbyuser(){
    this.getuserbyid.GetPostByUserId(this.userId).subscribe((result)=>{
      console.log(result);

      this.PostList = result

    })
  }
   public delete(){
    this.postproj.deleteProject(this.projectId).subscribe((result)=>{
      console.log(result);
  this.router.navigate([`/profile/${this.projectId}`])

    })}

  toUpdate(id:any){
    console.log(id);
    this.router.navigate([`/update/${id}`])
  }
}
