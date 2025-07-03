import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationService } from '../shared/services/localization.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="users-admin">
      <div class="page-header">
        <h1>{{ localizationService.t('admin.users') }}</h1>
      </div>

      <div class="card">
        <table class="table">
          <thead>
            <tr>
              <th>{{ localizationService.t('common.name') }}</th>
              <th>Email</th>
              <th>Role</th>
              <th>{{ localizationService.t('common.status') }}</th>
              <th>Joined</th>
              <th>{{ localizationService.t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of sampleUsers">
              <td>{{ user.firstName }} {{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span class="role-badge" [class.admin]="user.role === 'admin'">
                  {{ user.role }}
                </span>
              </td>
              <td>
                <span class="status-badge" [class.active]="user.isActive">
                  {{ user.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td>{{ user.createdAt | date:'shortDate' }}</td>
              <td>
                <button class="btn btn-secondary" style="margin-right: 0.5rem;">
                  {{ localizationService.t('common.edit') }}
                </button>
                <button class="btn btn-danger">
                  Deactivate
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      margin-bottom: 2rem;
    }
    
    .role-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      background-color: #ddd6fe;
      color: #7c3aed;
      text-transform: capitalize;
    }
    
    .role-badge.admin {
      background-color: #fef3c7;
      color: #d97706;
    }
    
    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      background-color: #fca5a5;
      color: #dc2626;
    }
    
    .status-badge.active {
      background-color: #86efac;
      color: #16a34a;
    }
  `]
})
export class AdminUsersComponent {
  sampleUsers = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: 'admin',
      isActive: true,
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      role: 'user',
      isActive: true,
      createdAt: new Date('2024-02-20')
    },
    {
      id: '3',
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob@example.com',
      role: 'user',
      isActive: false,
      createdAt: new Date('2024-03-10')
    }
  ];

  constructor(public localizationService: LocalizationService) {}
}