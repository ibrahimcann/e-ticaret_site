import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private storageKey = 'orders';

  constructor() {}

  getOrdersByUser(userId: string): Order[] {
    const orders = this.getAllOrders();
    return orders.filter(order => order.userId === userId);
  }

  getOrderById(orderId: string): Order | undefined {
    const orders = this.getAllOrders();
    return orders.find(order => order.id === orderId);
  }

  addOrder(order: Order): void {
    const orders = this.getAllOrders();
    orders.push(order);
    this.saveOrders(orders);
  }

  private getAllOrders(): Order[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveOrders(orders: Order[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(orders));
  }
} 