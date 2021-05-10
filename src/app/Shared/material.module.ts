import { NgModule } from '@angular/core';
// import {MatNativeDateModule, MatDatepickerModule, MatIconModule,
//     MatButtonModule, MatCheckboxModule,
//     MatSelectModule,
//     MatToolbarModule, MatCardModule,
//     MatFormFieldModule, MatInputModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
imports: [
    MatIconModule,
    MatButtonModule,
    // MatCheckboxModule,
    MatToolbarModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule
],
exports: [
    FormsModule,
    MatIconModule,
    MatButtonModule,
    // MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule
],
})
export  class  MyMaterialModule {}
