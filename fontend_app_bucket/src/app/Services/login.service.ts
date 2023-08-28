import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
login(vals:any):Observable<any>{
  let data = vals;
  return this.http.post("https://192.168.15.46:5001/api/Login",data);
}}
