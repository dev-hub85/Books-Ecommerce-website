import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-book-detail-page',
  imports: [FooterComponent],
  templateUrl: './book-detail-page.component.html',
  styleUrl: './book-detail-page.component.scss',
})
export class BookDetailPageComponent {
  dataUrl = 'json/books.json';
  bookTitle: string = '';
  bookData: any = [];
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      this.bookTitle = param['bookTitle'];
      console.log(this.bookTitle);
      fetch(this.dataUrl)
       .then((response) => response.json())
       .then((data) => {
          this.bookData = data.find((book: { title: string; }) => book.title === this.bookTitle);
          console.log(this.bookData);
        });
    });
  }
}
