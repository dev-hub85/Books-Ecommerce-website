import { Component } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  all_data: any = [];
  dataUrl: string = 'jsonfiles/booksdata.json';
  forubooks: any = [];
  alltopbooks: any = [];
  topbooks: any = [];
  allpopularbooks: any = [];
  popularbooks: any = [];

  ngOnInit() {
    fetch(this.dataUrl)
      .then((response) => response.json())
      .then((data) => {
        this.all_data = data;
        this.forubooks = this.getRandomBooks(this.all_data, 20);
        this.gettopbooks();
        this.getpopularbooks();
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  getpopularbooks() {
    this.allpopularbooks = [];
    for (let i = 0; i < this.all_data.length; i++) {
      if (this.all_data[i]['availability'] <= 50) {
        this.allpopularbooks.push(this.all_data[i]);
      }
    }
    this.popularbooks = this.getRandomBooks(this.allpopularbooks, 20);
  }

  gettopbooks() {
    this.alltopbooks = [];
    for (let i = 0; i < this.all_data.length; i++) {
      if (this.all_data[i]['stars'] >= 4) {
        this.alltopbooks.push(this.all_data[i]);
      }
    }
    this.topbooks = this.getRandomBooks(this.alltopbooks, 20);
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
