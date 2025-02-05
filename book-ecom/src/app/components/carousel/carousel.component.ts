import { Component, inject } from '@angular/core';
import { Books } from '../../interfaces/books/books';
import { BooksService } from '../../services/books/books.service';
@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  imageUrl: string = 'images/image1.jpg';
  imageUrl2: string = 'images/image2.jpeg';
  book: Books[] = [];
  oneBook: any = {};
  index: number = -1;
  titles: string[] = [
    'The Requiem Red',
    'On a Midnight Clear',
    'Crown of Midnight (Throne of Glass #2)',
    'Avatar: The Last Airbender: Smoke and Shadow, Part 3 (Smoke and Shadow #3)',
  ];
  private data = inject(BooksService);

  ngOnInit() {
    this.titles.forEach((title) => {
      this.book.push(this.data.getBookByName(title)[0]);
    });
    this.animate();
  }
  animate() {
    const book = document.getElementsByClassName('slide');
    this.index = (this.index + 1) % book.length;
    book[this.index].classList.add('slide-right');
    setInterval(() => {
      for (let i = 0; i < book.length; i++) {
        book[i].classList.remove('slide-right');
      }
      this.index = (this.index + 1) % book.length;
      book[this.index].classList.add('slide-right');
    }, 5000);
  }
}
