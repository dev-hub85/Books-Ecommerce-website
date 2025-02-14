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
  category: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalPages: number = 0;
  isLoading: boolean = true;
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
    this.restoreState();
    this.route.paramMap.subscribe((params) => {
      this.categoryTitle = params.get('categoryTitle')!;
      if (!this.allItems.length) {
        this.allItems.set(this.data.getBooksByCategory(this.categoryTitle));
        console.log('Data fetched:', this.allItems());
        this.totalPages = Math.ceil(this.allItems().length / this.itemsPerPage);
        this.paginate();
        this.isLoading = false;
      }
    });
  }

  paginate() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.categoriesList.set(this.allItems().slice(startIndex, endIndex));
    console.log(this.categoriesList());
    this.saveState();
  }

  nextPage() {
    console.log('clicked');
    console.log(this.currentPage + 1);
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + 1;
      this.paginate();
    }
  }
  previousPage() {
    console.log('clicked');
    console.log(this.currentPage - 1);
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.paginate();
    }
  }
  saveState() {
    const state = {
      allItems: this.allItems,
      currentPage: this.currentPage,
      categoryTitle: this.categoryTitle,
    };
    localStorage.setItem('bookPageState', JSON.stringify(state));
  }

  restoreState() {
    const savedState = localStorage.getItem('bookPageState');
    if (savedState) {
      const { currentPage, categoryTitle } = JSON.parse(savedState);
      this.currentPage = currentPage;
      this.categoryTitle = categoryTitle;
      if (!this.allItems.length) {
        this.allItems.set(this.data.getBooksByCategory(this.categoryTitle));
        console.log('Data fetched:', this.allItems());
        this.totalPages = Math.ceil(this.allItems().length / this.itemsPerPage);
        this.paginate();
      } else {
        this.totalPages = Math.ceil(this.allItems().length / this.itemsPerPage);
        this.paginate();
      }
      this.isLoading = false;
    }
  }
  ngOnDestroy(){
    this.isLoading = true;
    localStorage.removeItem('bookPageState');
  }
}
