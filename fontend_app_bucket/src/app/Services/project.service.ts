import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private basepath = "https://192.168.15.46:5001/api/Project"
  private basepathu = "https://192.168.15.46:5001/api/Project"

  constructor(private http:HttpClient) { }

  postProject(data:any):Observable<any>{
    return this.http.post(this.basepath,data);
  }
  updateProject(id:number,data:any):Observable<any>{
    const url = `${this.basepath}?id=${id}`
    return this.http.put(url,data);
  }
   deleteProject(id:number):Observable<any>{
    const url = `${this.basepath}?projectId=${id}`
    return this.http.delete(url);
  }



}
