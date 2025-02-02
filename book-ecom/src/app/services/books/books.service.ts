import { Injectable } from '@angular/core';
import { Books } from '../../interfaces/books/books';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  path: string = 'json/books.json';
  allData: Books[] = [];
  allTopBooks: Books[] = [];
  allPopularBooks: Books[] = [];
  categoriesList: string[] = [];

  private categories$ = new BehaviorSubject<string[]>([]);

  getCategories() {
    return this.categories$.asObservable();
  }

  getDataFromStorage() {
    const booksData = localStorage.getItem('books');
    this.allData = booksData ? JSON.parse(booksData) : [];
  }

  getLengthOfBooks(): number {
    this.getDataFromStorage();
    return this.allData.length;
  }

  getBooksByCategory(category: string): Books[] {
    this.getDataFromStorage();
    return this.allData.filter(
      (book) => book.category.toLowerCase() === category.toLowerCase()
    );
  }

  async getForYouBooks(): Promise<Books[]> {
    const response = await fetch(this.path);
    this.allData = await response.json();
    localStorage.setItem('books', JSON.stringify(this.allData));
    return this.getRandomBooks(this.allData, 20);
  }

  getTopBooks(): Books[] {
    this.getDataFromStorage();
    this.allTopBooks = [];
    for (let i = 0; i < this.allData.length; i++) {
      if (this.allData[i].stars >= 4) {
        this.allTopBooks.push(this.allData[i]);
      }
    }
    return this.getRandomBooks(this.allTopBooks, 20);
  }

  getPopularBooks(): Books[] {
    this.getDataFromStorage();
    this.allPopularBooks = [];
    for (let i = 0; i < this.allData.length; i++) {
      if (this.allData[i].availability <= 50) {
        this.allPopularBooks.push(this.allData[i]);
      }
    }
    return this.getRandomBooks(this.allPopularBooks, 20);
  }
  getBookByName(name: string): Books[] {
    this.getDataFromStorage();
    return (
      this.allData.filter(
        (book) => book.title.toLowerCase() === name.toLowerCase()
      ) || []
    );
  }

  getCategoriesList() {
    this.getDataFromStorage();
    this.categoriesList = [];
    for (let i = 0; i < this.allData.length; i++) {
      let category =
        this.allData[i]['category'][0].toUpperCase() +
        this.allData[i]['category'].slice(1).toLowerCase();
      if (!this.categoriesList.includes(category)) {
        this.categoriesList.push(category);
      }
    }
    this.categories$.next(this.categoriesList);
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
