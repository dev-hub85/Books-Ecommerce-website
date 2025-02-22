import { Component, inject } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CartService } from '../../services/cart/cart.service';
import { Cart } from '../../interfaces/cart/cart';
import { Subscription } from 'rxjs';
import { Books } from '../../interfaces/books/books';
import { BooksService } from '../../services/books/books.service';
import { CartCardComponent } from '../cart-card/cart-card.component';
import { OrderService } from '../../services/order/order.service';
import { OrderFormComponent } from '../order-form/order-form.component';
import { LoginModalService } from '../../services/loginModal/login-modal.service';

@Component({
  selector: 'app-cart',
  imports: [FooterComponent, CartCardComponent, OrderFormComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private data = inject(CartService);
  private modalService = inject(OrderService);
  cartItems: Cart[] = [];
  bookData: Books[] = [];
  loggedIn: boolean = false;
  cartSubscription: Subscription = new Subscription();
  private dataOfBooks = inject(BooksService);
  private loginService = inject(LoginModalService);
  loginSubscription: Subscription = new Subscription();
  ngOnInit() {
    this.cartSubscription = this.data.getCartChanges().subscribe((cart) => {
      this.cartItems = cart;
      this.bookData = [];
      this.cartItems.forEach((item) => {
        this.dataOfBooks.getBookByName(item['name']);
        this.bookData.push(this.dataOfBooks.getBookByName(item['name'])[0]);
      });
    });
    this.loginService.checkLoggedIn();
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  openModal(): void {
    this.loginService.checkStatus().subscribe((status) => {
      this.loggedIn = status;
      if (this.loggedIn) {
        this.loginService.hideModal();
        this.modalService.showModal();
      } else {
        this.loginService.showModal();
        this.modalService.hideModal();
      }
    });
  }
}
