import { SharedServiceService } from './../Services/shared-service.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { UploadService } from '../Services/upload.service';
import { Toast } from 'bootstrap';
import { faDroplet, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent{
  isToggled = false;

  toggle() {
    this.isToggled = !this.isToggled;
  }


heartIcon = faHeart;


// dropIcon = faDroplet
// // disable = false;

// ngOnInit(): void {
//     this.sendData()
// }
//  mediaURLs: string[] = ["hello","hi","im from user image"]; // The array you want to send

//   constructor(private SharedService: SharedServiceService,private upload:UploadService) {}

//   sendData() {
//     this.SharedService.updateDataArray(this.mediaURLs);
//   }


// files:File[] = []
// onSelect(event:any){
// if (this.files.length < 4) {
//   console.log(event)
// this.files.push(...event.addedFiles)
// }else{
//   // this.disable=true;
// }




// }
// // (onDrag)="onDragOver($event)"
// onRemove(event:any){
// this.files.splice(this.files.indexOf(event,1))
// }
//  onDragOver(event:any){

//   event.preventDefault();
//     event.stopPropagation();

//  }

// uploadFiles(){
//   if (!this.files[0]) {
//     alert("No files selected")
//   }
//   for (let index = 0; index < this.files.length; index++) {
//     const file_data = this.files[index]
//     const data = new FormData()

//       data.append('file',file_data)
//       data.append('upload_preset','uploadpost')
//       data.append('cloud_name','parithi')
//       console.log(data);

//       this.upload.uploadImage(data).subscribe((res)=>{
//           this.mediaURLs.push(res.url);

//       })

//   }

// }

}
