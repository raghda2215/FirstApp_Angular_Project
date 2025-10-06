import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/Models/Pub';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getAllarticle(): Observable<Article []> {
    return this.http.get<Article[]>('http://localhost:3000/article');
  }
  addarticle(article: Article): Observable<void> {
    return this.http.post<void>('http://localhost:3000/article', article); // matraja3ch data 
  }
  getarticleByID(id: String): Observable<Article> {
    return this.http.get<Article>(`http://localhost:3000/article/${id}`);
  }

  updatearticle(id: String, article: Article): Observable<void> {
    return this.http.put<void>(`http://localhost:3000/article/${id}`, article);
  }

  deletearticle(id: String): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/article/${id}`);
  }
}
