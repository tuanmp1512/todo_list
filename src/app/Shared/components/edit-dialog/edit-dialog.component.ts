import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LocalStorageService } from '../../service/localStorage.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html'
  // styleUrls: ['./confirm-dialog.component.css']
})
export class EditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private localService: LocalStorageService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOKClick(): void {
    const listTodo = this.localService.getTodoListByUserId();
    listTodo.map(todo => {
        if (todo.id === this.data.idTodo) {
            todo.title = this.data.title;
        }
    });
    this.localService.saveTodoListByUserId(listTodo);
    this.dialogRef.close();
  }
}
