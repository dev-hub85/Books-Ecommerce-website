import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  dataUrl: any = 'jsonfiles/booksdata.json';
  data: any = [];
  categories_list: any = [];
  category: string = '';

  ngOnInit() {
    fetch(this.dataUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.data = data;
        this.categories_list = [];
        for (let i = 0; i < this.data.length; i++) {
          this.category =
            this.data[i]['category'][0].toUpperCase() +
            this.data[i]['category'].slice(1).toLowerCase();
          if (!this.categories_list.includes(this.category)) {
            this.categories_list.push(this.category);
          }
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
}
