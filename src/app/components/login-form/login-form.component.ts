import { Component, inject } from '@angular/core';
import { LoginModalService } from '../../services/loginModal/login-modal.service';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private modalService = inject(LoginModalService);
  model: any = {
    LEmail: '',
    LPassword: '',
    SEmail: '',
    SPassword: '',
    SCPassword: '',
  };
  value: boolean = false;
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

  submitLoginData(form: NgForm) {
    console.log('Login attempt:', form.value);

    const loginSuccess = this.modalService.getSignUpData(form.value);
    if (loginSuccess) {
      alert('Login successful!');
    } else {
      alert('Invalid email or password.');
    }
    form.resetForm();
  }

  submitSignupData(form: NgForm) {
    console.log(form.value);
    this.modalService.submitform(form.value);
    alert('You have Successfully SignedUp');
    form.resetForm();
  }
}
