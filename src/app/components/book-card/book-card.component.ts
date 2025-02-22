import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { BookStyleComponent } from '../book-style/book-style.component';

@Component({
  selector: 'app-book-card',
  imports: [BookStyleComponent],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
})
export class BookCardComponent {
  @Input() book: any = {};
  private router = inject(Router);
  private data = inject(CartService);
  priceofbook : number = 0;

  moveToBookDetail(bookCategory: string, bookTitle: string) {
    this.router.navigate(['/bookDetails', bookCategory], {
      queryParams: { bookTitle },
    });
  }
  moveToCart(book: string, quantity: number , price: number) {
    this.priceofbook = price * quantity;
    this.data.addToCart(book, quantity,this.priceofbook);
  }
}
