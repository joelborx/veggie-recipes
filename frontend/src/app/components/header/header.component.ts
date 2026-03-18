import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <mat-toolbar class="header-toolbar" *ngIf="isAuthenticated()">
      <div class="header-left">
        <span class="logo" routerLink="/swipe">🥗 VeggieSwipe</span>
      </div>
      
      <div class="header-nav">
        <button mat-button routerLink="/swipe" routerLinkActive="active">
          <mat-icon>swipe</mat-icon>
          Swipe
        </button>
        <button mat-button routerLink="/recipes" routerLinkActive="active">
          <mat-icon>restaurant_menu</mat-icon>
          Rezepte
        </button>
        <button mat-button routerLink="/meals" routerLinkActive="active">
          <mat-icon>fastfood</mat-icon>
          Tracker
        </button>
      </div>
      
      <div class="header-right">
        <button mat-icon-button [matMenuTriggerFor]="userMenu">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #userMenu="matMenu">
          <button mat-menu-item routerLink="/profile">
            <mat-icon>person</mat-icon>
            <span>Profil</span>
          </button>
          <button mat-menu-item (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>
            <span>Abmelden</span>
          </button>
        </mat-menu>
      </div>
    </mat-toolbar>
    
    <!-- Simple header for non-authenticated users -->
    <mat-toolbar class="header-toolbar" *ngIf="!isAuthenticated()">
      <span class="logo">🥗 VeggieSwipe</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/login">Anmelden</button>
      <button mat-raised-button color="primary" routerLink="/register">Registrieren</button>
    </mat-toolbar>
  `,
  styles: [`
    .header-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
      color: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .header-nav {
      display: flex;
      gap: 8px;
    }
    
    .header-nav button {
      color: white;
      opacity: 0.9;
    }
    
    .header-nav button.active {
      opacity: 1;
      background: rgba(255,255,255,0.2);
    }
    
    .spacer {
      flex: 1;
    }
    
    @media (max-width: 600px) {
      .header-nav span {
        display: none;
      }
      .header-nav button {
        min-width: 48px;
        padding: 0 8px;
      }
    }
  `]
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }
}
