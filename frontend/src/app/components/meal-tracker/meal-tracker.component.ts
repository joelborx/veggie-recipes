import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';

import { MealService, MealLog, MealStats } from '../../services/meal.service';
import { Recipe, RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-meal-tracker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="meal-tracker-container">
      <!-- Header -->
      <div class="tracker-header">
        <h2>🍽️ Mahlzeiten-Tracker</h2>
        <p>Behalte deine Ernährung im Blick</p>
      </div>
      
      <!-- Stats Cards -->
      <div class="stats-row" *ngIf="stats">
        <mat-card class="stat-card">
          <mat-card-content>
            <mat-icon>local_fire_department</mat-icon>
            <div class="stat-info">
              <span class="stat-value">{{ stats.totalCalories }}</span>
              <span class="stat-label">Kalorien</span>
            </div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="stat-card">
          <mat-card-content>
            <mat-icon>restaurant</mat-icon>
            <div class="stat-info">
              <span class="stat-value">{{ stats.totalMeals }}</span>
              <span class="stat-label">Mahlzeiten</span>
            </div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="stat-card">
          <mat-card-content>
            <mat-icon>fitness_center</mat-icon>
            <div class="stat-info">
              <span class="stat-value">{{ stats.totalProtein }}g</span>
              <span class="stat-label">Protein</span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
      
      <!-- Add Meal Form -->
      <mat-card class="add-meal-card">
        <mat-card-header>
          <mat-card-title>Mahlzeit hinzufügen</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <div class="form-row">
            <mat-form-field appearance="outline" class="recipe-field">
              <mat-label>Rezept</mat-label>
              <mat-select [(ngModel)]="newMeal.recipe_id">
                <mat-option *ngFor="let recipe of recipes" [value]="recipe.id">
                  {{ recipe.title }}
                </mat-option>
              </mat-select>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="meal-type-field">
              <mat-label>Mahlzeit</mat-label>
              <mat-select [(ngModel)]="newMeal.meal_type">
                <mat-option value="breakfast">Frühstück</mat-option>
                <mat-option value="lunch">Mittagessen</mat-option>
                <mat-option value="dinner">Abendessen</mat-option>
                <mat-option value="snack">Snack</mat-option>
              </mat-select>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="date-field">
              <mat-label>Datum</mat-label>
              <input matInput [matDatepicker]="picker" [(ngModel)]="newMeal.date">
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
          </div>
          
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Notizen (optional)</mat-label>
            <input matInput [(ngModel)]="newMeal.notes" placeholder="z.B. Besonders lecker!">
          </mat-form-field>
        </mat-card-content>
        
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="addMeal()" [disabled]="!newMeal.recipe_id">
            <mat-icon>add</mat-icon>
            Hinzufügen
          </button>
        </mat-card-actions>
      </mat-card>
      
      <!-- Meal History -->
      <mat-card class="history-card">
        <mat-card-header>
          <mat-card-title>Verlauf</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <!-- Loading -->
          <div class="loading-container" *ngIf="loading">
            <mat-spinner diameter="40"></mat-spinner>
          </div>
          
          <!-- Empty State -->
          <div class="empty-state" *ngIf="!loading && mealHistory.length === 0">
            <mat-icon>no_meals</mat-icon>
            <p>Noch keine Mahlzeiten eingetragen</p>
            <a mat-button color="primary" routerLink="/swipe">Rezepte entdecken</a>
          </div>
          
          <!-- Meal List -->
          <mat-list *ngIf="!loading && mealHistory.length > 0">
            <div *ngFor="let meal of mealHistory; let last = last">
              <mat-list-item class="meal-item">
                <div matListItemIcon class="meal-icon">
                  <mat-icon>{{ getMealIcon(meal.meal_type) }}</mat-icon>
                </div>
                
                <div matListItemTitle>{{ meal.recipe_title || 'Unbekanntes Rezept' }}</div>
                
                <div matListItemLine>
                  {{ formatDate(meal.date) }} · {{ getMealTypeLabel(meal.meal_type) }}
                  <span *ngIf="meal.calories"> · {{ meal.calories }} kcal</span>
                </div>
                
                <button mat-icon-button (click)="deleteMeal(meal.id)" class="delete-btn">
                  <mat-icon>delete</mat-icon>
                </button>
              </mat-list-item>
              
              <mat-divider *ngIf="!last"></mat-divider>
            </div>
          </mat-list>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .meal-tracker-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 16px;
    }
    
    .tracker-header {
      text-align: center;
      margin-bottom: 24px;
    }
    
    .tracker-header h2 {
      margin: 0 0 8px;
      color: #333;
    }
    
    .tracker-header p {
      color: #666;
      margin: 0;
    }
    
    .stats-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }
    
    .stat-card {
      border-radius: 12px;
    }
    
    .stat-card mat-card-content {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
    }
    
    .stat-card mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #4caf50;
    }
    
    .stat-info {
      display: flex;
      flex-direction: column;
    }
    
    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #333;
    }
    
    .stat-label {
      font-size: 0.8rem;
      color: #666;
    }
    
    .add-meal-card, .history-card {
      border-radius: 12px;
      margin-bottom: 24px;
    }
    
    .form-row {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
    
    .recipe-field {
      flex: 2;
      min-width: 200px;
    }
    
    .meal-type-field, .date-field {
      flex: 1;
      min-width: 150px;
    }
    
    .full-width {
      width: 100%;
      margin-top: 8px;
    }
    
    .loading-container {
      display: flex;
      justify-content: center;
      padding: 32px;
    }
    
    .empty-state {
      text-align: center;
      padding: 32px;
    }
    
    .empty-state mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #ccc;
      margin-bottom: 16px;
    }
    
    .empty-state p {
      color: #666;
      margin-bottom: 16px;
    }
    
    .meal-item {
      height: auto !important;
      padding: 12px 0;
    }
    
    .meal-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: #e8f5e9;
      border-radius: 50%;
    }
    
    .meal-icon mat-icon {
      color: #4caf50;
    }
    
    @media (max-width: 600px) {
      .stats-row {
        grid-template-columns: repeat(3, 1fr);
      }
      
      .stat-value {
        font-size: 1.25rem;
      }
      
      .form-row {
        flex-direction: column;
      }
      
      .recipe-field, .meal-type-field, .date-field {
        width: 100%;
      }
    }
  `]
})
export class MealTrackerComponent implements OnInit, OnDestroy {
  mealHistory: MealLog[] = [];
  recipes: Recipe[] = [];
  stats: MealStats | null = null;
  loading = true;
  
  newMeal = {
    recipe_id: null as number | null,
    meal_type: 'dinner' as 'breakfast' | 'lunch' | 'dinner' | 'snack',
    date: new Date(),
    notes: ''
  };
  
  private destroy$ = new Subject<void>();

  constructor(
    private mealService: MealService,
    private recipeService: RecipeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadMealHistory();
    this.loadStats();
    this.loadRecipes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadMealHistory(): void {
    this.loading = true;
    this.mealService.getMealHistory()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (meals) => {
          this.mealHistory = meals.sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  loadStats(): void {
    this.mealService.getMealStats('week')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => {
          this.stats = stats;
        }
      });
  }

  loadRecipes(): void {
    this.recipeService.getRecipes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (recipes) => {
          this.recipes = recipes;
        }
      });
  }

  addMeal(): void {
    if (!this.newMeal.recipe_id) return;
    
    const mealRequest = {
      recipe_id: this.newMeal.recipe_id,
      meal_type: this.newMeal.meal_type,
      date: this.newMeal.date.toISOString().split('T')[0],
      notes: this.newMeal.notes
    };
    
    this.mealService.logMeal(mealRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.snackBar.open('Mahlzeit eingetragen!', '', { duration: 2000 });
          this.resetForm();
          this.loadMealHistory();
          this.loadStats();
        },
        error: () => {
          this.snackBar.open('Fehler beim Eintragen', 'OK', { duration: 3000 });
        }
      });
  }

  deleteMeal(id: number): void {
    this.mealService.deleteMeal(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.snackBar.open('Mahlzeit gelöscht', '', { duration: 2000 });
          this.loadMealHistory();
          this.loadStats();
        },
        error: () => {
          this.snackBar.open('Fehler beim Löschen', 'OK', { duration: 3000 });
        }
      });
  }

  resetForm(): void {
    this.newMeal = {
      recipe_id: null,
      meal_type: 'dinner',
      date: new Date(),
      notes: ''
    };
  }

  getMealIcon(type: string): string {
    const icons: { [key: string]: string } = {
      breakfast: 'wb_sunny',
      lunch: 'wb_cloudy',
      dinner: 'nights_stay',
      snack: 'cookie'
    };
    return icons[type] || 'restaurant';
  }

  getMealTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      breakfast: 'Frühstück',
      lunch: 'Mittagessen',
      dinner: 'Abendessen',
      snack: 'Snack'
    };
    return labels[type] || type;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
