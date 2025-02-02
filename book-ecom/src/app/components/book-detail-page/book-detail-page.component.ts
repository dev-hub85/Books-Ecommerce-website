import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { BooksService } from '../../services/books/books.service';
import { Books } from '../../interfaces/books/books';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-book-detail-page',
  imports: [FooterComponent],
  templateUrl: './book-detail-page.component.html',
  styleUrl: './book-detail-page.component.scss',
})
export class BookDetailPageComponent {
  bookTitle: string = '';
  bookData: Books[] = [];
  fullStars: number = 0;
  halfStars: number = 0;
  emptyStars: number = 0;
  numberOfBooks: number = 1;

  private route = inject(ActivatedRoute);
  private data = inject(BooksService);
  private cartdata = inject(CartService);

  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      this.bookTitle = param['bookTitle'];
      this.bookData = this.data.getBookByName(this.bookTitle);
      if (this.bookData && this.bookData[0]['stars'] !== undefined) {
        this.calculateStars(this.bookData[0]['stars']);
        this.appendStarsHtml();
      }
    });
  }

  calculateStars(stars: number) {
    this.fullStars = Math.floor(stars);
    this.halfStars = stars % 1 >= 0.5 ? 1 : 0;
    this.emptyStars = 5 - (this.fullStars + this.halfStars);
  }

  appendStarsHtml() {
    let container = document.querySelector('.stars-container');

    for (let i = 0; i < this.fullStars; i++) {
      const fullStar = document.createElement('span');
      fullStar.classList.add('star', 'full-star');
      fullStar.innerHTML = '★';
      container?.appendChild(fullStar);
    }
    for (let i = 0; i < this.halfStars; i++) {
      const halfStar = document.createElement('span');
      halfStar.classList.add('star', 'half-star');
      halfStar.innerHTML = '⯨';
      container?.appendChild(halfStar);
    }

    for (let i = 0; i < this.emptyStars; i++) {
      const emptyStar = document.createElement('span');
      emptyStar.classList.add('star', 'empty-star');
      emptyStar.innerHTML = '☆';
      container?.appendChild(emptyStar);
    }
  }

  incrementBooks() {
    this.numberOfBooks++;
  }
  decrementBooks() {
    if (this.numberOfBooks > 0) {
      this.numberOfBooks--;
    } else if (this.numberOfBooks == 0) {
      this.numberOfBooks = 0;
    }
  }

  moveToCart(book: string, quantity: number) {
    this.cartdata.addToCart(book, quantity);
  }
}
