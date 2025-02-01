import {
  Component,
  EventEmitter,
  inject,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../../services/books/books.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categoriesList: string[] = [];
  private categoriesSubscription: Subscription = new Subscription();

  private data = inject(BooksService);
  private router = inject(Router);

  ngOnInit() {
    this.categoriesSubscription = this.data
      .getCategories()
      .subscribe((categories) => {
        this.categoriesList = categories;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.categoriesSubscription = this.data
      .getCategories()
      .subscribe((categories) => {
        this.categoriesList = categories;
      });
  }
  ngOnDestroy() {
    this.categoriesSubscription.unsubscribe();
  }

  moveToBookPage(categoryTitle: string) {
    localStorage.setItem('category_title', categoryTitle);
    this.router.navigate(['books', categoryTitle]);
  }
}
