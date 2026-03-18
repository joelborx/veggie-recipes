import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Recipe, RecipeService } from '../../services/recipe.service';
import { MealService } from '../../services/meal.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  template: `
    <div class="recipe-detail-container" *ngIf="!loading && recipe">
      <!-- Back Button -->
      <button mat-button (click)="goBack()" class="back-button">
        <mat-icon>arrow_back</mat-icon>
        Zurück
      </button>
      
      <!-- Hero Image -->
      <div class="hero-image-container">
        <img 
          [src]="recipe.image_url || 'assets/placeholder-recipe.jpg'" 
          [alt]="recipe.title"
          class="hero-image"
        />
        <div class="hero-overlay">
          <div class="difficulty-badge" [class]="'difficulty-' + recipe.difficulty">
            {{ recipe.difficulty | titlecase }}
          </div>
        </div>
      </div>
      
      <!-- Title Section -->
      <div class="title-section">
        <h1>{{ recipe.title }}</h1>
        <p class="description">{{ recipe.description }}</p>
        
        <div class="meta-info">
          <div class="meta-item">
            <mat-icon>schedule</mat-icon>
            <span>{{ recipe.prep_time + recipe.cook_time }} Min</span>
          </div>
          <div class="meta-item">
            <mat-icon>restaurant</mat-icon>
            <span>{{ recipe.servings }} Portionen</span>
          </div>
        </div>
        
        <!-- Tags -->
        <div class="tags-container">
          <mat-chip *ngFor="let tag of recipe.tags">
            {{ tag }}
          </mat-chip>
        </div>
      </div>
      
      <!-- Nutrition Info -->
      <div class="nutrition-section" *ngIf="recipe.calories">
        <h3>Nährwerte (pro Portion)</h3>
        <div class="nutrition-grid">
          <div class="nutrition-card">
            <span class="nutrition-value">{{ recipe.calories }}</span>
            <span class="nutrition-label">Kalorien</span>
          </div>
          <div class="nutrition-card" *ngIf="recipe.protein">
            <span class="nutrition-value">{{ recipe.protein }}g</span>
            <span class="nutrition-label">Protein</span>
          </div>
          <div class="nutrition-card" *ngIf="recipe.carbs">
            <span class="nutrition-value">{{ recipe.carbs }}g</span>
            <span class="nutrition-label">Kohlenhydrate</span>
          </div>
          <div class="nutrition-card" *ngIf="recipe.fat">
            <span class="nutrition-value">{{ recipe.fat }}g</span>
            <span class="nutrition-label">Fett</span>
          </div>
        </div>
      </div>
      
      <!-- Ingredients -->
      <div class="ingredients-section">
        <h3>Zutaten</h3>
        
        <div class="servings-adjust">
          <button mat-icon-button (click)="adjustServings(-1)" [disabled]="servings <= 1">
            <mat-icon>remove</mat-icon>
          </button>
          <span>{{ servings }} Portionen</span>
          <button mat-icon-button (click)="adjustServings(1)">
            <mat-icon>add</mat-icon>
          </button>
        </div>
        
        <mat-list>
          <mat-list-item *ngFor="let ingredient of recipe.ingredients">
            <span class="ingredient-amount">{{ formatAmount(ingredient.amount) }} {{ ingredient.unit }}</span>
            <span class="ingredient-name">{{ ingredient.name }}</span>
          </mat-list-item>
        </mat-list>
      </div>
      
      <!-- Instructions -->
      <div class="instructions-section">
        <h3>Zubereitung</h3>
        
        <ol class="instructions-list">
          <li *ngFor="let step of recipe.instructions; let i = index">
            <span class="step-number">{{ i + 1 }}</span>
            <p>{{ step }}</p>
          </li>
        </ol>
      </div>
      
      <!-- Action Buttons -->
      <div class="action-buttons">
        <button mat-raised-button color="primary" (click)="logMeal()">
          <mat-icon>add</mat-icon>
          Als gegessen markieren
        </button>
        
        <button mat-stroked-button color="accent" (click)="addToFavorites()">
          <mat-icon>favorite</mat-icon>
          Zu Favoriten
        </button>
      </div>
    </div>
    
    <!-- Loading -->
    <div class="loading-container" *ngIf="loading">
      <mat-spinner diameter="60"></mat-spinner>
    </div>
    
    <!-- Error State -->
    <div class="error-state" *ngIf="!loading && !recipe">
      <mat-icon class="error-icon">error_outline</mat-icon>
      <h3>Rezept nicht gefunden</h3>
      <button mat-raised-button color="primary" routerLink="/recipes">
        Zurück zur Übersicht
      </button>
    </div>
  `,
  styles: [`
    .recipe-detail-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 16px;
    }
    
    .back-button {
      margin-bottom: 16px;
    }
    
    .hero-image-container {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 24px;
    }
    
    .hero-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }
    
    .hero-overlay {
      position: absolute;
      top: 16px;
      right: 16px;
    }
    
    .difficulty-badge {
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .difficulty-easy {
      background: #4caf50;
      color: white;
    }
    
    .difficulty-medium {
      background: #ff9800;
      color: white;
    }
    
    .difficulty-hard {
      background: #f44336;
      color: white;
    }
    
    .title-section {
      margin-bottom: 24px;
    }
    
    .title-section h1 {
      margin: 0 0 12px;
      font-size: 2rem;
      color: #333;
    }
    
    .description {
      color: #666;
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 16px;
    }
    
    .meta-info {
      display: flex;
      gap: 24px;
      margin-bottom: 16px;
    }
    
    .meta-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
    }
    
    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .nutrition-section {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
    }
    
    .nutrition-section h3 {
      margin: 0 0 16px;
      color: #333;
    }
    
    .nutrition-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 16px;
    }
    
    .nutrition-card {
      background: white;
      border-radius: 8px;
      padding: 16px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    
    .nutrition-value {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      color: #4caf50;
    }
    
    .nutrition-label {
      font-size: 0.85rem;
      color: #666;
    }
    
    .ingredients-section {
      margin-bottom: 24px;
    }
    
    .ingredients-section h3 {
      margin: 0 0 16px;
      color: #333;
    }
    
    .servings-adjust {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
      padding: 12px;
      background: #f5f5f5;
      border-radius: 8px;
      width: fit-content;
    }
    
    .ingredient-amount {
      font-weight: 600;
      color: #4caf50;
      min-width: 80px;
    }
    
    .ingredient-name {
      color: #333;
    }
    
    .instructions-section {
      margin-bottom: 32px;
    }
    
    .instructions-section h3 {
      margin: 0 0 20px;
      color: #333;
    }
    
    .instructions-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .instructions-list li {
      display: flex;
      gap: 16px;
      margin-bottom: 20px;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 12px;
    }
    
    .step-number {
      width: 32px;
      height: 32px;
      background: #4caf50;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      flex-shrink: 0;
    }
    
    .instructions-list p {
      margin: 0;
      color: #444;
      line-height: 1.6;
    }
    
    .action-buttons {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      padding-top: 16px;
      border-top: 1px solid #eee;
    }
    
    .loading-container {
      display: flex;
      justify-content: center;
      padding: 64px;
    }
    
    .error-state {
      text-align: center;
      padding: 64px;
    }
    
    .error-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #f44336;
      margin-bottom: 16px;
    }
    
    @media (max-width: 600px) {
      .title-section h1 {
        font-size: 1.5rem;
      }
      
      .hero-image {
        height: 200px;
      }
      
      .meta-info {
        flex-wrap: wrap;
        gap: 12px;
      }
      
      .action-buttons {
        flex-direction: column;
      }
      
      .action-buttons button {
        width: 100%;
      }
    }
  `]
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;
  loading = true;
  servings = 1;
  originalServings = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private mealService: MealService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRecipe(+id);
    }
  }

  loadRecipe(id: number): void {
    this.loading = true;
    this.recipeService.getRecipe(id).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        this.servings = recipe.servings;
        this.originalServings = recipe.servings;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading recipe:', error);
        this.loading = false;
      }
    });
  }

  adjustServings(delta: number): void {
    this.servings = Math.max(1, this.servings + delta);
  }

  formatAmount(amount: number): string {
    const ratio = this.servings / this.originalServings;
    const adjusted = amount * ratio;
    return Number.isInteger(adjusted) ? adjusted.toString() : adjusted.toFixed(1);
  }

  goBack(): void {
    this.router.navigate(['/recipes']);
  }

  logMeal(): void {
    if (!this.recipe) return;
    
    const today = new Date().toISOString().split('T')[0];
    this.mealService.logMeal({
      recipe_id: this.recipe.id,
      meal_type: 'dinner',
      date: today
    }).subscribe({
      next: () => {
        this.snackBar.open('Mahlzeit eingetragen!', '', { duration: 2000 });
      },
      error: () => {
        this.snackBar.open('Fehler beim Eintragen', 'OK', { duration: 3000 });
      }
    });
  }

  addToFavorites(): void {
    this.snackBar.open('Zu Favoriten hinzugefügt!', '', { duration: 2000 });
  }
}
