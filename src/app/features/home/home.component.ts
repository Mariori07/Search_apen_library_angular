import {Component, OnInit} from '@angular/core';
import { BookService } from '../content/services/book.service'
import {SeoService} from '../../core/services/seo.service';
import {take} from 'rxjs/operators';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MovieCardComponent} from "../../shared/components/poster-card-view/poster-card.component";
import {RouterLink} from "@angular/router";
import {NgForOf, SlicePipe} from "@angular/common";
import {SwiperOptions} from "swiper/types";
import {SwiperDirective} from "../../shared/directives/swiper.directive";
import {MatIcon} from "@angular/material/icon";
import { BookModel } from '../content/models/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    MovieCardComponent,
    RouterLink,
    NgForOf,
    SwiperDirective,
    SlicePipe,
    MatTabGroup,
    MatTab,
    MatIcon
  ],
  standalone: true
})

export class HomeComponent implements OnInit {

  config: SwiperOptions = {
    watchSlidesProgress: true,
    breakpoints: {
      992: {slidesPerView: 6.3, spaceBetween: 20, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
      768: {slidesPerView: 4.3, spaceBetween: 15, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
      576: {slidesPerView: 3.3, spaceBetween: 15, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
      320: {slidesPerView: 2.3, spaceBetween: 10, slidesOffsetBefore: 10, slidesOffsetAfter: 10},
    }
  };

  artTabList =  [ 'Architecture', 'Art History', 'Dance', 'Fashion', 'Film', 'Music', 'Painting', 'Photography' ]; 
  animalTabList = [ 'Bears', 'Cats', 'Kittens', 'Dogs', 'Puppies' ]; 
  scienceMathematicTabList = [ 'Biology', 'Chemistry', 'Mathematics', 'Physics', 'Programming' ]; 
  businessFinanceTabList = [ 'Management', 'Entrepreneurship', 'Business Economics', 'Business Success', 'Finance' ]; 
  historyTabList =  [ 'Ancient Civilization', 'Archaeology', 'Anthropology', 'World War II', 'Social Life and Customs' ]; 
  healthWellnesTabList = [ 'Cooking', 'Cookbooks', 'Mental Health', 'Exercise', 'Nutrition', 'Self-help' ];
  
  artList: Array<BookModel> = [];
  animalList: Array<BookModel> = [];
  scienceMathematicList: Array<BookModel> = [];
  businessFinanceList: Array<BookModel> = [];
  historyList: Array<BookModel> = [];
  healthWellnesList: Array<BookModel> = [];

  selectedMovieTab = 0;
  selectedTVTab = 0;
  selectedArtTab = 0;
  selectedScienceMathematicTab = 0;

  constructor(
    private bookService: BookService,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.seo.generateTags({
      title: 'Angular search library',
      description: 'search library Home Page',
      image: 'https://png.pngtree.com/background/20230527/original/pngtree-an-old-bookcase-in-a-library-picture-image_2760144.jpg'
    });

    this.getBookByTheme('architecture');
    this.getAnimalList('bears');
    this.getScienceMathematicList('biology');
  }

  //
  
  getBookByTheme(type: string): void {
    this.bookService.getBookByTheme(type).pipe(take(1)).subscribe(res => {
      this.animalList = res.works;
    });
  }

  tabBookByThemeChange({ index }: { index: number; }) {
    this.selectedTVTab = index;
    const selectedType = this.artTabList[index];
    if (selectedType) {
      const themeType = selectedType.toLowerCase().replace(/\s+/g, '_');
      this.getBookByTheme(themeType);
    }
  }

  
  //
  
  getAnimalList(type: string): void {
    this.bookService.getBookByTheme(type).pipe(take(1)).subscribe(res => {
      this.artList = res.works;
    });
  }

  tabAnimalChange({ index }: { index: number; }) {
    this.selectedArtTab = index;
    const selectedType = this.animalTabList[index];
    if (selectedType) {
      const themeType = selectedType.toLowerCase().replace(/\s+/g, '_');
      this.getAnimalList(themeType);
    }
  }

  //
  
  getScienceMathematicList(type: string): void {
    this.bookService.getBookByTheme(type).pipe(take(1)).subscribe(res => {
      this.scienceMathematicList = res.works;
    });
  }

  tabScienceMathematicChange({ index }: { index: number; }) {
    this.selectedScienceMathematicTab = index;
    const selectedType = this.scienceMathematicTabList[index];
    if (selectedType) {
      const themeType = selectedType.toLowerCase().replace(/\s+/g, '_');
      this.getScienceMathematicList(themeType);
    }
  }

}
