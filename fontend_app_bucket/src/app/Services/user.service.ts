import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../Models/adduser.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private basepath = "https://192.168.15.46:5001/api/User";

   constructor(private http:HttpClient) {

   }
  AddUser(model : User) : Observable<any>{
     return this.http.post(this.basepath,model);
  }


  //  public AddUser(user : any):Observable<any>
  // {
  //   return this.http.post(this.basepath, user);
  // }
}
