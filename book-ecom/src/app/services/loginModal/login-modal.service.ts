import { Injectable } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginModalService {
  private modalInstance: bootstrap.Modal | undefined;
  dataFormSignUp: any = [];
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  initializeModal(modalId: 'LoginSignUpModal'): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement, {
        backdrop: 'static',
        keyboard: false,
      });
    } else {
      console.error(`Modal with id ${modalId} not found.`);
    }
  }

  showModal(): void {
    if (this.modalInstance) {
      this.modalInstance.show();
    } else {
      console.error('Modal instance is not initialized.');
    }
  }

  hideModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }
  submitform(data: any) {
    let signUpData = JSON.parse(localStorage.getItem('SignUpData') || '[]');
    if (!Array.isArray(signUpData)) {
      signUpData = [];
    }
    signUpData.push(data);
    localStorage.setItem('SignUpData', JSON.stringify(signUpData));
  }

  getSignUpData(data: any): boolean {
    const signUpData = localStorage.getItem('SignUpData');
    let datafromsignup = [];
    try {
      const parsedData = JSON.parse(signUpData || '[]');
      datafromsignup = Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
      console.error('Error parsing SignUpData:', error);
      return false;
    }
    const matchedUser = datafromsignup.find(
      (element: any) =>
        element.SEmail === data.LEmail && element.SPassword === data.LPassword
    );

    if (matchedUser) {
      sessionStorage.setItem('SEmail', matchedUser.SEmail);
      this.loggedIn$.next(true);
      return true;
    } else {
      console.log('Invalid credentials', datafromsignup);
      return false;
    }
  }

  checkStatus() {
    return this.loggedIn$.asObservable();
  }

  checkLoggedIn() {
    this.loggedIn$.next(localStorage.getItem('SEmail') ? true : false);
  }
}
