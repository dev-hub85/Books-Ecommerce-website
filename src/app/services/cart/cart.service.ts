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
    this.getDataFromStorage();
  }
  getDataFromStorage() {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (storedCart.length > 0) {
      this.cartData.set(storedCart);
      this.cartSubject.next(storedCart);
    }
  }

  addToCart(title: string, quantity: number, priceofbook: number) {
    const existingBook = this.cartData().find(
      (book: { name: string }) => book.name === title
    );
    if (existingBook) {
      existingBook.quantity += quantity;
      existingBook.price += priceofbook;
    } else {
      this.cartData.update((cart) => [
        ...cart,
        { name: title, quantity: 1, price: priceofbook },
      ]);
    }
    const updatedCart = this.cartData();
    this.cartSubject.next(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.getDataFromStorage();
  }

  updateItemQuantity(title: string, quantity: number) {
    const book = this.cartData().find(
      (book: { name: string }) => book.name === title
    );
    if (book) {
      book.quantity = quantity;
      const updatedCart = this.cartData();
      this.cartSubject.next(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }

  removeItem(title: string) {
    const updatedCart = this.cartData().filter((book) => book.name !== title);
    this.cartData.set(updatedCart);
    this.cartSubject.next(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  getItemQuantity(title: string) {
    const book = this.cartData().find(
      (book: { name: string }) => book.name === title
    );
    console.log(book);
    if (book) {
      return book.quantity;
    }
    return 0;
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
