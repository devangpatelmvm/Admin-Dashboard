import { Map } from 'src/model/map'
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, Subject, throwError } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  envnewMap = 'http://localhost:5000/newMap/newMap/';
  envmapList = 'http://localhost:5000/mapList/mapList';
  envmapView = 'http://localhost:5000/mapView/mapView/';
  envDeleteMap = 'http://localhost:5000/deleteMap/deleteMap/';
  getNewMap = new Subject<boolean>();
  constructor(private httpClient: HttpClient) { }

  public newMapData(Map: any): Observable<Map> {
    return this.httpClient.post<Map>(this.envnewMap, Map).pipe(
      map((res) => {
        this.getNewMap.next(true);
        return res;
      }),
      catchError(this.handleError)
    );
  }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }


  public mapList(Article: any): Observable<Map> {
    return this.httpClient.post<Map>(this.envmapList, Map)
      .pipe(retry(1));
  }


  public mapView(id: any, body: any) {
    return this.httpClient.post<Map>(this.envmapView + id, body);
  }


  deleteMap(id: any, body: any) {
    return this.httpClient.delete<Map>(this.envDeleteMap + id, body).pipe(
      map((res) => {
        this.getNewMap.next(true);
        return res;
      }),
      catchError(this.handleError)
    );
  }



}
