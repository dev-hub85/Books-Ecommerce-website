import { Component, effect, inject, signal } from '@angular/core';
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
  isLoading = signal<boolean>(true);

  private data = inject(BooksService);

  constructor() {
    effect(async () => {
      const [forU, top, popular] = await Promise.all([
        this.data.fetchForYouBooks(),
        this.data.fetchTopBooks(),
        this.data.fetchPopularBooks(),
      ]);
      this.forUBooks = forU;
      this.topBooks = top;
      this.popularBooks = popular;

      this.isLoading.set(false);
    });
  }

  ngOnDestroy() {
    this.isLoading.set(true);
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
