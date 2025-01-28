import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CategoriesComponent } from "../categories/categories.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CategoriesComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  booksData: any = [];

  constructor() {
    this.booksData = this.getCartData();
  }

  ngOnInit() {
    this.booksData = this.getCartData();
    console.log(this.booksData);
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
