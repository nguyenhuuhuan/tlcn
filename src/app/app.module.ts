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
import { CreateCausesComponent } from './pages/causes/create-causes/create-causes.component';
import { DefaultLayoutComponent } from './block/default-layout/default-layout.component';
import { CausesComponent } from './pages/causes/causes/causes.component';
import { Package1DetailComponent } from './pages/causes/package1-detail/package1-detail.component';
import { NewsComponent } from './pages/news/news/news.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NewsDetailComponent } from './pages/news/news-detail/news-detail.component';
import { authInterceptorProviders } from './auth.interceptor';
import { Package2DetailComponent } from './pages/causes/package2-detail/package2-detail.component';
import { CausesDetailComponent } from './pages/causes/causes-detail/causes-detail.component';
import { AngularFireStorageModule} from '@angular/fire/storage'
import {AngularFireModule} from '@angular/fire'
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    CreateCausesComponent,
    DefaultLayoutComponent,
    Package1DetailComponent,
    CausesComponent,
    NewsComponent,
    NewsDetailComponent,
    Package2DetailComponent,
    CausesDetailComponent


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
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBpIOS3f66VUT5obTFPS7kx19AoECVd3JA",
    authDomain: "webtuthien.firebaseapp.com",
    projectId: "webtuthien",
    storageBucket: "webtuthien.appspot.com",
    messagingSenderId: "102889078940",
    appId: "1:102889078940:web:77826010eb1b66d0db6d59",
    measurementId: "G-16R93YQK98"
    }),
    AngularFireStorageModule,

    ToastrModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
