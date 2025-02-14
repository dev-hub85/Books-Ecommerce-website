import { Injectable } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private modalInstance: bootstrap.Modal | undefined;

  initializeModal(modalId: 'OrderFormModal'): void {
    const modalElement = document.getElementById(modalId);
    console.log(modalElement);
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
    this.initializeModal('OrderFormModal');
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
