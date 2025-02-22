import { Component, inject, Input, NgModule } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookStyleComponent } from "../book-style/book-style.component";

@Component({
  selector: 'app-cart-card',
  imports: [FormsModule, BookStyleComponent],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.scss',
})
export class CartCardComponent {
  @Input() book: any = {};
  quantity: number = 0;
  private data = inject(CartService);
  private router = inject(Router);
  ngOnInit() {
    this.quantity = this.data.getItemQuantity(this.book['body']['title']);
  }

  removeItem(title: string) {
    this.data.removeItem(title);
  }
  moveToBookDetail(bookCategory: string, bookTitle: string) {
    this.router.navigate(['/bookDetails', bookCategory], {
      queryParams: { bookTitle },
    });
  }
  onQuantityChange() {
    if (this.quantity <= -1) {
      this.data.removeItem(this.book['body']['title']);
    } else {
      this.data.updateItemQuantity(this.book['body']['title'], this.quantity);
    }
  }
  incrementQuantity() {
    this.quantity++;
    this.onQuantityChange();
  }

  decrementQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
      this.onQuantityChange();
    }
  }
}
