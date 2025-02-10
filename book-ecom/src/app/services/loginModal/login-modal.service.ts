import { Injectable } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root',
})
export class LoginModalService {
  private modalInstance: bootstrap.Modal | undefined;

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
}
