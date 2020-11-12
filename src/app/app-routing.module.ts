import { AuthGuard } from './auth.guard';
import { CausesDetailComponent } from './pages/causes/causes-detail/causes-detail.component';
import { DefaultLayoutComponent } from './block/default-layout/default-layout.component';
import { CreateCausesComponent } from './pages/causes/create-causes/create-causes.component';
import { DonateComponent } from './pages/donate/donate.component';
import { CausesComponent } from './pages/causes/causes/causes.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'',component:DefaultLayoutComponent,
  children:[
    {
      path:'',
      redirectTo:'/home',
      pathMatch:'full'
    },
    {
      path:'home',
      component:HomeComponent
    },
    {
      path:'donate',
      component:DonateComponent
    },
    {
      path:'createCauses',
      canActivate:[AuthGuard],
      component:CreateCausesComponent
    },
    {
      path:'causes',
      component:CausesComponent
    },

    {
      path:'causes/:id',
      component:CausesDetailComponent
    }
  ]},
  // {
  //   path:'user',
  //   component:UserComponent,
  //   children:[
  //     {
  //       path:'login',
  //       component:LoginComponent
  //     },
  //     {
  //       path:'register',
  //       component:RegisterComponent
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
