import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
 export class SharedServiceService {


 private inputValue =  new BehaviorSubject<string>("");
 currentMessage = this.inputValue.asObservable();

 constructor(){}

  changeMessage(message: string) {
    this.inputValue.next(message);
    // console.log(this.inputValue);
  }

  // getInputValue(): string {
  //   console.log(this.inputValue);
  //   return this.inputValue;


  // }
}
