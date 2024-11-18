import { Article } from './../model/article';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ArticleService {
  envnewArticle = 'http://localhost:5000/newarticle/newarticle/';
  envArticleList = 'http://localhost:5000/articleList/articleList/';
  envviewArticle = 'http://localhost:5000/viewArticle/viewArticle/';

  envupdateArticle = 'http://localhost:5000/updatearticle/updatearticle/';
  envDeleteArticle = 'http://localhost:5000/deleteArticle/deleteArticle/';
  envuserarticleList = 'http://localhost:5000/userarticleData/userarticleData/';
  envactivityFeedArticleCreated = 'http://localhost:5000/activityFeedArticleCreated/activityFeedArticleCreated/';
  envactivityFeedArticleUpdated = 'http://localhost:5000/activityFeedArticleUpdated//activityFeedArticleUpdated/';
  constructor(private httpClient: HttpClient) {}
  
  getNewArticles = new Subject<boolean>();

  public articleList(Article: any): Observable<Article> {
    return this.httpClient.post<Article>(this.envArticleList, Article)
      .pipe(retry(1));
  }
  
  public userarticleData(Article: any): Observable<Article> {
    return this.httpClient.post<Article>(this.envuserarticleList, Article)
      .pipe(retry(1));
  }
 
  public activityFeedArticleCreated(Article: any): Observable<Article> {
    return this.httpClient.post<Article>(this.envactivityFeedArticleCreated, Article)
      .pipe(retry(1));
  }

  public activityFeedArticleUpdated(Article: any): Observable<Article> {
    return this.httpClient.post<Article>(this.envactivityFeedArticleUpdated, Article)
      .pipe(retry(1));
  }

  public createArticle(Article: Article): Observable<Article> {
    return this.httpClient.post<Article>(this.envnewArticle, Article).pipe(
      map((res) => {
        this.getNewArticles.next(true);
        return res;
      }),
      catchError(this.handleError)
    );
  }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  viewArticleService(id: any, body: any) {
    return this.httpClient.post<Article>(this.envviewArticle + id, body);
  }

  updateArticleService(id: any, body: any) {
    return this.httpClient.put<Article>(this.envupdateArticle + id, body).pipe(
      map((res) => {
        this.getNewArticles.next(true);
        return res;
      }),
      catchError(this.handleError)
    );
  }

  deleteArticleService(id: any, body: any) {
    return this.httpClient.delete<Article>(this.envDeleteArticle + id, body).pipe(
      map((res) => {
        this.getNewArticles.next(true);
        return res;
      }),
      catchError(this.handleError)
    );
  }
}
