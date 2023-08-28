import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SharedServiceService } from 'src/app/Services/shared-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchIcon = faSearch;


    constructor(private router:Router) {}

  onInputChange(event: any): void {
    const inputValue = event.target.value;
    if (inputValue !== null) {


      // this.shared.setInputValue(inputValue);
    }
  }
}
