import { Component } from '@angular/core';
import { BookPlaceholderComponent } from "../book-placeholder/book-placeholder.component";
import { BookCardComponent } from "../book-card/book-card.component";

@Component({
  selector: 'app-home-page-books',
  imports: [BookPlaceholderComponent, BookCardComponent],
  templateUrl: './home-page-books.component.html',
  styleUrl: './home-page-books.component.scss',
})
export class HomePageBooksComponent {
  allData: any = [];
  dataUrl: string = 'json/books.json';
  forUBooks: any = [];
  allTopBooks: any = [];
  topBooks : any = [];
  allPopularBooks: any = [];
  popularBooks : any = [];
  ngOnInit() {
    fetch(this.dataUrl)
      .then((response) => response.json())
      .then((data) => {
        this.allData = data;
        this.forUBooks = this.getRandomBooks(this.allData, 20);
        this.getTopBooks();
        this.getPopularBooks();
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  getPopularBooks() {
    this.allPopularBooks = [];
    for (let i = 0; i < this.allData.length; i++) {
      if (this.allData[i]['availability'] <= 50) {
        this.allPopularBooks.push(this.allData[i]);
      }
    }
    this.popularBooks  = this.getRandomBooks(this.allPopularBooks, 20);
  }

  getTopBooks() {
    this.allTopBooks = [];
    for (let i = 0; i < this.allData.length; i++) {
      if (this.allData[i]['stars'] >= 4) {
        this.allTopBooks.push(this.allData[i]);
      }
    }
    this.topBooks  = this.getRandomBooks(this.allTopBooks, 20);
  }

  getRandomBooks(arr: any[], num: number): any[] {
    const result: any[] = [];
    const seenIndexes = new Set();

    while (result.length < num) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      if (!seenIndexes.has(randomIndex)) {
        seenIndexes.add(randomIndex);
        result.push(arr[randomIndex]);
      }
    }
    return result;
  }

  scrollHorizontallyLeft(component: string): void {
    const container = document.querySelector(component) as HTMLElement;
    if (container) {
      container.scrollBy({ left: 500, behavior: 'smooth' }); // Scroll by 300px horizontally
    }
  }
  scrollHorizontallyRight(component: string): void {
    const container = document.querySelector(component) as HTMLElement;
    if (container) {
      container.scrollBy({ left: -500, behavior: 'smooth' }); // Scroll by 300px horizontally
    }
  }
}
