import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { FeedComponent } from './components/pages/feed/feed.component';
import { PostComponent } from './components/widgets/post/post.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { CreatePostComponent } from './components/pages/create-post/create-post.component';
import {authInterceptorProviders} from "./interceptors/auth.interceptor";
import { NavBarComponent } from './components/widgets/nav-bar/nav-bar.component';
import { EditProfileComponent } from './components/pages/edit-profile/edit-profile.component';
import { UsernameExistDirective } from './directives/username-exist.directive';
import { EmailExistDirective } from './directives/email-exist.directive';
import { DateAsAgoPipe } from './pipes/date-as-ago.pipe';
import {VgCoreModule} from "ngx-videogular";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    FeedComponent,
    PostComponent,
    AdminComponent,
    ProfileComponent,
    CreatePostComponent,
    NavBarComponent,
    EditProfileComponent,
    UsernameExistDirective,
    EmailExistDirective,
    DateAsAgoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    VgCoreModule,
    NgxPaginationModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
