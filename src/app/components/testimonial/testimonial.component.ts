import { Component, inject } from '@angular/core';
import { TestimonialCardComponent } from '../testimonial-card/testimonial-card.component';
import { TestimonialService } from '../../services/testimonial/testimonial.service';
import { Testimonial } from '../../interfaces/testimonial/testimonial';

@Component({
  selector: 'app-testimonial',
  imports: [TestimonialCardComponent],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss',
})
export class TestimonialComponent {
  testimonialData!: Testimonial[];
  private data = inject(TestimonialService);
  async ngOnInit() {
    this.testimonialData = await this.data.getTestimonialData();
  }
}
