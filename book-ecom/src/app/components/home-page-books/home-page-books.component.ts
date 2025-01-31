import { Component, inject } from '@angular/core';
import { BookPlaceholderComponent } from '../book-placeholder/book-placeholder.component';
import { BookCardComponent } from '../book-card/book-card.component';
import { Books } from '../../interfaces/books/books';
import { BooksService } from '../../services/books/books.service';

@Component({
  selector: 'app-home-page-books',
  imports: [BookPlaceholderComponent, BookCardComponent],
  templateUrl: './home-page-books.component.html',
  styleUrl: './home-page-books.component.scss',
})
export class HomePageBooksComponent {
  forUBooks: Books[] = [];
  topBooks: Books[] = [];
  popularBooks: Books[] = [];

  private data = inject(BooksService);
  async ngOnInit() {
    this.forUBooks = await this.data.getForYouBooks();
    this.topBooks = this.data.getTopBooks();
    this.popularBooks = this.data.getPopularBooks();
  }

  scrollHorizontallyLeft(component: string): void {
    const container = document.querySelector(component) as HTMLElement;
    if (container) {
      container.scrollBy({ left: 500, behavior: 'smooth' });
    }
  }
  scrollHorizontallyRight(component: string): void {
    const container = document.querySelector(component) as HTMLElement;
    if (container) {
      container.scrollBy({ left: -500, behavior: 'smooth' });
    }
  }
}
