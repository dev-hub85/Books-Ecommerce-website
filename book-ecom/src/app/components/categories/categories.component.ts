import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  dataUrl: string = 'json/books.json';
  data: any = [];
  categoriesList: string[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    fetch(this.dataUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        this.data = data;
        this.categoriesList = [];
        for (let i = 0; i < this.data.length; i++) {
          let category =
            this.data[i]['category'][0].toUpperCase() +
            this.data[i]['category'].slice(1).toLowerCase();
          if (!this.categoriesList.includes(category)) {
            this.categoriesList.push(category);
          }
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  moveToBookPage(categoryTitle: string) {
    localStorage.setItem('category_title', categoryTitle);
    this.router.navigate(['books', categoryTitle]);
  }
}
