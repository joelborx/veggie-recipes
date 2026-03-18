import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="auth-container">
      <mat-card class="auth-card">
        <mat-card-header>
          <mat-card-title>Willkommen zurück! 🥗</mat-card-title>
          <mat-card-subtitle>Melde dich an, um fortzufahren</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Benutzername</mat-label>
              <input matInput formControlName="username" placeholder="Dein Benutzername">
              <mat-icon matPrefix>person</mat-icon>
              <mat-error *ngIf="loginForm.get('username')?.hasError('required')">
                Benutzername ist erforderlich
              </mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Passwort</mat-label>
              <input 
                matInput 
                [type]="hidePassword ? 'password' : 'text'" 
                formControlName="password"
                placeholder="Dein Passwort"
              >
              <mat-icon matPrefix>lock</mat-icon>
              <button 
                mat-icon-button 
                matSuffix 
                type="button"
                (click)="hidePassword = !hidePassword"
              >
                <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Passwort ist erforderlich
              </mat-error>
            </mat-form-field>
            
            <button 
              mat-raised-button 
              color="primary" 
              class="full-width submit-btn"
              type="submit"
              [disabled]="loginForm.invalid || loading"
            >
              <mat-spinner diameter="20" *ngIf="loading"></mat-spinner>
              <span *ngIf="!loading">Anmelden</span>
            </button>
          </form>
        </mat-card-content>
        
        <mat-card-actions class="auth-actions">
          <p>Noch kein Konto? <a routerLink="/register">Jetzt registrieren</a></p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: calc(100vh - 200px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
    }
    
    .auth-card {
      width: 100%;
      max-width: 400px;
      border-radius: 16px;
    }
    
    mat-card-header {
      text-align: center;
      display: block;
      margin-bottom: 24px;
    }
    
    mat-card-title {
      font-size: 1.75rem;
      margin-bottom: 8px;
    }
    
    mat-card-subtitle {
      color: #666;
    }
    
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    
    .submit-btn {
      height: 48px;
      font-size: 1rem;
      margin-top: 8px;
    }
    
    .auth-actions {
      text-align: center;
      padding-top: 0;
    }
    
    .auth-actions a {
      color: #4caf50;
      text-decoration: none;
      font-weight: 500;
    }
    
    .auth-actions a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.snackBar.open('Willkommen zurück!', '', { duration: 2000 });
        this.router.navigate(['/swipe']);
      },
      error: (error) => {
        this.loading = false;
        const message = error.error?.message || 'Anmeldung fehlgeschlagen';
        this.snackBar.open(message, 'OK', { duration: 3000 });
      }
    });
  }
}
