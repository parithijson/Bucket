import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private basepath = "https://192.168.15.46:5001/api/Project"

  constructor(private http:HttpClient) { }

  GetAllPost():Observable<any>{

      return this.http.get(this.basepath);
  }
GetPostById(id?:number):Observable<any>{
  const url = `${this.basepath}/${id}`;
  return this.http.get(url)
}
}
