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
  selector: 'app-register',
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
          <mat-card-title>Konto erstellen 🌱</mat-card-title>
          <mat-card-subtitle>Werde Teil der VeggieSwipe-Community</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Benutzername</mat-label>
              <input matInput formControlName="username" placeholder="Wähle einen Benutzernamen">
              <mat-icon matPrefix>person</mat-icon>
              <mat-error *ngIf="registerForm.get('username')?.hasError('required')">
                Benutzername ist erforderlich
              </mat-error>
              <mat-error *ngIf="registerForm.get('username')?.hasError('minlength')">
                Mindestens 3 Zeichen
              </mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>E-Mail</mat-label>
              <input matInput formControlName="email" type="email" placeholder="deine@email.de">
              <mat-icon matPrefix>email</mat-icon>
              <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
                E-Mail ist erforderlich
              </mat-error>
              <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
                Ungültige E-Mail-Adresse
              </mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Passwort</mat-label>
              <input 
                matInput 
                [type]="hidePassword ? 'password' : 'text'" 
                formControlName="password"
                placeholder="Wähle ein sicheres Passwort"
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
              <mat-error *ngIf="registerForm.get('password')?.hasError('required')">
                Passwort ist erforderlich
              </mat-error>
              <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">
                Mindestens 6 Zeichen
              </mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Passwort bestätigen</mat-label>
              <input 
                matInput 
                [type]="hideConfirmPassword ? 'password' : 'text'" 
                formControlName="confirmPassword"
                placeholder="Passwort wiederholen"
              >
              <mat-icon matPrefix>lock_outline</mat-icon>
              <button 
                mat-icon-button 
                matSuffix 
                type="button"
                (click)="hideConfirmPassword = !hideConfirmPassword"
              >
                <mat-icon>{{ hideConfirmPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              <mat-error *ngIf="registerForm.get('confirmPassword')?.hasError('required')">
                Bitte bestätige dein Passwort
              </mat-error>
              <mat-error *ngIf="registerForm.hasError('passwordMismatch')">
                Passwörter stimmen nicht überein
              </mat-error>
            </mat-form-field>
            
            <button 
              mat-raised-button 
              color="primary" 
              class="full-width submit-btn"
              type="submit"
              [disabled]="registerForm.invalid || loading"
            >
              <mat-spinner diameter="20" *ngIf="loading"></mat-spinner>
              <span *ngIf="!loading">Konto erstellen</span>
            </button>
          </form>
        </mat-card-content>
        
        <mat-card-actions class="auth-actions">
          <p>Bereits ein Konto? <a routerLink="/login">Hier anmelden</a></p>
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
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.loading = true;
    const { username, email, password } = this.registerForm.value;
    
    this.authService.register({ username, email, password }).subscribe({
      next: () => {
        this.snackBar.open('Konto erstellt! Willkommen! 🎉', '', { duration: 3000 });
        this.router.navigate(['/swipe']);
      },
      error: (error) => {
        this.loading = false;
        const message = error.error?.message || 'Registrierung fehlgeschlagen';
        this.snackBar.open(message, 'OK', { duration: 3000 });
      }
    });
  }
}
