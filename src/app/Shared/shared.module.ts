import { NgModule } from '@angular/core';
import { MyMaterialModule } from './material.module';
import { NavbarComponent } from './components/nav-bar/nav-bar.component';
import { SharedRoutingModule } from './shared-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MyMaterialModule,
    SharedRoutingModule,
  ],
  exports: [
    NavbarComponent,
    MyMaterialModule,
    SharedRoutingModule,
  ]
})
export class SharedModule { }
