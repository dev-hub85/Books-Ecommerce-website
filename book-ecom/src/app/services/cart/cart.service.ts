import { Injectable, signal } from '@angular/core';
import { Cart } from '../../interfaces/cart/cart';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartData = signal<Cart[]>([]);
  private cartSubject = new BehaviorSubject<Cart[]>([]);

  constructor() {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (storedCart.length > 0) {
      this.cartData.set(storedCart);
      this.cartSubject.next(storedCart);
    }
  }

  addToCart(title: string, quantity: number) {
    const existingBook = this.cartData().find(
      (book: { name: string }) => book.name === title
    );
    if (existingBook) {
      existingBook.quantity += quantity;
    } else {
      this.cartData.update((cart) => [...cart, { name: title, quantity: 1 }]);
    }
    const updatedCart = this.cartData();
    this.cartSubject.next(updatedCart);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  getTotalQuantity(): number {
    return this.cartData().reduce((total, book) => total + book.quantity, 0);
  }

  getCartData(): Cart[] {
    return this.cartData();
  }

  getCartChanges() {
    return this.cartSubject.asObservable();
  }
}
