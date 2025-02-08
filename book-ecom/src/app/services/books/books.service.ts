import { Injectable, signal } from '@angular/core';
import { Books } from '../../interfaces/books/books';
import { BehaviorSubject } from 'rxjs';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { firebaseConfig } from '../../../firebase_config';
import { initializeApp } from 'firebase/app';
import { Category } from '../../interfaces/category/category';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
@Injectable({
  providedIn: 'root',
})
export class BooksService {
  bookCollection: any = collection(db, 'Books');
  categoryList: any = collection(db, 'Categories');
  popularBooks: any = collection(db, 'Popular Books');
  topBooks: any = collection(db, 'TopBooks');
  allData = signal<Books[]>([]);
  allTopBooks = signal<Books[]>([]);
  allPopularBooks = signal<Books[]>([]);
  categoriesList: Category[] = [];

  private categories$ = new BehaviorSubject<Category[]>([]);

  getCategories() {
    return this.categories$.asObservable();
  }

  async getAllBooks() {
    try {
      const snapShot = await getDocs(this.bookCollection);
      const data = snapShot.docs.map((doc) => {
        return { body: doc.data() as Books['body'], id: doc.id };
      });
      this.allData.set(data);
      console.log(this.allData());
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }

  getBooksByCategory(category: string): Books[] {
    return this.allData().filter(
      (book) =>
        book['body']['category'].toLowerCase() === category.toLowerCase()
    );
  }

  async getForYouBooks(): Promise<Books[]> {
    return this.getRandomBooks(this.allData(), 20);
  }

  async getTopBooks() {
    try {
      const snapShot = await getDocs(this.topBooks);
      const data = snapShot.docs.map((doc) => {
        return { body: doc.data() as Books['body'], id: doc.id };
      });
      this.allTopBooks.set(data);
      console.log(this.allTopBooks());
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
    return this.getRandomBooks(this.allTopBooks(), 20);
  }

  async getPopularBooks() {
    try {
      const snapShot = await getDocs(this.popularBooks);
      const data = snapShot.docs.map((doc) => {
        return { body: doc.data() as Books['body'], id: doc.id };
      });
      this.allPopularBooks.set(data);
      console.log(this.allPopularBooks());
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
    return this.getRandomBooks(this.allPopularBooks(), 20);
  }
  getBookByName(name: string): Books[] {
    return (
      this.allData().filter(
        (book) => book['body']['title'].toLowerCase() === name.toLowerCase()
      ) || []
    );
  }

  async getCategoriesList() {
    try {
      const snapShot = await getDocs(this.categoryList);
      const data = snapShot.docs.map((doc) => {
        return { category: doc.data() as Category['category'], id: doc.id };
      });
      this.categoriesList.push(...data);
    } catch (error) {
      console.error('Error getting documents: ', error);
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
