import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BookService } from './services/book.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BookDetailModel } from './models/bookDetail.model';
import { take } from 'rxjs/operators';
import { MovieCardComponent } from 'app/shared/components/poster-card-view/poster-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { NgForOf, TitleCasePipe } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  imports: [
    MatPaginatorModule,
    MovieCardComponent,
    MatButtonModule,
    MatCardModule,
    MatFormField,
    MatLabel,
    TitleCasePipe,
    NgForOf,
    FormsModule
  ],
  standalone: true
})
export class ContentComponent implements OnInit {
  contentType = 'books';
  books: Array<BookDetailModel> = [];
  Libro: BookDetailModel;
  totalResults: number = 0;
  pageSize: number = 20;
  currentPage: number = 1;

  // Filtros
  q: string = 'search_query';
  title: string = '';
  author: string = '';
  isbn: string = '';
  subject: string = '';
  place: string = '';
  person: string = '';
  publisher: string = '';

  constructor(private bookService: BookService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    // if(this.title != null || this.author != null || this.isbn != null || this.subject != null || this.place != null || this.person != null || this.publisher != null){
    //   this.q = null;
    // }
    this.bookService.getAdvancedsearch(
      this.q,
      this.title,
      this.author,
      this.isbn,
      this.subject,
      this.place,
      this.person,
      this.publisher,
      this.currentPage,
      this.pageSize
    ).subscribe({
      next: (response) => {
        this.books = response.docs;
        this.Libro = this.books.length > 0 ? this.books[0] : null; 
        this.totalResults = response.numFound;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching books:', error);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.search();
  }

  getImageUrl(coverId: number): string {
    return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  }


}
