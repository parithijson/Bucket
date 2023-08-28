import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
    private basepath = "https://192.168.15.46:5001/api/Search"

  constructor(private http:HttpClient) { }



  searchPostByInput(input:any):Observable<any>{
    const url = `${this.basepath}/${input}`;
    return this.http.get(url);
  }
}
