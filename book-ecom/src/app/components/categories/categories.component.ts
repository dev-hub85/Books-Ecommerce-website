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
  isDropdownOpen: boolean = false;
  private categoriesSubscription: Subscription = new Subscription();

  private data = inject(BooksService);
  private router = inject(Router);

  ngOnInit() {
    this.categoriesSubscription = this.data
      .getCategories()
      .subscribe((categories) => {
        this.categoriesList = categories;
      });
    console.log(this.categoriesList);
  }

  toggleDropdown() {
    const dropdownTrigger = document.getElementById('dropdownTrigger');
    const dropdownMenu = document.getElementById('dropdownMenu');
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      dropdownMenu!.classList.add('show');
      dropdownTrigger!.innerHTML = 'Categories ▲';
    } else {
      dropdownMenu!.classList.remove('show');
      dropdownTrigger!.innerHTML = 'Categories ▼';
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.categoriesSubscription = this.data
      .getCategories()
      .subscribe((categories) => {
        this.categoriesList = categories;
      });
  }
  moveToBookPage(categoryTitle: string) {
    localStorage.setItem('category_title', categoryTitle);
    this.router.navigate(['books', categoryTitle]);
    this.toggleDropdown();
  }
}
