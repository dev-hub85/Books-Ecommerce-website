import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { ActivatedRoute } from '@angular/router';
import { BookCardComponent } from "../book-card/book-card.component";
import { BookPlaceholderComponent } from "../book-placeholder/book-placeholder.component";

@Component({
  selector: 'app-book-page',
  imports: [
    CarouselComponent,
    BookCardComponent,
    FooterComponent,
    BookPlaceholderComponent
],
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.scss',
})
export class BookPageComponent {
  categoryTitle: string = '';
  dataUrl: any = 'json/books.json';
  data: any[] = [];
  allItems: any[] = [];
  categoriesList: any[] = [];
  category: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalPages: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.categoryTitle = params.get('categoryTitle')!;
      console.log('Category title from route:', this.categoryTitle);

      fetch(this.dataUrl)
        .then((response) => response.json())
        .then((data) => {
          this.data = data;
          this.allItems = [];
          for (let i = 0; i < this.data.length; i++) {
            this.category =
              this.data[i]['category'][0].toUpperCase() +
              this.data[i]['category'].slice(1).toLowerCase();
            if (
              this.category.toLowerCase() === this.categoryTitle.toLowerCase()
            ) {
              this.allItems.push(this.data[i]);
            }
          }
          this.totalPages = Math.ceil(this.allItems.length / this.itemsPerPage);
          this.paginate();
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
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
