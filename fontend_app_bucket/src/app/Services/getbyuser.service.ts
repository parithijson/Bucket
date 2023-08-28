import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetbyuserService {


  private basepath = "https://192.168.15.46:5001/api/GetByUser"
  constructor(private http:HttpClient) { }
  GetPostByUserId(id?:number):Observable<any>{
  const url = `${this.basepath}?userid=${id}`;
  return this.http.get(url)
}
}
