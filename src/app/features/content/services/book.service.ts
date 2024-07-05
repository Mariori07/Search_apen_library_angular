import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl: string;
  apiKey: string;
  language: string;
  region: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://openlibrary.org/';
  }
  getBookByTheme(type: string): Observable<any> {
    return this.http.get(`${this.baseUrl}subjects/${type}.json`)
  }

  getBookDetail(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}works/${id}.json`)
  }

  getAdvancedsearch(q: string, title: string, author: string, isbn: string, subject: string, place: string, person: string, publisher: string, page: number, limit: number): Observable<any> {
    let params = new HttpParams();
    if (q) { params = params.append('q', q); }
    if (title) { params = params.append('title', title); }
    if (author) { params = params.append('author', author); }
    if (isbn) { params = params.append('isbn', isbn); }
    if (subject) { params = params.append('subject', subject); }
    if (place) { params = params.append('place', place); }
    if (person) { params = params.append('person', person); }
    if (publisher) { params = params.append('publisher', publisher); }
    if (page) { params = params.append('page', page.toString()); }
    if (limit) { params = params.append('limit', limit.toString()); }
    return this.http.get(`${this.baseUrl}search.json`, { params });
  }

}
