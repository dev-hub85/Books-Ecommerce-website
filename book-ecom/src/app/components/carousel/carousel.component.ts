import { Component } from '@angular/core';
import { BookStyleComponent } from "../book-style/book-style.component";
@Component({
  selector: 'app-carousel',
  imports: [BookStyleComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  imageUrl: string = 'images/image1.jpg';
  imageUrl2: string = 'images/image2.jpeg';
}
