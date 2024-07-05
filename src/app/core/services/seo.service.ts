import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private meta: Meta) { }
  generateTags(config) {
    // default values
    config = {
      title: 'Search library',
      description: 'My SEO friendly Angular Component',
      image: 'https://search_apen_library_angular-c91ba.firebaseapp.com/images/logo.png',
      slug: '',
      ...config
    };
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'AngularMovie' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image });
  }
}
