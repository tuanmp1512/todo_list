import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LocalStorageService } from '../Shared/service/localStorage.service';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from '../Shared/components/confirm-dialog/confirm-dialog.component';
import { EditDialogComponent } from '../Shared/components/edit-dialog/edit-dialog.component';
import { LoginService } from '../login/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  addTodoForm: FormGroup;
  dataSource = [];
  displayedColumns: string[] = ['todo', 'action'];
  user;
  addValidationMessages = {
    todo: [
      { type: 'required', message: 'Todo is required' },
      { type: 'minlength', message: 'Todo must be at least 5 characters long' },
      { type: 'maxlength', message: 'Todo cannot be more than 250 characters long' },
    ],
  };
  
  constructor(private fb: FormBuilder,
              private localStorageservice: LocalStorageService,
              private dialog: MatDialog,
              private loginService: LoginService) {
    this.addTodoForm = this.fb.group({
      todo: new FormControl('', Validators.compose([
        Validators.maxLength(250),
        Validators.minLength(5),
        Validators.required
       ]))
    });
  }

  ngOnInit() {
    this.dataSource = this.localStorageservice.getTodoListByUserId() || [];
    this.user = this.localStorageservice.getUserAfterLogin() || null;
  }

  ngAfterViewInit() {
    setTimeout(() => {
    this.dataSource = this.localStorageservice.getTodoListByUserId() || [];
    }, 1000);
  }

  editTodo(todo) {
    const title = todo.title;
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: {title: title, idTodo: todo.id}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataSource = this.localStorageservice.getTodoListByUserId() || [];
    });
  }

  deleteConfirmDialog(todo) {
    const title = todo.title;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {title: title, idTodo: todo.id}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataSource = this.localStorageservice.getTodoListByUserId() || [];
    });
  }

  onSubmitAddTodo(value) {
    const todoTemp = {
      id: this.dataSource[this.dataSource.length - 1].id + 1,
      title: value.todo,
      userId: this.user.id
    };
    this.dataSource.push(todoTemp);
    this.localStorageservice.saveTodoListByUserId(this.dataSource);
    this.dataSource = this.localStorageservice.getTodoListByUserId() || [];
  }
}
