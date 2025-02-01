import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-navbar',
  imports: [CategoriesComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  booksData: any = [];
  navbarToggler : any;
  navbarCollapse : any;

  constructor() {
    this.booksData = this.getCartData();
  }

  ngOnInit() {
    this.booksData = this.getCartData();
    console.log(this.booksData);
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

  getCartData() {
    const storedData = localStorage.getItem('book');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return [];
  }

  items: number = 5;
  imageUrl: string = 'images/logo.png';
}
