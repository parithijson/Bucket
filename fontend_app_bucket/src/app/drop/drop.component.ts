import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedServiceService } from '../Services/shared-service.service';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { UploadService } from '../Services/upload.service';
import { ProjectService } from '../Services/project.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.css']
})
export class DropComponent implements OnInit {





//-----------


dropIcon = faDroplet
// disable = false;


 mediaURLs: string[] = []; // The array you want to send



  // sendData() {
  //   this.SharedService.updateDataArray(this.mediaURLs);
  // }


files:File[] = []
onSelect(event:any){
if (this.files.length < 4) {
  console.log(event)
this.files.push(...event.addedFiles)
}else{
  // this.disable=true;
}




}
// (onDrag)="onDragOver($event)"
onRemove(event:any){
this.files.splice(this.files.indexOf(event,1))
}
 onDragOver(event:any){

  event.preventDefault();
    event.stopPropagation();

 }

async uploadFiles() {
  if (!this.files[0]) {
    alert("No files selected");
    return; // No files, so return early
  }

  const uploadPromises = this.files.map(file_data => {
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'uploadpost');
    data.append('cloud_name', 'parithi');

    return new Promise<void>((resolve, reject) => {
      this.upload.uploadImage(data).subscribe(
        (res) => {
          this.mediaURLs.push(res.url);
          console.log(this.mediaURLs);
          resolve(); // Resolve the promise when upload is successful
        },
        (error) => {
          console.error(error);
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  });

  try {
    await Promise.all(uploadPromises); // Wait for all promises to resolve
    console.log("All uploads completed successfully");
  } catch (error) {
    console.error("Error during uploads:", error);
  }
}







 receivedArray: string[] = [];



 projectForm: FormGroup;
 formData! : FormData;
 project:any;
 tags:any;
 userID:any;

// project = {
//   "projectTitle":string = '',
//   "projectDescription":'',
//   "media":[{
//     "mediaURL":''
//   }],
//   "tags":[],
//   "userID":0

// }

ngOnInit() {
     this.userID = Number(localStorage.getItem('userID'));
    //  this.SharedService.dataArray$.subscribe(dataArray => {
    //   this.receivedArray = dataArray;
    // });
    // console.log(this.receivedArray);

}



  constructor(private formBuilder: FormBuilder,private SharedService: SharedServiceService,private upload:UploadService,private postproj:ProjectService,private router:Router) {
    this.projectForm = this.formBuilder.group({
      projectTitle: '',
      projectDescription: '',
      // projectImages: null,
      projectTags: ''
    });
  }

public async onSubmit() {
    this.formData = new FormData();
    this.formData.append('projectTitle', this.projectForm.get('projectTitle')?.value);
    this.formData.append('projectDescription', this.projectForm.get('projectDescription')?.value);
     const tagsString = this.projectForm.get('projectTags')?.value;
      const tagsArray = tagsString.split(',').map((tag:string)=> tag.trim());
  this.formData.append('projectTags', JSON.stringify(tagsArray));
  await this.uploadFiles();
    // const projectImages = this.projectForm.get('projectImages')?.value;
    // for (let i = 0; i < projectImages.length; i++) {
    //   formData.append('projectImages', projectImages[i]);
    // }
    this.formData.append('projectTags', this.projectForm.get('projectTags')?.value);
  console.log(this.formData.get('projectTags'));


    // Replace with your array of media URLs

const mediaObjects: { mediaURL: string }[] = this.mediaURLs.map(mediaURL => {
  return { mediaURL: mediaURL };
});

    this.project = {'projectTitle':this.formData.get('projectTitle'),'projectDescription':this.formData.get('projectDescription'),'userID':this.userID,"media":mediaObjects,'tags':tagsArray};
console.log(this.project);

    this.postproj.postProject(this.project).subscribe((data)=>{
      console.log(data);

    })
  this.router.navigate([''])



}

}
