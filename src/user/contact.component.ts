import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalizationService } from '../shared/services/localization.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="contact-page">
      <div class="container">
        <div class="page-header">
          <h1>{{ localizationService.t('nav.contact') }}</h1>
          <p>Get in touch with us - we'd love to hear from you!</p>
        </div>
        
        <div class="contact-content">
          <div class="contact-form">
            <div class="card">
              <h2>Send us a message</h2>
              <form (ngSubmit)="submitForm()" #contactForm="ngForm">
                <div class="form-group">
                  <label class="form-label">{{ localizationService.t('common.name') }}</label>
                  <input type="text" class="form-input" [(ngModel)]="formData.name" name="name" required>
                </div>
                
                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-input" [(ngModel)]="formData.email" name="email" required>
                </div>
                
                <div class="form-group">
                  <label class="form-label">Subject</label>
                  <input type="text" class="form-input" [(ngModel)]="formData.subject" name="subject" required>
                </div>
                
                <div class="form-group">
                  <label class="form-label">Message</label>
                  <textarea class="form-input" [(ngModel)]="formData.message" name="message" rows="6" required></textarea>
                </div>
                
                <button type="submit" class="btn btn-primary" [disabled]="!contactForm.valid">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          
          <div class="contact-info">
            <div class="card">
              <h2>Contact Information</h2>
              
              <div class="contact-item">
                <div class="contact-icon">📍</div>
                <div>
                  <h4>Address</h4>
                  <p>123 Business Street<br>City, State 12345</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">✉️</div>
                <div>
                  <h4>Email</h4>
                  <p>info&#64;ecommerce.com</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">🕒</div>
                <div>
                  <h4>Business Hours</h4>
                  <p>Monday - Friday: 9:00 AM - 5:00 PM<br>Saturday: 10:00 AM - 2:00 PM<br>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-page {
      padding: 2rem 0;
    }
    
    .page-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .page-header h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: #1f2937;
    }
    
    .page-header p {
      font-size: 1.25rem;
      color: #6b7280;
    }
    
    .contact-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
    }
    
    .contact-form h2,
    .contact-info h2 {
      margin-bottom: 1.5rem;
      color: #1f2937;
    }
    
    .contact-form .btn {
      width: 100%;
      padding: 1rem;
      font-size: 1.125rem;
      margin-top: 1rem;
    }
    
    .contact-item {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .contact-icon {
      font-size: 1.5rem;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f3f4f6;
      border-radius: 50%;
      flex-shrink: 0;
    }
    
    .contact-item h4 {
      margin-bottom: 0.5rem;
      color: #1f2937;
    }
    
    .contact-item p {
      color: #6b7280;
      margin: 0;
    }
    
    @media (max-width: 768px) {
      .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .page-header h1 {
        font-size: 2rem;
      }
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(public localizationService: LocalizationService) {}

  submitForm() {
    // In a real app, you would send this data to your backend
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}