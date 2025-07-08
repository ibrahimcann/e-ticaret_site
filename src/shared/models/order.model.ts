export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
  paymentType: PaymentType;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: any;
  quantity: number;
  price: number;
  total: number;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  product: any;
  quantity: number;
  price: number;
}

export enum PaymentType {
  SINGLE = 'Tek Çekim',
  INSTALLMENT = 'Taksitli Kredi Kartı',
  CASH_ON_DELIVERY = 'Kapıda Ödeme',
  BANK_TRANSFER = 'Havale/EFT'
}