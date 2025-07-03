import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationService, Language } from '../services/localization.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="language-selector">
      <select 
        [value]="localizationService.getCurrentLanguage()" 
        (change)="onLanguageChange($event)"
        class="form-input">
        <option *ngFor="let lang of localizationService.languages" [value]="lang.code">
          {{ lang.flag }} {{ lang.name }}
        </option>
      </select>
    </div>
  `,
  styles: [`
    .language-selector select {
      min-width: 120px;
      padding: 0.5rem;
    }
  `]
})
export class LanguageSelectorComponent {
  constructor(public localizationService: LocalizationService) {}

  onLanguageChange(event: any) {
    this.localizationService.setLanguage(event.target.value);
  }
}