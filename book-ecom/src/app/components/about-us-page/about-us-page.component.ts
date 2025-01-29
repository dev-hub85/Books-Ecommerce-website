import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { AbourCardComponent } from '../abour-card/abour-card.component';

@Component({
  selector: 'app-about-us-page',
  imports: [FooterComponent, AbourCardComponent],
  templateUrl: './about-us-page.component.html',
  styleUrl: './about-us-page.component.scss',
})
export class AboutUsPageComponent {
  dataUrl: string = 'json/about.json';
  aboutData: any = [];
  ngOnInit() {
    fetch(this.dataUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.aboutData = data;
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
}
