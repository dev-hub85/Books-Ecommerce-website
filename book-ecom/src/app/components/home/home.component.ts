import { Component } from '@angular/core';
import { CarouselComponent } from "../carousel/carousel.component";
import { FooterComponent } from "../footer/footer.component";
import { HomePageBooksComponent } from "../home-page-books/home-page-books.component";
import { TestimonialComponent } from "../testimonial/testimonial.component";

@Component({
  selector: 'app-home',
  imports: [
    CarouselComponent,
    FooterComponent,
    HomePageBooksComponent,
    TestimonialComponent,
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  image1Url: string = 'images/img1.jpg';
  logo: string = 'images/logo.png';
}
