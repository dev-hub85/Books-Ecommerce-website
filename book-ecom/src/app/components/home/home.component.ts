import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CategoriesComponent } from "../categories/categories.component";

@Component({
  selector: 'app-home',
  imports: [CategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  image1Url: string = "images/img1.jpg"
  logo : string = "images/logo.png"
}
