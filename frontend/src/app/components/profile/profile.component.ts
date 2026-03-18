import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="profile-container">
      <!-- Profile Header -->
      <div class="profile-header">
        <div class="avatar">
          <mat-icon>account_circle</mat-icon>
        </div>
        <div class="profile-info">
          <h2>{{ user?.username }}</h2>
          <p>{{ user?.email }}</p>
        </div>
      </div>
      
      <!-- Profile Form -->
      <mat-card class="profile-card">
        <mat-card-header>
          <mat-card-title>Profil bearbeiten</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="profileForm">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Benutzername</mat-label>
              <input matInput formControlName="username">
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>E-Mail</mat-label>
              <input matInput formControlName="email" type="email">
            </mat-form-field>
          </form>
          
          <!-- Dietary Preferences -->
          <div class="preferences-section">
            <h3>Ernährungsvorlieben</h3>
            
            <mat-form-field class="full-width">
              <mat-label>Neue Vorliebe hinzufügen</mat-label>
              <input matInput [(ngModel)]="newPreference" (keyup.enter)="addPreference()"
                     placeholder="z.B. Vegan, Glutenfrei...">
              <button mat-icon-button matSuffix (click)="addPreference()">
                <mat-icon>add</mat-icon>
              </button>
            </mat-form-field>
            
            <div class="chips-list">
              <mat-chip 
                *ngFor="let pref of dietaryPreferences; let i = index"
                [removable]="true"
                (removed)="removePreference(i)"
              >
                {{ pref }}
                <mat-icon matChipRemove>cancel</mat-icon>
              </mat-chip>
            </div>
          </div>
          
          <!-- Allergies -->
          <div class="preferences-section">
            <h3>Allergien</h3>
            
            <mat-form-field class="full-width">
              <mat-label>Allergie hinzufügen</mat-label>
              <input matInput [(ngModel)]="newAllergy" (keyup.enter)="addAllergy()"
                     placeholder="z.B. Nüsse, Laktose...">
              <button mat-icon-button matSuffix (click)="addAllergy()">
                <mat-icon>add</mat-icon>
              </button>
            </mat-form-field>
            
            <div class="chips-list">
              <mat-chip 
                *ngFor="let allergy of allergies; let i = index"
                [removable]="true"
                (removed)="removeAllergy(i)"
                color="warn"
              >
                {{ allergy }}
                <mat-icon matChipRemove>cancel</mat-icon>
              </mat-chip>
            </div>
          </div>
        </mat-card-content>
        
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="saveProfile()">
            <mat-icon>save</mat-icon>
            Speichern
          </button>
        </mat-card-actions>
      </mat-card>
      
      <!-- Stats Card -->
      <mat-card class="stats-card">
        <mat-card-header>
          <mat-card-title>Statistiken</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <div class="stats-grid">
            <div class="stat-item">
              <mat-icon>favorite</mat-icon>
              <span class="stat-value">{{ stats.likedRecipes }}</span>
              <span class="stat-label">Gelikte Rezepte</span>
            </div>
            
            <div class="stat-item">
              <mat-icon>restaurant</mat-icon>
              <span class="stat-value">{{ stats.loggedMeals }}</span>
              <span class="stat-label">Eingetragen</span>
            </div>
            
            <div class="stat-item">
              <mat-icon>local_fire_department</mat-icon>
              <span class="stat-value">{{ stats.totalCalories }}</span>
              <span class="stat-label">Kalorien</span>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 16px;
    }
    
    .profile-header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 24px;
      padding: 24px;
      background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
      border-radius: 16px;
      color: white;
    }
    
    .avatar {
      width: 80px;
      height: 80px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .avatar mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
    }
    
    .profile-info h2 {
      margin: 0 0 4px;
      font-size: 1.5rem;
    }
    
    .profile-info p {
      margin: 0;
      opacity: 0.9;
    }
    
    .profile-card, .stats-card {
      margin-bottom: 24px;
      border-radius: 12px;
    }
    
    .full-width {
      width: 100%;
    }
    
    .preferences-section {
      margin-top: 24px;
    }
    
    .preferences-section h3 {
      margin: 0 0 12px;
      color: #333;
      font-size: 1rem;
    }
    
    .chips-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    
    .stat-item mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #4caf50;
      margin-bottom: 8px;
    }
    
    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #333;
    }
    
    .stat-label {
      font-size: 0.8rem;
      color: #666;
      margin-top: 4px;
    }
    
    @media (max-width: 480px) {
      .profile-header {
        flex-direction: column;
        text-align: center;
      }
      
      .stats-grid {
        grid-template-columns: repeat(3, 1fr);
      }
      
      .stat-value {
        font-size: 1.25rem;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  profileForm: FormGroup;
  
  dietaryPreferences: string[] = [];
  allergies: string[] = [];
  newPreference = '';
  newAllergy = '';
  
  stats = {
    likedRecipes: 0,
    loggedMeals: 0,
    totalCalories: 0
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      username: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.profileForm.patchValue({
        username: this.user.username,
        email: this.user.email
      });
      this.dietaryPreferences = this.user.dietary_preferences || [];
      this.allergies = this.user.allergies || [];
    }
    
    // Load stats (mock data for now)
    this.loadStats();
  }

  loadStats(): void {
    // In a real app, these would come from the backend
    this.stats = {
      likedRecipes: 12,
      loggedMeals: 28,
      totalCalories: 45200
    };
  }

  addPreference(): void {
    if (this.newPreference.trim()) {
      this.dietaryPreferences.push(this.newPreference.trim());
      this.newPreference = '';
    }
  }

  removePreference(index: number): void {
    this.dietaryPreferences.splice(index, 1);
  }

  addAllergy(): void {
    if (this.newAllergy.trim()) {
      this.allergies.push(this.newAllergy.trim());
      this.newAllergy = '';
    }
  }

  removeAllergy(index: number): void {
    this.allergies.splice(index, 1);
  }

  saveProfile(): void {
    const updates = {
      ...this.profileForm.value,
      dietary_preferences: this.dietaryPreferences,
      allergies: this.allergies
    };
    
    this.authService.updateProfile(updates).subscribe({
      next: () => {
        this.snackBar.open('Profil gespeichert!', '', { duration: 2000 });
      },
      error: () => {
        this.snackBar.open('Fehler beim Speichern', 'OK', { duration: 3000 });
      }
    });
  }
}
