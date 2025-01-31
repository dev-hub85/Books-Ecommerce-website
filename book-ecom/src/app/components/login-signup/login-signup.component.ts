import { Component, Input, SimpleChanges } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-login-signup',
  imports: [],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss',
})
export class LoginSignupComponent {
  @Input() loginModal: boolean = false;
  modalInstance: any;

  ngOnInit() {
    console.log(this.loginModal);
  }

  ngAfterViewInit() {
    const modalElement = document.getElementById('loginModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement, {
        keyboard: false,
        backdrop: 'static',
      });
      modalElement.addEventListener('#loginModal', () => {
        this.loginModal = false;
        this.modalInstance.dispose();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['loginModal'] && this.modalInstance) {
      if (this.loginModal) {
        this.modalInstance.show();
      } else {
        this.modalInstance.hide();
      }
    }
  }
}
