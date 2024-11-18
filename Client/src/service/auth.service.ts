import { user } from './../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  headers = new HttpHeaders().set('auth-token', this.getToken());

  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {}

  public getUserInfo() {
    let dataURL: string = `http://localhost:5000/userInfo`;
    return this.httpClient.get<user>(dataURL, {
      headers: new HttpHeaders().set('auth-token', this.getToken()),
    });
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public loginUser(user: user): Observable<user> {
    let dataURL: string = `http://localhost:5000/login/login`;
    return this.httpClient.post<user>(dataURL, user).pipe(retry(1));
  }
  handleError(handleError: any): any {
    throw new Error('Method not implemented.');
  }
}
