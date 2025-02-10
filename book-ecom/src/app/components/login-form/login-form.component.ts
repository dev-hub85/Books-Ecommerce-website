import { Component, inject, Input } from '@angular/core';
import { LoginModalService } from '../../services/loginModal/login-modal.service';
@Component({
  selector: 'app-login-form',
  imports: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private modalService = inject(LoginModalService);
  ngOnInit() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton!.addEventListener('click', () => {
      container!.classList.add('right-panel-active');
    });

    signInButton!.addEventListener('click', () => {
      container!.classList.remove('right-panel-active');
    });
    this.modalService!.initializeModal('LoginSignUpModal');
  }
}
