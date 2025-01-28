import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-book-detail-page',
  imports: [FooterComponent],
  templateUrl: './book-detail-page.component.html',
  styleUrl: './book-detail-page.component.scss',
})
export class BookDetailPageComponent {
  dataUrl = 'json/books.json';
  bookTitle: string = '';
  bookData: any = {};
  fullStars: number = 0;
  halfStars: number = 0;
  emptyStars: number = 0;
  numberOfBooks: number = 1;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      this.bookTitle = param['bookTitle'];
      fetch(this.dataUrl)
        .then((response) => response.json())
        .then((data) => {
          this.bookData = data.find(
            (book: { title: string }) => book.title === this.bookTitle
          );
          if (this.bookData && this.bookData['stars'] !== undefined) {
            this.calculateStars(this.bookData['stars']);
            this.appendStarsHtml();
          }
        });
    });
  }

  calculateStars(stars: number) {
    this.fullStars = Math.floor(stars);
    this.halfStars = stars % 1 >= 0.5 ? 1 : 0;
    this.emptyStars = 5 - (this.fullStars + this.halfStars);
  }

  appendStarsHtml() {
    let container = document.querySelector('.stars-container');

    // Append full stars
    for (let i = 0; i < this.fullStars; i++) {
      const fullStar = document.createElement('span');
      fullStar.classList.add('star', 'full-star');
      fullStar.innerHTML = '★';
      container?.appendChild(fullStar);
    }

    // Append half stars
    for (let i = 0; i < this.halfStars; i++) {
      const halfStar = document.createElement('span');
      halfStar.classList.add('star', 'half-star');
      halfStar.innerHTML = '⯨';
      container?.appendChild(halfStar);
    }

    // Append empty stars
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
}
