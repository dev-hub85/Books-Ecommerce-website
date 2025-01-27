import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CategoriesComponent } from "../categories/categories.component";
import { CarouselComponent } from "../carousel/carousel.component";
import { BooksComponent } from "../books/books.component";

@Component({
  selector: 'app-home',
  imports: [CarouselComponent, BooksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  image1Url: string = "images/img1.jpg"
  logo : string = "images/logo.png"
}
