import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesComponent } from '../categories/categories.component';
import { BooksService } from '../../services/books/books.service';
import { CartService } from '../../services/cart/cart.service';
import { Cart } from '../../interfaces/cart/cart';
import { Subscription } from 'rxjs';
import { LoginModalService } from '../../services/loginModal/login-modal.service';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-navbar',
  imports: [CategoriesComponent, RouterLink, LoginFormComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  navbarToggler: any;
  navbarCollapse: any;
  items: number = 0;
  likes: number = 0;
  loggedIn: any = false;
  imageUrl: string = 'images/logo.png';
  cartSubscription: Subscription = new Subscription();
  private cartdata = inject(CartService);
  private data = inject(BooksService);
  private modalService = inject(LoginModalService);
  loginSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.data.fetchCategoriesList();
    this.navbarToggler = document.querySelector(
      '.navbar-toggler'
    ) as HTMLElement;
    this.navbarCollapse = document.querySelector(
      '#navbarTogglerDemo01'
    ) as HTMLElement;
    this.cartSubscription = this.cartdata.getCartChanges().subscribe((cart) => {
      this.items = this.cartdata.getTotalQuantity();
    });
    this.loginSubscription = this.modalService
      .checkStatus()
      .subscribe((status) => {
        this.loggedIn = status;
        if (this.loggedIn == true) {
          this.modalService.hideModal();
        }
        console.log('Login Status Updated:', status);
      });
  }
  toggleNavBar() {
    if (this.navbarCollapse.classList.contains('show')) {
      this.navbarCollapse.classList.remove('show');
    } else {
      this.navbarCollapse.classList.add('show');
    }
  }
  openModal(): void {
    this.toggleNavBar();
    this.modalService!.showModal();
  }
  logOut(){
    alert("Logged Out Successfully");
    this.modalService!.logout();
    this.toggleNavBar()
  }
}
