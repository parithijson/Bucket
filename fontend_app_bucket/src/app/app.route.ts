import { Routes } from "@angular/router";

import { PojectComponent } from "./poject/poject.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { UserComponent } from "./user/user.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponentComponent } from "./register/register.component";
import { DropComponent } from "./drop/drop.component";
import { ProfileComponent } from "./profile/profile.component";
import { UpdateComponent } from "./update/update.component";

export const appRoutes: Routes =
[
    { path: '', component: HomeComponent, pathMatch:"full" },
    { path: 'project/:id', component: PojectComponent },
    { path: 'user', component: UserComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponentComponent },
    { path: 'drop', component: DropComponent },
    { path: 'profile/:id', component: ProfileComponent },
    { path: 'update/:id', component: UpdateComponent },
    // { path: 'product', component: ProductComponent },
    // { path: '', redirectTo: 'home', pathMatch: 'full' },  //default route
    // { path: '**', component: BugsComponent }   //wild card route
  ];
