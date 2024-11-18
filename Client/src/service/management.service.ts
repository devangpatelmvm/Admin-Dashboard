import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, retry, Subject } from 'rxjs';
import { UserManagement } from 'src/model/user-management';
@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  envDelete = 'http://localhost:5000/delete/delete/';
  envUpdate = 'http://localhost:5000/update/update/';
  envUserList = 'http://localhost:5000/userList/userList/';
  envactivityFeedUserRegistered = 'http://localhost:5000/activityFeedUserRegistered/activityFeedUserRegistered/';
  envactivityFeedUserUpdated = 'http://localhost:5000/activityFeedUserUpdated/activityFeedUserUpdated/';

  token: any = localStorage.getItem('token');
  headers: HttpHeaders = new HttpHeaders().append('auth-token', this.token);

  // getUserList = new BehaviorSubject<any>({});

  constructor(private httpClient: HttpClient) {}

  public userList(UserManagement: any): Observable<UserManagement> {
    return this.httpClient.post<UserManagement>(this.envUserList, UserManagement)
      .pipe(retry(1));
  }

  public activityFeedUserRegistered(UserManagement: any): Observable<UserManagement> {
    return this.httpClient.post<UserManagement>(this.envactivityFeedUserRegistered, UserManagement)
      .pipe(retry(1));
  }
  public activityFeedUserUpdated(UserManagement: any): Observable<UserManagement> {
    return this.httpClient.post<UserManagement>(this.envactivityFeedUserUpdated, UserManagement)
      .pipe(retry(1));
  }
 

 public deleteService(id: any, body: any) {
    return this.httpClient.delete<UserManagement>(this.envDelete + id, body);
  }

 public updateService(id: any, body: any) {
    return this.httpClient.put<UserManagement>(this.envUpdate + id, body);
  }
}
