import { Component } from '@angular/core';
import { TestimonialCardComponent } from '../testimonial-card/testimonial-card.component';

@Component({
  selector: 'app-testimonial',
  imports: [TestimonialCardComponent],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss',
})
export class TestimonialComponent {
  dataUrl = "json/testimonial.json";
  testimonialData: any = [];
  ngOnInit() {
    fetch(this.dataUrl)
      .then((response) => response.json())
      .then((data) => {
        this.testimonialData = data;
        console.log(this.testimonialData);
      });
  }
}
