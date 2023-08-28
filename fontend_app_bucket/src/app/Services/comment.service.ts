import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
private basepath = "https://192.168.15.46:5001/api/Comment"


  constructor(private http:HttpClient ) { }

  postComment(id?:number,comment?:any){

  const url = `${this.basepath}?userid=${id}`;
  return this.http.post(url,comment)
}
}
