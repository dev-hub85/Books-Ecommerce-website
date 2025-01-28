import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
})
export class BookCardComponent {
  @Input() book: any = {};
  cartData: any = [];

  constructor(private router: Router) {}

  addToCart(title: string) {
    const existingBook = this.cartData.find(
      (book: { title: string }) => book.title === title
    );
    if (existingBook) {
      existingBook.quantity++;
      localStorage.setItem('book', JSON.stringify(this.cartData));
    } else {
      this.cartData.push({ title: title, quantity: 1 });
      localStorage.setItem('book', JSON.stringify(this.cartData));
    }
    console.log(this.cartData);
  }

  moveToBookDetail(bookCategory: string, bookTitle: string) {
    this.router.navigate(['/bookDetails', bookCategory], {
      queryParams: { bookTitle },
    });
  }
}
