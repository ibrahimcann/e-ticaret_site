import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private currentLang = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLang.asObservable();

  private translations: { [key: string]: { [key: string]: string } } = {
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.products': 'Products',
      'nav.blog': 'Blog',
      'nav.contact': 'Contact',
      'nav.login': 'Login',
      'nav.register': 'Register',
      'nav.profile': 'Profile',
      'nav.cart': 'Cart',
      'nav.logout': 'Logout',
      
      // Admin
      'admin.dashboard': 'Dashboard',
      'admin.products': 'Products',
      'admin.categories': 'Categories',
      'admin.brands': 'Brands',
      'admin.users': 'Users',
      'admin.orders': 'Orders',
      'admin.blog': 'Blog',
      'admin.pages': 'Pages',
      
      // Common
      'common.add': 'Add',
      'common.edit': 'Edit',
      'common.delete': 'Delete',
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.search': 'Search',
      'common.filter': 'Filter',
      'common.loading': 'Loading...',
      'common.name': 'Name',
      'common.description': 'Description',
      'common.price': 'Price',
      'common.status': 'Status',
      'common.actions': 'Actions',
      
      // Products
      'product.addToCart': 'Add to Cart',
      'product.viewDetails': 'View Details',
      'product.outOfStock': 'Out of Stock',
      'product.inStock': 'In Stock',
      
      // Cart
      'cart.empty': 'Your cart is empty',
      'cart.total': 'Total',
      'cart.checkout': 'Checkout',
      'cart.remove': 'Remove',
      'cart.quantity': 'Quantity',
      
      // Orders
      'order.status.pending': 'Pending',
      'order.status.confirmed': 'Confirmed',
      'order.status.shipped': 'Shipped',
      'order.status.delivered': 'Delivered',
      'order.status.cancelled': 'Cancelled'
    },
    tr: {
      // Navigation
      'nav.home': 'Ana Sayfa',
      'nav.products': 'Ürünler',
      'nav.blog': 'Blog',
      'nav.contact': 'İletişim',
      'nav.login': 'Giriş',
      'nav.register': 'Kayıt',
      'nav.profile': 'Profil',
      'nav.cart': 'Sepet',
      'nav.logout': 'Çıkış',
      
      // Admin
      'admin.dashboard': 'Kontrol Paneli',
      'admin.products': 'Ürünler',
      'admin.categories': 'Kategoriler',
      'admin.brands': 'Markalar',
      'admin.users': 'Kullanıcılar',
      'admin.orders': 'Siparişler',
      'admin.blog': 'Blog',
      'admin.pages': 'Sayfalar',
      
      // Common
      'common.add': 'Ekle',
      'common.edit': 'Düzenle',
      'common.delete': 'Sil',
      'common.save': 'Kaydet',
      'common.cancel': 'İptal',
      'common.search': 'Ara',
      'common.filter': 'Filtrele',
      'common.loading': 'Yükleniyor...',
      'common.name': 'İsim',
      'common.description': 'Açıklama',
      'common.price': 'Fiyat',
      'common.status': 'Durum',
      'common.actions': 'İşlemler',
      
      // Products
      'product.addToCart': 'Sepete Ekle',
      'product.viewDetails': 'Detayları Görüntüle',
      'product.outOfStock': 'Stokta Yok',
      'product.inStock': 'Stokta Var',
      
      // Cart
      'cart.empty': 'Sepetiniz boş',
      'cart.total': 'Toplam',
      'cart.checkout': 'Satın Al',
      'cart.remove': 'Kaldır',
      'cart.quantity': 'Miktar',
      
      // Orders
      'order.status.pending': 'Beklemede',
      'order.status.confirmed': 'Onaylandı',
      'order.status.shipped': 'Kargoya Verildi',
      'order.status.delivered': 'Teslim Edildi',
      'order.status.cancelled': 'İptal Edildi'
    }
  };

  languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
  ];

  constructor() {
    const savedLang = localStorage.getItem('language') || 'en';
    this.setLanguage(savedLang);
  }

  setLanguage(langCode: string) {
    this.currentLang.next(langCode);
    localStorage.setItem('language', langCode);
  }

  getCurrentLanguage(): string {
    return this.currentLang.value;
  }

  translate(key: string): string {
    const lang = this.getCurrentLanguage();
    return this.translations[lang]?.[key] || key;
  }

  t(key: string): string {
    return this.translate(key);
  }
}