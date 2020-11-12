import { AccountComponent } from './pages/account/account.component';
import { HotronguoingheoComponent } from './pages/hotronguoingheo/hotronguoingheo.component';
import { NguoituthienComponent } from './pages/nguoituthien/nguoituthien.component';
import { SidebarComponent } from './block/sidebar/sidebar.component';
import { AdminDefaultLayoutComponent } from './block/admin-default-layout/admin-default-layout.component';
import { HeaderComponent } from './block/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BrowserModule } from '@angular/platform-browser';
import { AdminRoutingModule } from './admin-routing.module';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { PersonComponent } from './pages/person/person.component';
@NgModule({
  declarations: [
    HeaderComponent,
    DashBoardComponent,
    SidebarComponent,
    NguoituthienComponent,
    HotronguoingheoComponent,
    AdminDefaultLayoutComponent,
    AccountComponent,
    PersonComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AdminRoutingModule,
  ],
  providers: [],

})
export class AdminModule { }
