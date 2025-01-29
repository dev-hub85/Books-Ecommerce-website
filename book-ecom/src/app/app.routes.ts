import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { BookDetailPageComponent } from './components/book-detail-page/book-detail-page.component';
import { AboutUsPageComponent } from './components/about-us-page/about-us-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'books/:categoryTitle',
    component: BookPageComponent,
  },
  {
    path: 'bookDetails/:categoryTitle',
    component: BookDetailPageComponent,
  },
  {
    path : 'about',
    component : AboutUsPageComponent,
  },
    {
    path : 'contact',
    component : ContactPageComponent,
  }
];
