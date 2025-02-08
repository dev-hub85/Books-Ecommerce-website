import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  items: number = 0;
  likes: number = 0;
  imageUrl: string = 'images/logo.png';
  cartSubscription: Subscription = new Subscription();
  private cartdata = inject(CartService);
  private data = inject(BooksService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.data.fetchCategoriesList();
    this.cartSubscription = this.cartdata.getCartChanges().subscribe((cart) => {
      this.items = this.cartdata.getTotalQuantity();
    });
  }
  toggleNavBar() {
    this.navbarToggler = document.querySelector(
      '.navbar-toggler'
    ) as HTMLElement;
    this.navbarCollapse = document.querySelector(
      '#navbarTogglerDemo01'
    ) as HTMLElement;
    this.navbarToggler?.addEventListener('click', () => {
      if (this.navbarCollapse.classList.contains('show')) {
        this.navbarCollapse.classList.remove('show');
      } else {
        this.navbarCollapse.classList.add('show');
      }
    });
  }
}
