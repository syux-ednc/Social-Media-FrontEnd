import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/pages/login/login.component";
import {RegisterComponent} from "./components/pages/register/register.component";
import {PageNotFoundComponent} from "./components/pages/page-not-found/page-not-found.component";
import {FeedComponent} from "./components/pages/feed/feed.component";
import {AdminComponent} from "./components/pages/admin/admin.component";
import {ProfileComponent} from "./components/pages/profile/profile.component";
import {CreatePostComponent} from "./components/pages/create-post/create-post.component";
import {AuthGuard} from "./guards/auth.guard";
import {RoleGuard} from "./guards/role.guard";
import {EditProfileComponent} from "./components/pages/edit-profile/edit-profile.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: 'feed', component: FeedComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard]},
  {path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
