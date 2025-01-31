import { Component, inject } from '@angular/core';
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
  allItems: Books[] = [];
  categoriesList: any[] = [];
  category: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalPages: number = 0;

  private data = inject(BooksService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.categoryTitle = params.get('categoryTitle')!;
      this.allItems = this.data.getBooksByCategory(this.categoryTitle);
      this.totalPages = Math.ceil(this.allItems.length / this.itemsPerPage);
      this.paginate();
    });
  }

  paginate() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.categoriesList = this.allItems.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  // Navigate to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }
}
