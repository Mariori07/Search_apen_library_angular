import { CommonModule, DatePipe, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, Input  } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImgMissingDirective } from 'app/shared/directives/img-missing.directive';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  imports: [
    RouterLink,
    ImgMissingDirective,
    DatePipe,
    NgIf,
    NgOptimizedImage,
    CommonModule
  ],
  standalone: true
})
export class BookCardComponent {

  @Input() model: any;

  constructor() { }
  
  getImageUrl(coverId: number): string {
    return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  }

}
