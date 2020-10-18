import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';
import { NavComponent } from './block/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './block/footer/footer.component';
import { DonateComponent } from './pages/donate/donate.component';
import { CreateCausesComponent } from './pages/create-causes/create-causes.component';
import { LoginComponent } from './user/login/login.component';
import { DefaultLayoutComponent } from './block/default-layout/default-layout.component';
import { RegisterComponent } from './user/register/register.component';
import { UserComponent } from './user/user.component';
import { CausesComponent } from './pages/causes/causes/causes.component';
import { CausesDetailComponent } from './pages/causes/causes-detail/causes-detail.component';
import { UserService } from './service/user.service';
// import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    DonateComponent,
    CreateCausesComponent,
    // LoginComponent,
    DefaultLayoutComponent,
    // RegisterComponent,
    CausesDetailComponent,
    CausesComponent,
    // UserComponent,

  ],
  imports: [
    BrowserModule,
    AdminModule,
    UserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    // ToastrModule.forRoot(),
    AppRoutingModule,

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
