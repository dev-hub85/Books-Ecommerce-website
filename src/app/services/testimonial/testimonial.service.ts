import { Injectable } from '@angular/core';
import { Testimonial } from '../../interfaces/testimonial/testimonial';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  path = 'json/testimonial.json';

  async getTestimonialData(): Promise<Testimonial[]> {
    return await fetch(this.path)
      .then((response) => response.json())
      .then((data) => data);
  }
}
