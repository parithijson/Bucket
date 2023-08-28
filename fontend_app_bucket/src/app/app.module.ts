import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { HomePostComponent } from './components/home-post/home-post.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { PojectComponent } from './poject/poject.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.route';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { LoginComponent } from './login/login.component';
import { RegisterComponentComponent } from './register/register.component';
import { DropComponent } from './drop/drop.component';
import { SharedServiceService } from './Services/shared-service.service';
import { ProfileComponent } from './profile/profile.component';
import { UpdateComponent } from './update/update.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    HomePostComponent,

    PojectComponent,
     HomeComponent,
     UserComponent,
     LoginComponent,
     RegisterComponentComponent,
     DropComponent,
     ProfileComponent,
     UpdateComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgxDropzoneModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [SharedServiceService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {

   constructor(library: FaIconLibrary) {
 library.addIconPacks(fas);
  }
 }
