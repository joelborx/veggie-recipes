import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Recipe } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <mat-card class="recipe-card" [class.swipe-mode]="swipeMode">
      <div class="recipe-image-container">
        <img 
          [src]="recipe.image_url || 'assets/placeholder-recipe.jpg'" 
          [alt]="recipe.title"
          class="recipe-image"
        />
        <div class="recipe-overlay">
          <div class="difficulty-badge" [class]="'difficulty-' + recipe.difficulty">
            {{ recipe.difficulty | titlecase }}
          </div>
          <div class="time-badge">
            <mat-icon>schedule</mat-icon>
            {{ recipe.prep_time + recipe.cook_time }} min
          </div>
        </div>
      </div>
      
      <mat-card-content>
        <h3 class="recipe-title">{{ recipe.title }}</h3>
        <p class="recipe-description">{{ recipe.description | slice:0:100 }}...</p>
        
        <!-- Nutrition Info -->
        <div class="nutrition-row" *ngIf="recipe.calories">
          <div class="nutrition-item">
            <span class="nutrition-value">{{ recipe.calories }}</span>
            <span class="nutrition-label">kcal</span>
          </div>
          <div class="nutrition-item" *ngIf="recipe.protein">
            <span class="nutrition-value">{{ recipe.protein }}g</span>
            <span class="nutrition-label">Protein</span>
          </div>
          <div class="nutrition-item" *ngIf="recipe.carbs">
            <span class="nutrition-value">{{ recipe.carbs }}g</span>
            <span class="nutrition-label">Kohlenh.</span>
          </div>
          <div class="nutrition-item" *ngIf="recipe.fat">
            <span class="nutrition-value">{{ recipe.fat }}g</span>
            <span class="nutrition-label">Fett</span>
          </div>
        </div>
        
        <!-- Tags -->
        <div class="tags-container">
          <mat-chip-set aria-label="Rezept-Tags">
            <mat-chip *ngFor="let tag of recipe.tags.slice(0, 3)" highlighted="false">
              {{ tag }}
            </mat-chip>
          </mat-chip-set>
        </div>
      </mat-card-content>
      
      <!-- Swipe Buttons -->
      <mat-card-actions class="swipe-actions" *ngIf="swipeMode">
        <button mat-fab class="swipe-btn dislike" (click)="onSwipe('left')" color="warn">
          <mat-icon>close</mat-icon>
        </button>
        <button mat-fab class="swipe-btn info" (click)="onDetails()">
          <mat-icon>info</mat-icon>
        </button>
        <button mat-fab class="swipe-btn like" (click)="onSwipe('right')" color="primary">
          <mat-icon>favorite</mat-icon>
        </button>
        <button mat-fab class="swipe-btn superlike" (click)="onSwipe('up')" color="accent">
          <mat-icon>star</mat-icon>
        </button>
      </mat-card-actions>
      
      <!-- List View Actions -->
      <mat-card-actions class="list-actions" *ngIf="!swipeMode">
        <button mat-button color="primary" [routerLink]="['/recipes', recipe.id]">
          Details ansehen
        </button>
        <button mat-icon-button (click)="onSwipe('right')" color="accent">
          <mat-icon>favorite_border</mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .recipe-card {
      max-width: 400px;
      margin: 0 auto;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .recipe-card.swipe-mode {
      max-width: 380px;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .recipe-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(0,0,0,0.2);
    }
    
    .recipe-image-container {
      position: relative;
      height: 220px;
      overflow: hidden;
    }
    
    .recipe-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .recipe-card:hover .recipe-image {
      transform: scale(1.05);
    }
    
    .recipe-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    
    .difficulty-badge {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
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
    
    .time-badge {
      display: flex;
      align-items: center;
      gap: 4px;
      background: rgba(0,0,0,0.6);
      color: white;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.8rem;
    }
    
    .time-badge mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }
    
    .recipe-title {
      margin: 12px 0 8px;
      font-size: 1.25rem;
      font-weight: 600;
      color: #333;
    }
    
    .recipe-description {
      color: #666;
      font-size: 0.9rem;
      line-height: 1.5;
      margin-bottom: 12px;
    }
    
    .nutrition-row {
      display: flex;
      justify-content: space-around;
      padding: 12px 0;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      margin-bottom: 12px;
    }
    
    .nutrition-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    .nutrition-value {
      font-weight: 700;
      font-size: 1rem;
      color: #4caf50;
    }
    
    .nutrition-label {
      font-size: 0.7rem;
      color: #888;
      text-transform: uppercase;
    }
    
    .tags-container {
      margin-top: 8px;
    }
    
    mat-chip {
      font-size: 0.75rem;
    }
    
    .swipe-actions {
      display: flex;
      justify-content: space-around;
      padding: 16px;
      margin: 0;
    }
    
    .swipe-btn {
      width: 56px;
      height: 56px;
    }
    
    .swipe-btn.dislike {
      background: #ff5252;
      color: white;
    }
    
    .swipe-btn.like {
      background: #4caf50;
      color: white;
    }
    
    .swipe-btn.superlike {
      background: #ffd700;
      color: #333;
    }
    
    .swipe-btn.info {
      background: #e0e0e0;
      color: #666;
    }
    
    .list-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    @media (max-width: 480px) {
      .recipe-card {
        max-width: 100%;
      }
      
      .recipe-image-container {
        height: 180px;
      }
      
      .swipe-btn {
        width: 48px;
        height: 48px;
      }
    }
  `]
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Input() swipeMode: boolean = false;
  
  @Output() swipe = new EventEmitter<'left' | 'right' | 'up'>();
  @Output() details = new EventEmitter<void>();

  onSwipe(direction: 'left' | 'right' | 'up'): void {
    this.swipe.emit(direction);
  }

  onDetails(): void {
    this.details.emit();
  }
}
