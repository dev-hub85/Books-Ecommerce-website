import { Component, inject, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase_config';
import { BooksService } from './services/books/books.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private data = inject(BooksService);

  constructor() {
    const app = initializeApp(firebaseConfig);
    this.data.fetchAllBooks();
  }
}
