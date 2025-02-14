import {
  Component,
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
import { OrderFormComponent } from "../order-form/order-form.component";

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
  starIcons = signal<string[]>([]);
  numberOfBooks: number = 1;

  private route = inject(ActivatedRoute);
  private data = inject(BooksService);
  private cartdata = inject(CartService);
  private modalService = inject(OrderService);

  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      this.bookTitle = param['bookTitle'];
      this.bookData = this.data.getBookByName(this.bookTitle);
      if (this.bookData && this.bookData[0]['body']['stars'] !== undefined) {
        this.calculateStars(this.bookData[0]['body']['stars']);
        this.generateStarIcons();
      }
    });
  }

  calculateStars(stars: number) {
    this.fullStars.set(Math.floor(stars));
    this.halfStars.set(stars % 1 >= 0.5 ? 1 : 0);
    this.emptyStars.set(5 - (this.fullStars() + this.halfStars()));
  }

  generateStarIcons() {
    const icons: string[] = [];
    icons.push(...Array(this.fullStars()).fill('full'));
    icons.push(...Array(this.halfStars()).fill('half'));
    icons.push(...Array(this.emptyStars()).fill('empty'));
    this.starIcons.set(icons);
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

  moveToCart(book: string, quantity: number) {
    this.cartdata.addToCart(book, quantity);
  }

  openModal(): void {
    this.modalService!.showModal();
  }
}
