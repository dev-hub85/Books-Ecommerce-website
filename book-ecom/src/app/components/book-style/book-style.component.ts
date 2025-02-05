import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-book-style',
  imports: [],
  templateUrl: './book-style.component.html',
  styleUrl: './book-style.component.scss',
})
export class BookStyleComponent {
  @Input() imageUrl: string = '';

}
