import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LocalStorageService } from '../../service/localStorage.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
  // styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private localService: LocalStorageService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOKClick(): void {
    const listTodo = this.localService.getTodoListByUserId();
    const listTodoAFterDelete = listTodo.filter(todo => todo.id !== this.data.idTodo);
    this.localService.saveTodoListByUserId(listTodoAFterDelete);
    this.dialogRef.close();
  }
}
