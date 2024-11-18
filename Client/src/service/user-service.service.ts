import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from 'src/model/user';
import { Observable, retry, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private httpClient: HttpClient) {}
  public uploadUser(user: user): Observable<user> {
    let dataURL: string = `http://localhost:5000/register/register`;
    return this.httpClient.post<user>(dataURL, user).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
