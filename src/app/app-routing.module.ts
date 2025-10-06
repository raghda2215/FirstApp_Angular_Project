import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MemberFormeComponent } from './member-forme/member-forme.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolComponent } from './tool/tool.component';
import { EventComponent } from './event/event.component';
import { LoginComponent } from './login/login.component';
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component : LoginComponent
  },
  {
    path:'login',
    pathMatch:'full',
    component : LoginComponent
  },
  {
    path:'tools',
    pathMatch:'full',
    component : ToolComponent
  },
  {
    path:'member',
    pathMatch:'full',
    component : MemberComponent
  },
  {
    path:'events',
    pathMatch:'full',
    component : EventComponent
  },
  {
    path:'articles',
    pathMatch:'full',
    component : ArticleComponent
  },
  {
    path:'create',
    pathMatch:'full',
    component : MemberFormeComponent
  },
  {
    path:'edit/:id',
    pathMatch:"full",
    component : MemberFormeComponent
  },
  {
    path:'**',
    component:DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
