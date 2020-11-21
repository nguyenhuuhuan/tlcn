import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';
import { NavComponent } from './block/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './block/footer/footer.component';
import { DonateComponent } from './pages/donate/donate.component';
import { CreateCausesComponent } from './pages/causes/create-causes/create-causes.component';
import { DefaultLayoutComponent } from './block/default-layout/default-layout.component';
import { CausesComponent } from './pages/causes/causes/causes.component';
import { CausesDetailComponent } from './pages/causes/causes-detail/causes-detail.component';
import { UserService } from './service/user.service';
import { NewsComponent } from './pages/news/news/news.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NewsDetailComponent } from './pages/news/news-detail/news-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    DonateComponent,
    CreateCausesComponent,
    DefaultLayoutComponent,
    CausesDetailComponent,
    CausesComponent,
    NewsComponent,
    NewsDetailComponent,


  ],
  imports: [
    BrowserModule,
    AdminModule,
    UserModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    Ng2OrderModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
