import { Injectable } from '@angular/core';
import { About } from '../../interfaces/about/about';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  path: string = 'json/about.json';

  async getAboutData(): Promise<About[]> {
    const response = await fetch(this.path);
    return await response.json();
  }
}
