import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { BookService } from '../../services/book.service';
import { AuthorService } from '../../services/author.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from '../../../../core/services/seo.service';
import { take, map, mergeMap } from 'rxjs/operators';
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { MatProgressBar } from "@angular/material/progress-bar";
import { CdkDrag, CdkDragHandle } from "@angular/cdk/drag-drop";
import { MovieCardComponent } from "../../../../shared/components/poster-card-view/poster-card.component";
import { ImgMissingDirective } from "../../../../shared/directives/img-missing.directive";
import { MatIcon } from "@angular/material/icon";
import { MatButton } from "@angular/material/button";
import { MatDialog, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { BookDetailModel } from '../../models/bookDetail.model';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  imports: [
    NgForOf,
    NgIf,
    DatePipe,
    CdkDrag,
    CdkDragHandle,
    MovieCardComponent,
    ImgMissingDirective,
    MatProgressBar,
    MatIcon,
    MatButton,
    MatDialogContent,
    MatDialogTitle
  ],
  standalone: true
})
export class DetailComponent implements OnInit {
  contentType = '';
  recomendedContentList: Array<PaginationModel> = [];
  isLoading = true;
  bookId: string;
  book: BookDetailModel;
  authorNames: { [key: string]: string } = {};

  @ViewChild('matTrailerDialog') matTrailerDialog: TemplateRef<any>;

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private seo: SeoService,
    public trailerDialog: MatDialog
  ) { }

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('url');
    this.getBookDetail(this.bookId);
    this.isLoading = false;
  }

  getBookDetail(id: string): void {
    this.bookService.getBookDetail(id).pipe(
      take(1),
      mergeMap(book => {
        this.book = book;
        const authorKeys = book.authors.map(a => a.author.key);
        return this.fetchAuthorNames(authorKeys);
      })
    ).subscribe();
  }

  fetchAuthorNames(keys: string[]): Observable<void> {
    const authorNameRequests = keys.map(key => 
      this.authorService.getAuthorName(key).pipe(
        map(name => ({ key, name }))
      )
    );

    return forkJoin(authorNameRequests).pipe(
      map(authorNamesArray => {
        authorNamesArray.forEach(author => {
          this.authorNames[author.key] = author.name;
        });
      })
    );
  }

  getCoverImageUrl(coverId: number): string {
    return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  }
  getAuthorsList(authors: any[]): string {
    return authors
      .map(author => {
        const authorName = this.authorNames[author.author.key];
        const authorUrl = `https://openlibrary.org${author.author.key}`;
        return `<a href="${authorUrl}" target="_blank">${authorName}</a>`;
      })
      .join(', ');
  }

}
