import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoginService {

  private GET_LIST_USER = 'https://jsonplaceholder.typicode.com/users';  // URL to web api
  private GET_LIST_TODO = 'https://jsonplaceholder.typicode.com/todos';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient) { }

  /** GET users from the server */
  getListUser(): Observable<any[]> {
    return this.http.get<any[]>(this.GET_LIST_USER, this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched users')),
        catchError(this.handleError<any[]>('getUsers', []))
      );
  }

  /** GET users from the server */
  getListTodo(): Observable<any[]> {
    return this.http.get<any[]>(this.GET_LIST_TODO, this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched todos')),
        catchError(this.handleError<any[]>('getTodos', []))
      );
  }

  /** Add todo to the server */
  addTodo(data): Observable<any[]> {
    return this.http.post<any[]>(this.GET_LIST_TODO, data, this.httpOptions)
      .pipe(
        tap(_ => console.log('add todo')),
        catchError(this.handleError<any[]>('add todo', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);


      // TODO: better job of transforming error for user consumption
      alert(`${operation} failed`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}