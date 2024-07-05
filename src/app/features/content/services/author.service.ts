import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://openlibrary.org';
  }
  getAuthorName(key: string): Observable<string> {
    return this.http.get<{ name: string }>(`${this.baseUrl}${key}.json`).pipe(
      map(response => response.name)
    );
  }


}