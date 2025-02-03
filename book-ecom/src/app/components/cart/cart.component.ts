import { Component, inject } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CartService } from '../../services/cart/cart.service';
import { Cart } from '../../interfaces/cart/cart';
import { Subscription } from 'rxjs';
import { Books } from '../../interfaces/books/books';
import { BooksService } from '../../services/books/books.service';
import { CartCardComponent } from '../cart-card/cart-card.component';

@Component({
  selector: 'app-cart',
  imports: [FooterComponent, CartCardComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private data = inject(CartService);
  cartItems: Cart[] = [];
  bookData: Books[] = [];
  cartSubscription: Subscription = new Subscription();
  private dataOfBooks = inject(BooksService);
  ngOnInit() {
    console.log(this.bookData);
    this.cartSubscription = this.data.getCartChanges().subscribe((cart) => {
      this.cartItems = cart;
      this.bookData = [];
      this.cartItems.forEach((item) => {
        this.dataOfBooks.getBookByName(item['name']);
        this.bookData.push(this.dataOfBooks.getBookByName(item['name'])[0]);
      });
    });
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
