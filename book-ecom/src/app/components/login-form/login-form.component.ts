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
    const signUp = document.getElementById('sign-up'),
      signIn = document.getElementById('sign-in'),
      loginIn = document.getElementById('login-in'),
      loginUp = document.getElementById('login-up');

    signUp!.addEventListener('click', () => {
      // Remove classes first if they exist
      loginIn!.classList.remove('block');
      loginUp!.classList.remove('none');

      // Add classes
      loginIn!.classList.toggle('none');
      loginUp!.classList.toggle('block');
    });

    signIn!.addEventListener('click', () => {
      // Remove classes first if they exist
      loginIn!.classList.remove('none');
      loginUp!.classList.remove('block');

      // Add classes
      loginIn!.classList.toggle('block');
      loginUp!.classList.toggle('none');
    });
    this.modalService!.initializeModal('LoginSignUpModal');
  }
}
