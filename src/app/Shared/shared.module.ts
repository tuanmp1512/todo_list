import { NgModule } from '@angular/core';
import { MyMaterialModule } from './material.module';
import { NavbarComponent } from './components/nav-bar/nav-bar.component';
import { SharedRoutingModule } from './shared-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ConfirmDialogComponent,
    EditDialogComponent
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
    ConfirmDialogComponent,
    EditDialogComponent
  ]
})
export class SharedModule { }
