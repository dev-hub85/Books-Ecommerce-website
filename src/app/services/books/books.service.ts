import { Injectable, signal, computed } from '@angular/core';
import { Books } from '../../interfaces/books/books';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../../interfaces/category/category';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  allData = signal<Books[]>([]);
  allTopBooks = signal<Books[]>([]);
  allPopularBooks = signal<Books[]>([]);
  isLoading = signal<boolean>(false);

  categoriesList: Category[] = [];
  private categories$ = new BehaviorSubject<Category[]>([]);

  constructor() {
    const cachedBooks = localStorage.getItem('allBooks');
    if (cachedBooks) {
      this.allData.set(JSON.parse(cachedBooks));
      this.extractCategories(this.allData());
    }
  }

  getCategories() {
    return this.categories$.asObservable();
  }

  async fetchAllBooks() {
    if (this.allData().length) return;
    this.isLoading.set(true);
    try {
      const response = await fetch('json/books.json');
      const data = await response.json();
      const booksWithIds = data.map((book: Books['body']) => ({
        body: book,
        id: uuidv4(), // Generate a unique ID for each book
      }));
      this.allData.set(booksWithIds);
      localStorage.setItem('allBooks', JSON.stringify(booksWithIds));
      this.extractCategories(booksWithIds);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async fetchTopBooks() {
    if (this.allTopBooks().length)
      return this.getRandomBooks(this.allTopBooks(), 20);
    return this.fetchBooksFromJson(this.allTopBooks, 'json/books.json');
  }

  async fetchPopularBooks() {
    if (this.allPopularBooks().length)
      return this.getRandomBooks(this.allPopularBooks(), 20);
    return this.fetchBooksFromJson(this.allPopularBooks, 'json/books.json');
  }

  async fetchForYouBooks() {
    if (this.allData().length) return this.getRandomBooks(this.allData(), 20);
    return this.fetchBooksFromJson(this.allData, 'json/books.json');
  }

  async fetchBooksFromJson(
    targetSignal: typeof this.allData,
    jsonPath: string
  ) {
    try {
      const response = await fetch(jsonPath);
      const data = await response.json();
      const booksWithIds = data.map((book: Books['body']) => ({
        body: book,
        id: uuidv4(),
      }));
      targetSignal.set(booksWithIds);
    } catch (error) {
      console.error(`Error fetching books from ${jsonPath}:`, error);
    }
    return this.getRandomBooks(targetSignal(), 20);
  }

  async fetchCategoriesList() {
    if (this.categoriesList.length) return;
    this.extractCategories(this.allData());
  }

  extractCategories(books: Books[]) {
    const uniqueCategories = new Set<string>();
    const categoriesWithIds = books
      .map((book) => book.body.category)
      .filter((category) => {
        if (!uniqueCategories.has(category)) {
          uniqueCategories.add(category);
          return true;
        }
        return false;
      })
      .map((category) => ({
        category,
        id: uuidv4(),
      }));
    this.categoriesList = categoriesWithIds;
    this.categories$.next(this.categoriesList);
  }

  getBooksByCategory(category: string): Books[] {
    return this.allData().filter(
      (book) => book.body.category.toLowerCase() === category.toLowerCase()
    );
  }

  getBookByName(name: string): Books[] {
    return (
      this.allData().filter(
        (book) => book.body.title.toLowerCase() === name.toLowerCase()
      ) || []
    );
  }

  getRandomBooks(arr: Books[], num: number): Books[] {
    const shuffled = [...arr];
    let m = shuffled.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = shuffled[m];
      shuffled[m] = shuffled[i];
      shuffled[i] = t;
    }
    return shuffled.slice(0, num);
  }

}
