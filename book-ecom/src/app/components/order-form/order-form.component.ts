import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-order-form',
  imports: [NgIf, FormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
})
export class OrderFormComponent {
  showCardDetails = false;
  private modalService = inject(OrderService);
  Constructor() {
    this.modalService!.initializeModal('OrderFormModal');
  }

  onPaymentMethodChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      console.log(target.value);
      this.showCardDetails = target.value === 'creditCard';
    }
  }

  onSubmit() {
    alert('Order submitted successfully!');
  }
}
