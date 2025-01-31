import { Injectable } from '@angular/core';
import { Books } from '../../interfaces/books/books';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  path: string = 'json/books.json';
  allData: Books[] = [];
  allTopBooks: Books[] = [];
  allPopularBooks: Books[] = [];

  getLengthOfBooks(): number {
    return this.allData.length;
  }

  getBooksByCategory(category: string): Books[] {
    return this.allData.filter(
      (book) => book.category.toLowerCase() === category.toLowerCase()
    );
  }

  async getForYouBooks(): Promise<Books[]> {
    const response = await fetch(this.path);
    this.allData = await response.json();
    return this.getRandomBooks(this.allData, 20);
  }

  getTopBooks(): Books[] {
    this.allTopBooks = [];
    for (let i = 0; i < this.allData.length; i++) {
      if (this.allData[i].stars >= 4) {
        this.allTopBooks.push(this.allData[i]);
      }
    }
    return this.getRandomBooks(this.allTopBooks, 20);
  }

  getPopularBooks(): Books[] {
    this.allPopularBooks = [];
    for (let i = 0; i < this.allData.length; i++) {
      if (this.allData[i].availability <= 50) {
        this.allPopularBooks.push(this.allData[i]);
      }
    }
    return this.getRandomBooks(this.allPopularBooks, 20);
  }
  getBookByName(name: string): Books[] {
    return this.allData.filter(
      (book) => book.title.toLowerCase() === name.toLowerCase()
    );
  }

  getRandomBooks(arr: Books[], num: number): Books[] {
    const result: Books[] = [];
    const seenIndexes = new Set();
    num = Math.min(num, arr.length);
    while (result.length < num) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      if (!seenIndexes.has(randomIndex)) {
        seenIndexes.add(randomIndex);
        result.push(arr[randomIndex]);
      }
    }
    return result;
  }
}
