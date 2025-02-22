import { Component, inject, Input } from '@angular/core';
import { Books } from '../../interfaces/books/books';
import { FooterComponent } from '../footer/footer.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { BookCardComponent } from '../book-card/book-card.component';
import { BookPlaceholderComponent } from '../book-placeholder/book-placeholder.component';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books/books.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FooterComponent, CarouselComponent, BookCardComponent, BookPlaceholderComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  book: Books[] = [];
  emptyArray: string[] = ['1'];
  private route = inject(ActivatedRoute);
  private data = inject(BooksService);
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.book = this.data.getBookByName(params.get('bookTitle')!);
    });
    console.log(this.book);
  }
}
