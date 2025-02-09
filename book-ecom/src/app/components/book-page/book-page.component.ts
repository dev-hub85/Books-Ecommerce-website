import { Component, inject, signal } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { ActivatedRoute } from '@angular/router';
import { BookCardComponent } from '../book-card/book-card.component';
import { BookPlaceholderComponent } from '../book-placeholder/book-placeholder.component';
import { Books } from '../../interfaces/books/books';
import { BooksService } from '../../services/books/books.service';

@Component({
  selector: 'app-book-page',
  imports: [
    CarouselComponent,
    BookCardComponent,
    FooterComponent,
    BookPlaceholderComponent,
  ],
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.scss',
})
export class BookPageComponent {
  categoryTitle: string = '';
  allItems = signal<Books[]>([]);
  categoriesList = signal<Books[]>([]);
  category = signal<string>('');
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(20);
  totalPages = signal<number>(0);
  isLoading = signal<boolean>(true);
  emptyArray: any[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
  ];

  private data = inject(BooksService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.categoryTitle = params.get('categoryTitle')!;
      this.allItems.set(this.data.getBooksByCategory(this.categoryTitle));
      this.totalPages.set(
        Math.ceil(this.allItems.length / this.itemsPerPage())
      );
      this.paginate();
      this.isLoading.set(false);
    });
  }

  ngOnDestroy() {
    this.allItems.set([]);
    this.categoriesList.set([]);
    this.category.set('');
    this.currentPage.set(1);
    this.itemsPerPage.set(20);
    this.totalPages.set(0);
    this.isLoading.set(true);
  }

  paginate() {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    this.categoriesList.set(this.allItems().slice(startIndex, endIndex));
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
      this.paginate();
    }
  }
  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() + 1);
      this.paginate();
    }
  }
}
