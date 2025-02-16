import { NgIf } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order/order.service';
import { CartService } from '../../services/cart/cart.service';
import { Subscription } from 'rxjs';
import { Cart } from '../../interfaces/cart/cart';

@Component({
  selector: 'app-order-form',
  imports: [NgIf, FormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
})
export class OrderFormComponent {
  showCardDetails = false;
  @Input() dataofcart= signal<Cart[]>( []);
  items: number = 0;
  private modalService = inject(OrderService);
  cartSubscription: Subscription = new Subscription();
  private cartdata = inject(CartService);
  cartItems: Cart[] = [];
  Constructor() {
    this.modalService!.initializeModal('OrderFormModal');
  }

  ngOnInit() {
    this.cartSubscription = this.cartdata.getCartChanges().subscribe((cart) => {
      this.items = this.cartdata.getTotalQuantity();
      this.cartItems = this.cartdata.getCartData();
      console.log(this.cartItems);
    });
    console.log(this.dataofcart)
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
