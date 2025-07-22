
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    <div *ngIf="show" class="modal-overlay">
      <div class="modal-content">
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
        <button (click)="onClose.emit()">Close</button>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 5px;
    }
  `]
})
export class ModalComponent {
  @Input() show = false;
  @Input() title = '';
  @Input() message = '';
  @Output() onClose = new EventEmitter<void>();
}
