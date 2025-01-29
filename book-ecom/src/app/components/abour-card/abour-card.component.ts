import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-abour-card',
  imports: [],
  templateUrl: './abour-card.component.html',
  styleUrl: './abour-card.component.scss',
})
export class AbourCardComponent {
  @Input() aboutContent: any = [];
}
