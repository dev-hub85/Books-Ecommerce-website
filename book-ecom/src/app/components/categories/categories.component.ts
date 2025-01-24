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

  ngOnInit() {
    fetch(this.dataUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.data = data;
        this.categories_list = [];
        for (let i = 0; i < this.data.length; i++) {
          if (!this.categories_list.includes(this.data[i]['category'])) {
            this.categories_list.push(this.data[i]['category']);
          }
          console.log(this.data[i]);
        }

        console.log(this.categories_list);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
}
