import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesComponent } from "../categories/categories.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CategoriesComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  items : number = 5;
  imageUrl : string = "images/logo.png"
}
