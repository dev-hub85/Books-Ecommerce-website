import { Component, inject } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { AboutCardComponent } from '../about-card/about-card.component';
import { About } from '../../interfaces/about/about';
import { AboutService } from '../../services/about/about.service';

@Component({
  selector: 'app-about-us-page',
  imports: [FooterComponent, AboutCardComponent],
  templateUrl: './about-us-page.component.html',
  styleUrl: './about-us-page.component.scss',
})
export class AboutUsPageComponent {
  aboutData: About[] = [];
  private aboutService = inject(AboutService);

  async ngOnInit() {
    this.aboutData = await this.aboutService.getAboutData();
  }
}
