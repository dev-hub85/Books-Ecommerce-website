import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesComponent } from '../categories/categories.component';
import { BooksService } from '../../services/books/books.service';
import { CartService } from '../../services/cart/cart.service';
import { Cart } from '../../interfaces/cart/cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CategoriesComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  navbarToggler: any;
  navbarCollapse: any;
  cartSubscription: Subscription = new Subscription();

  private data = inject(BooksService);
  private cartdata = inject(CartService);

  ngOnInit() {
    this.data.getCategoriesList();
    this.cartSubscription = this.cartdata.getCartChanges().subscribe((cart) => {
      this.items = this.cartdata.getTotalQuantity();
    });
    this.navbarToggler = document.querySelector(
      '.navbar-toggler'
    ) as HTMLElement;
    this.navbarCollapse = document.querySelector(
      '#navbarTogglerDemo01'
    ) as HTMLElement;
  }
  toggleNavBar() {
    this.navbarToggler?.addEventListener('click', () => {
      if (this.navbarCollapse.classList.contains('show')) {
        this.navbarCollapse.classList.remove('show');
      } else {
        this.navbarCollapse.classList.add('show');
      }
    });
  }

  items: number = 5;
  imageUrl: string = 'images/logo.png';
}
