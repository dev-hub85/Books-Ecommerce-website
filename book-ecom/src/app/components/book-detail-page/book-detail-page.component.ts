import {
  Component,
  effect,
  ElementRef,
  inject,
  signal,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { BooksService } from '../../services/books/books.service';
import { Books } from '../../interfaces/books/books';
import { CartService } from '../../services/cart/cart.service';
import { OrderService } from '../../services/order/order.service';
import { OrderFormComponent } from '../order-form/order-form.component';
import { Cart } from '../../interfaces/cart/cart';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-book-detail-page',
  imports: [FooterComponent, OrderFormComponent],
  templateUrl: './book-detail-page.component.html',
  styleUrl: './book-detail-page.component.scss',
})
export class BookDetailPageComponent {
  bookTitle: string = '';
  bookData: Books[] = [];
  fullStars = signal<number>(0);
  halfStars = signal<number>(0);
  emptyStars = signal<number>(0);
  starIcons = signal<[string, string][]>([]); // Each star gets a unique ID
  numberOfBooks: number = 1;
  price: number = 0;
  dataofcart = signal<Cart[]>([]);

  private route = inject(ActivatedRoute);
  private data = inject(BooksService);
  private cartdata = inject(CartService);
  private modalService = inject(OrderService);

  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      this.bookTitle = param['bookTitle'];
      this.bookData = this.data.getBookByName(this.bookTitle);

      if (this.bookData.length > 0) {
        const book = this.bookData[0]?.body;
        this.price = book?.price || 0;
        this.dataofcart.set([
          {
            name: this.bookTitle,
            quantity: this.numberOfBooks,
            price: this.price * this.numberOfBooks,
          },
        ]);
        if (book?.stars !== undefined) {
          this.calculateStars(book.stars);
          this.generateStarIcons();
        }
      }
    });
  }

  calculateStars(stars: number) {
    this.fullStars.set(Math.floor(stars));
    this.halfStars.set(stars % 1 >= 0.5 ? 1 : 0);
    this.emptyStars.set(5 - (this.fullStars() + this.halfStars()));
  }

  generateStarIcons() {
    const icons: [string, string][] = [];

    icons.push(
      ...new Array(this.fullStars())
        .fill(null)
        .map((): [string, string] => ['full', uuidv4()])
    );
    icons.push(
      ...new Array(this.halfStars())
        .fill(null)
        .map((): [string, string] => ['half', uuidv4()])
    );
    icons.push(
      ...new Array(this.emptyStars())
        .fill(null)
        .map((): [string, string] => ['empty', uuidv4()])
    );

    this.starIcons.set(icons);
  }

  incrementBooks() {
    this.numberOfBooks++;
    this.updateCartData();
  }

  decrementBooks() {
    if (this.numberOfBooks > 1) {
      this.numberOfBooks--;
      this.updateCartData();
    }
  }

  updateCartData() {
    this.dataofcart.set([
      {
        name: this.bookTitle,
        quantity: this.numberOfBooks,
        price: this.price * this.numberOfBooks,
      },
    ]);
  }

  moveToCart(book: string, quantity: number, priceofbook: number) {
    this.cartdata.addToCart(book, quantity, priceofbook);
    this.numberOfBooks = 1;
  }

  openModal(): void {
    this.modalService!.showModal();
  }
}
