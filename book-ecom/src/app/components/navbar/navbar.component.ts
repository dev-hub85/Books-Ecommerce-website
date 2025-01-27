import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CategoriesComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  booksdata: any = [];

  constructor() {
    this.booksdata = this.getCartData();
    console.log(this.booksdata);
  }

  ngOnInit() {
    this.booksdata = this.getCartData();
    console.log(this.booksdata);
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
