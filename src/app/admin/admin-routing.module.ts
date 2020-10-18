import { AuthGuard } from './../auth.guard';
import { AccountComponent } from './pages/account/account.component';
import { HotronguoingheoComponent } from './pages/hotronguoingheo/hotronguoingheo.component';
import { NguoituthienComponent } from './pages/nguoituthien/nguoituthien.component';
import { AdminDefaultLayoutComponent } from './block/admin-default-layout/admin-default-layout.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const adminRoutes: Routes = [
  {path:'admin', component:AdminDefaultLayoutComponent,
  canActivate:[AuthGuard],
    children:[
      {path:'dashboard', component:DashBoardComponent},
      {path:'nguoituthien',component:NguoituthienComponent},
      {path:'goimot', component:HotronguoingheoComponent},
      {path:'account', component:AccountComponent}
  ]
}
];
@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
