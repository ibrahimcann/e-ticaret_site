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
      'admin.panel': 'Admin Panel',
      'admin.dashboard': 'Dashboard',
      'admin.products': 'Products',
      'admin.categories': 'Categories',
      'admin.brands': 'Brands',
      'admin.users': 'Users',
      'admin.orders': 'Orders',
      'admin.blog': 'Blog',
      'admin.pages': 'Pages',
      'admin.favorites': 'Favorites',
      'admin.notifications': 'Notifications',
      'admin.stock': 'Stock Status',
      'admin.returns': 'Returns / Exchanges',
      'admin.campaigns': 'Campaigns / Coupons',
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
      'common.active': 'Active',
      'common.inactive': 'Inactive',
      // Products
      'product.addToCart': 'Add to Cart',
      'product.viewDetails': 'View Details',
      'product.outOfStock': 'Out of Stock',
      'product.inStock': 'In Stock',
      'product.addProduct': 'Add Product',
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
      'order.status.cancelled': 'Cancelled',
      // Pages
      'page.title': 'Title',
      'page.slug': 'Slug',
      'page.content': 'Content',
      'page.metaTitle': 'Meta Title',
      'page.metaDescription': 'Meta Description',
      // Users
      'user.role': 'Role',
      'user.joined': 'Joined',
      'user.deactivate': 'Deactivate',
      // Orders Table
      'order.id': 'Order ID',
      'order.customer': 'Customer',
      'order.date': 'Date',
      // Dashboard
      'dashboard.recentActivity': 'Recent Activity',
      'dashboard.newProduct': 'New product added',
      'dashboard.orderCompleted': 'Order completed',
      'dashboard.newUser': 'New user registered',
      'dashboard.blogPosts': 'Blog Posts',
      'dashboard.last10DaysOrders': 'Last 10 Days Orders Chart',
      'dashboard.ordersByPaymentType': 'Orders by Payment Type',
      // Footer
      'footer.ecommerce': 'E-Commerce',
      'footer.trusted': 'Your trusted online shopping destination',
      'footer.quickLinks': 'Quick Links',
      'footer.contact': 'Contact',
      'footer.allRights': 'All rights reserved.',
      // Menu
      'menu.discount': 'Discount',
      'menu.new': 'New',
      'menu.linenBlend': 'Linen Blend',
      'menu.clothing': 'Clothing',
      'menu.teen': 'Teen',
      'menu.casualSport': 'Casual Sport',
      'menu.shoes': 'Shoes',
      'menu.accessory': 'Accessory',
      'menu.bag': 'Bag',
      // Contact
      'contact.sendMessage': 'Send Message',
      'contact.info': 'Contact Information',
      'contact.address': 'Address',
      'contact.phone': 'Phone',
      'contact.email': 'Email',
      'contact.businessHours': 'Business Hours',
      // Site
      'site.view': 'View Site',
      // Payment Types
      'payment.single': 'Single Payment',
      'payment.installment': 'Installment Credit Card',
      'payment.cod': 'Cash on Delivery',
      'payment.transfer': 'Bank Transfer/EFT',
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
      'admin.panel': 'Admin Panel',
      'admin.dashboard': 'Kontrol Paneli',
      'admin.products': 'Ürünler',
      'admin.categories': 'Kategoriler',
      'admin.brands': 'Markalar',
      'admin.users': 'Kullanıcılar',
      'admin.orders': 'Siparişler',
      'admin.blog': 'Blog',
      'admin.pages': 'Sayfalar',
      'admin.favorites': 'Favori Ürünler',
      'admin.notifications': 'Bildirimler',
      'admin.stock': 'Stok Durumu',
      'admin.returns': 'İade / Değişim',
      'admin.campaigns': 'Kampanyalar / Kuponlar',
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
      'common.active': 'Aktif',
      'common.inactive': 'Pasif',
      // Products
      'product.addToCart': 'Sepete Ekle',
      'product.viewDetails': 'Detayları Görüntüle',
      'product.outOfStock': 'Stokta Yok',
      'product.inStock': 'Stokta Var',
      'product.addProduct': 'Ürün Ekle',
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
      'order.status.cancelled': 'İptal Edildi',
      // Pages
      'page.title': 'Başlık',
      'page.slug': 'Bağlantı',
      'page.content': 'İçerik',
      'page.metaTitle': 'Meta Başlık',
      'page.metaDescription': 'Meta Açıklama',
      // Users
      'user.role': 'Rol',
      'user.joined': 'Katıldı',
      'user.deactivate': 'Devre Dışı Bırak',
      // Orders Table
      'order.id': 'Sipariş No',
      'order.customer': 'Müşteri',
      'order.date': 'Tarih',
      // Dashboard
      'dashboard.recentActivity': 'Güncel Aktivite',
      'dashboard.newProduct': 'Yeni ürün eklendi',
      'dashboard.orderCompleted': 'Sipariş tamamlandı',
      'dashboard.newUser': 'Yeni kullanıcı kaydoldu',
      'dashboard.blogPosts': 'Blog Gönderileri',
      'dashboard.last10DaysOrders': 'Son 10 Gün Sipariş Grafiği',
      'dashboard.ordersByPaymentType': 'Ödeme Tipine Göre Siparişler',
      // Footer
      'footer.ecommerce': 'E-Ticaret',
      'footer.trusted': 'Güvenilir alışveriş adresiniz',
      'footer.quickLinks': 'Hızlı Linkler',
      'footer.contact': 'İletişim',
      'footer.allRights': 'Tüm hakları saklıdır.',
      // Menu
      'menu.discount': 'İndirim',
      'menu.new': 'Yeni',
      'menu.linenBlend': 'Keten Karışımlı',
      'menu.clothing': 'Giyim',
      'menu.teen': 'Genç',
      'menu.casualSport': 'Casual Spor',
      'menu.shoes': 'Ayakkabı',
      'menu.accessory': 'Aksesuar',
      'menu.bag': 'Çanta',
      // Contact
      'contact.sendMessage': 'Mesaj Gönder',
      'contact.info': 'İletişim Bilgileri',
      'contact.address': 'Adres',
      'contact.phone': 'Telefon',
      'contact.email': 'E-posta',
      'contact.businessHours': 'Çalışma Saatleri',
      // Site
      'site.view': 'Siteyi Görüntüle',
      // Payment Types
      'payment.single': 'Tek Çekim',
      'payment.installment': 'Taksitli Kredi Kartı',
      'payment.cod': 'Kapıda Ödeme',
      'payment.transfer': 'Havale/EFT',
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