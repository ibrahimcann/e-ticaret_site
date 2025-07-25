import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product, Category, Brand } from '../models/product.model';
import { User } from '../models/user.model';
import { Order, Cart, OrderStatus, PaymentType } from '../models/order.model';
import { BlogPost, BlogCategory, Page, PostStatus } from '../models/blog.model';
import { ChartType } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private products = new BehaviorSubject<Product[]>([]);
  private categories = new BehaviorSubject<Category[]>([]);
  private brands = new BehaviorSubject<Brand[]>([]);
  private users = new BehaviorSubject<User[]>([]);
  private orders = new BehaviorSubject<Order[]>([]);
  private blogPosts = new BehaviorSubject<BlogPost[]>([]);
  private pages = new BehaviorSubject<Page[]>([]);
  private cart = new BehaviorSubject<Cart | null>(null);

  public ordersChartType: ChartType = 'line';
  public paymentChartType: ChartType = 'doughnut';

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleCategories: Category[] = [
      {
        id: '1',
        name: 'Electronics',
        description: 'Electronic devices and gadgets',
        isActive: true,
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'Clothing',
        description: 'Fashion and apparel',
        isActive: true,
        createdAt: new Date()
      },
      {
        id: '3',
        name: 'Home & Garden',
        description: 'Home improvement and garden supplies',
        isActive: true,
        createdAt: new Date()
      }
    ];

    const sampleBrands: Brand[] = [
      {
        id: '1',
        name: 'TechCorp',
        description: 'Leading technology brand',
        logoUrl: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        isActive: true,
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'StyleCo',
        description: 'Fashion forward clothing',
        logoUrl: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        isActive: true,
        createdAt: new Date()
      }
    ];

    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'Wireless Headphones',
        description: 'Premium wireless headphones with noise cancellation',
        price: 199.99,
        imageurl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        category: '1',
        brand: '1',
        stock: 50,
        isactive: true,
        created_at: new Date(),
        updateat: new Date()
      },
      {
        id: '2',
        name: 'Smart Watch',
        description: 'Advanced smartwatch with health monitoring',
        price: 299.99,
        imageurl: 'https://images.pexels.com/photos/1783873/pexels-photo-1783873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        category: '1',
        brand: '1',
        stock: 30,
        isactive: true,
        created_at: new Date(),
        updateat: new Date()
      },
      {
        id: '3',
        name: 'Designer T-Shirt',
        description: 'Premium cotton t-shirt with modern design',
        price: 49.99,
        imageurl: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        category: '2',
        brand: '2',
        stock: 100,
        isactive: true,
        created_at: new Date(),
        updateat: new Date()
      },
      {
        id: '4',
        name: 'Laptop Computer',
        description: 'High-performance laptop for professionals',
        price: 1299.99,
        imageurl: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        category: '1',
        brand: '1',
        stock: 15,
        isactive: true,
        created_at: new Date(),
        updateat: new Date()
      }
    ];

    const sampleBlogPosts: BlogPost[] = [
      {
        id: '1',
        title: 'The Future of Technology',
        slug: 'future-of-technology',
        content: 'Technology continues to evolve at an unprecedented pace...',
        excerpt: 'Exploring the latest trends in technology and their impact on our daily lives.',
        featuredImage: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        authorId: '1',
        author: { name: 'John Doe' },
        categoryId: '1',
        category: { name: 'Technology' },
        tags: ['technology', 'innovation', 'future'],
        status: PostStatus.PUBLISHED,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const emptyAddress = {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    };
    const now = new Date();
    const sampleOrders: Order[] = [
      { id: '1', userId: '1', items: [], total: 199.99, status: OrderStatus.CONFIRMED, shippingAddress: emptyAddress, billingAddress: emptyAddress, createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), paymentType: PaymentType.SINGLE },
      { id: '2', userId: '2', items: [], total: 299.99, status: OrderStatus.PENDING, shippingAddress: emptyAddress, billingAddress: emptyAddress, createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), paymentType: PaymentType.INSTALLMENT },
      { id: '3', userId: '1', items: [], total: 49.99, status: OrderStatus.CONFIRMED, shippingAddress: emptyAddress, billingAddress: emptyAddress, createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), updatedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), paymentType: PaymentType.CASH_ON_DELIVERY },
      { id: '4', userId: '3', items: [], total: 1299.99, status: OrderStatus.CANCELLED, shippingAddress: emptyAddress, billingAddress: emptyAddress, createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000), updatedAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000), paymentType: PaymentType.BANK_TRANSFER },
      { id: '5', userId: '2', items: [], total: 89.99, status: OrderStatus.DELIVERED, shippingAddress: emptyAddress, billingAddress: emptyAddress, createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), updatedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), paymentType: PaymentType.SINGLE },
      { id: '6', userId: '1', items: [], total: 59.99, status: OrderStatus.PENDING, shippingAddress: emptyAddress, billingAddress: emptyAddress, createdAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000), updatedAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000), paymentType: PaymentType.INSTALLMENT },
      { id: '7', userId: '3', items: [], total: 79.99, status: OrderStatus.CONFIRMED, shippingAddress: emptyAddress, billingAddress: emptyAddress, createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), updatedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), paymentType: PaymentType.CASH_ON_DELIVERY },
      { id: '8', userId: '2', items: [], total: 109.99, status: OrderStatus.DELIVERED, shippingAddress: emptyAddress, billingAddress: emptyAddress, createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000), updatedAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000), paymentType: PaymentType.BANK_TRANSFER },
      { id: '9', userId: '1', items: [], total: 39.99, status: OrderStatus.PENDING, shippingAddress: emptyAddress, billingAddress: emptyAddress, createdAt: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000), updatedAt: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000), paymentType: PaymentType.SINGLE },
      { id: '10', userId: '3', items: [], total: 19.99, status: OrderStatus.CONFIRMED, shippingAddress: emptyAddress, billingAddress: emptyAddress, createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), updatedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), paymentType: PaymentType.INSTALLMENT }
    ];

    this.categories.next(sampleCategories);
    this.brands.next(sampleBrands);
    this.products.next(sampleProducts);
    this.blogPosts.next(sampleBlogPosts);

    // Örnek sepet ekle
    const exampleCart = {
      id: '1',
      userId: '1',
      items: [
        {
          id: '1',
          productId: '3',
          product: sampleProducts[2], // Designer T-Shirt
          quantity: 1,
          price: sampleProducts[2].price
        }
      ],
      total: sampleProducts[2].price,
      updatedAt: new Date()
    };
    this.cart.next(exampleCart);
  }

  // Products
  getProducts(): Observable<Product[]> {
    return this.products.asObservable();
  }

  getProduct(id: string): Observable<Product | undefined> {
    return of(this.products.value.find(p => p.id === id));
  }

  addProduct(product: Product): Observable<Product> {
    const products = this.products.value;
    products.push({ ...product, id: Date.now().toString() });
    this.products.next(products);
    return of(product);
  }

  updateProduct(product: Product): Observable<Product> {
    const products = this.products.value;
    const index = products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      products[index] = product;
      this.products.next(products);
    }
    return of(product);
  }

  deleteProduct(id: string): Observable<boolean> {
    const products = this.products.value.filter(p => p.id !== id);
    this.products.next(products);
    return of(true);
  }

  // Categories
  getCategories(): Observable<Category[]> {
    return this.categories.asObservable();
  }

  addCategory(category: Category): Observable<Category> {
    const categories = this.categories.value;
    categories.push({ ...category, id: Date.now().toString() });
    this.categories.next(categories);
    return of(category);
  }

  // Brands
  getBrands(): Observable<Brand[]> {
    return this.brands.asObservable();
  }

  addBrand(brand: Brand): Observable<Brand> {
    const brands = this.brands.value;
    brands.push({ ...brand, id: Date.now().toString() });
    this.brands.next(brands);
    return of(brand);
  }

  // Blog
  getBlogPosts(): Observable<BlogPost[]> {
    return this.blogPosts.asObservable();
  }

  getBlogPost(id: string): Observable<BlogPost | undefined> {
    return of(this.blogPosts.value.find(p => p.id === id));
  }

  addBlogPost(post: BlogPost): Observable<BlogPost> {
    const posts = this.blogPosts.value;
    posts.push({ ...post, id: Date.now().toString() });
    this.blogPosts.next(posts);
    return of(post);
  }

  // Cart
  getCart(): Observable<Cart | null> {
    return this.cart.asObservable();
  }

  addToCart(productId: string, quantity: number = 1): Observable<boolean> {
    const product = this.products.value.find(p => p.id === productId);
    if (!product) return of(false);

    let currentCart = this.cart.value;
    if (!currentCart) {
      currentCart = {
        id: '1',
        userId: '1',
        items: [],
        total: 0,
        updatedAt: new Date()
      };
    }

    const existingItem = currentCart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.items.push({
        id: Date.now().toString(),
        productId,
        product,
        quantity,
        price: product.price
      });
    }

    currentCart.total = currentCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    currentCart.updatedAt = new Date();

    this.cart.next(currentCart);
    return of(true);
  }

  removeFromCart(itemId: string): Observable<boolean> {
    const currentCart = this.cart.value;
    if (!currentCart) return of(false);

    currentCart.items = currentCart.items.filter(item => item.id !== itemId);
    currentCart.total = currentCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    currentCart.updatedAt = new Date();

    this.cart.next(currentCart);
    return of(true);
  }

  clearCart(): Observable<boolean> {
    this.cart.next(null);
    return of(true);
  }

  // Siparişler
  getOrders(): Observable<Order[]> {
    return this.orders.asObservable();
  }
}