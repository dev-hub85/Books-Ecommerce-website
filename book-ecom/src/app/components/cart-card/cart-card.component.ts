import { Component, inject, Input, NgModule } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-card',
  imports: [FormsModule],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.scss',
})
export class CartCardComponent {
  @Input() book: any = {};
  quantity: number = 0;
  private data = inject(CartService);
  private router = inject(Router);
  ngOnInit() {
    this.quantity = this.data.getItemQuantity(this.book['title']);
    console.log(this.quantity, this.book);
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
    if (this.quantity <= 0) {
      this.data.removeItem(this.book['title']);
    } else {
      this.data.updateItemQuantity(this.book['title'], this.quantity);
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
