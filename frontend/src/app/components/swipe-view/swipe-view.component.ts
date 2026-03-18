import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';

import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { Recipe, RecipeService } from '../../services/recipe.service';
import { SwipeService, SwipeDirection } from '../../services/swipe.service';

@Component({
  selector: 'app-swipe-view',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent, MatProgressSpinnerModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  template: `
    <div class="swipe-container">
      <div class="swipe-header">
        <h2>Finde dein perfektes Rezept</h2>
        <p class="swipe-instructions">
          <span>👈 Nicht interessant</span>
          <span>👆 Super lecker!</span>
          <span>👉 Interessant</span>
        </p>
      </div>
      
      <!-- Loading State -->
      <div class="loading-container" *ngIf="loading">
        <mat-spinner diameter="60"></mat-spinner>
        <p>Lade leckere Rezepte...</p>
      </div>
      
      <!-- Empty State -->
      <div class="empty-state" *ngIf="!loading && recipes.length === 0">
        <mat-icon class="empty-icon">restaurant</mat-icon>
        <h3>Keine Rezepte mehr!</h3>
        <p>Du hast alle Rezepte durchgeswiped.</p>
        <button mat-raised-button color="primary" (click)="loadRecipes()">
          <mat-icon>refresh</mat-icon>
          Neue laden
        </button>
      </div>
      
      <!-- Card Stack -->
      <div class="card-stack" *ngIf="!loading && recipes.length > 0">
        <div 
          class="card-wrapper"
          *ngFor="let recipe of visibleRecipes; let i = index"
          [style.zIndex]="visibleRecipes.length - i"
          [class.top-card]="i === 0"
          [style.transform]="i === 0 ? cardTransform : getStackTransform(i)"
          [style.opacity]="i > 2 ? 0 : 1"
          #cardElement
          (touchstart)="onTouchStart($event)"
          (touchmove)="onTouchMove($event)"
          (touchend)="onTouchEnd($event)"
          (mousedown)="onMouseDown($event)"
          (mousemove)="onMouseMove($event)"
          (mouseup)="onMouseUp($event)"
          (mouseleave)="onMouseUp($event)"
        >
          <app-recipe-card 
            [recipe]="recipe" 
            [swipeMode]="true"
            (swipe)="onButtonSwipe($event)"
            (details)="viewDetails(recipe)"
          >
          </app-recipe-card>
          
          <!-- Swipe Indicators -->
          <div class="swipe-indicator like" *ngIf="i === 0 && swipeDirection === 'right'">
            <span>LIKE</span>
          </div>
          <div class="swipe-indicator dislike" *ngIf="i === 0 && swipeDirection === 'left'">
            <span>NOPE</span>
          </div>
          <div class="swipe-indicator superlike" *ngIf="i === 0 && swipeDirection === 'up'">
            <span>SUPER</span>
          </div>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="action-buttons" *ngIf="!loading && recipes.length > 0">
        <button mat-fab class="action-btn undo" (click)="undoSwipe()" [disabled]="!canUndo">
          <mat-icon>undo</mat-icon>
        </button>
        
        <button mat-fab class="action-btn dislike" (click)="swipeCurrentCard('left')">
          <mat-icon>close</mat-icon>
        </button>
        
        <button mat-fab class="action-btn superlike" (click)="swipeCurrentCard('up')">
          <mat-icon>star</mat-icon>
        </button>
        
        <button mat-fab class="action-btn like" (click)="swipeCurrentCard('right')">
          <mat-icon>favorite</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .swipe-container {
      max-width: 450px;
      margin: 0 auto;
      padding: 16px;
      min-height: calc(100vh - 200px);
      display: flex;
      flex-direction: column;
    }
    
    .swipe-header {
      text-align: center;
      margin-bottom: 16px;
    }
    
    .swipe-header h2 {
      margin: 0 0 8px;
      color: #333;
      font-size: 1.5rem;
    }
    
    .swipe-instructions {
      display: flex;
      justify-content: center;
      gap: 24px;
      color: #666;
      font-size: 0.85rem;
      margin: 0;
    }
    
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      gap: 16px;
    }
    
    .loading-container p {
      color: #666;
    }
    
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      text-align: center;
      padding: 32px;
    }
    
    .empty-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #4caf50;
      margin-bottom: 16px;
    }
    
    .empty-state h3 {
      margin: 0 0 8px;
      color: #333;
    }
    
    .empty-state p {
      color: #666;
      margin-bottom: 24px;
    }
    
    .card-stack {
      position: relative;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 8px;
    }
    
    .card-wrapper {
      position: absolute;
      width: 100%;
      max-width: 380px;
      transition: transform 0.1s ease-out;
      touch-action: none;
      user-select: none;
    }
    
    .card-wrapper.top-card {
      cursor: grab;
    }
    
    .card-wrapper.top-card:active {
      cursor: grabbing;
    }
    
    .swipe-indicator {
      position: absolute;
      top: 40px;
      padding: 8px 16px;
      border: 4px solid;
      border-radius: 8px;
      font-size: 1.5rem;
      font-weight: bold;
      transform: rotate(-15deg);
      opacity: 0.9;
      z-index: 10;
      pointer-events: none;
    }
    
    .swipe-indicator.like {
      right: 20px;
      color: #4caf50;
      border-color: #4caf50;
    }
    
    .swipe-indicator.dislike {
      left: 20px;
      color: #ff5252;
      border-color: #ff5252;
    }
    
    .swipe-indicator.superlike {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(0deg);
      color: #ffd700;
      border-color: #ffd700;
      background: rgba(255, 215, 0, 0.1);
    }
    
    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 16px;
      padding: 24px 0;
    }
    
    .action-btn {
      width: 64px;
      height: 64px;
    }
    
    .action-btn.dislike {
      background: white;
      color: #ff5252;
      box-shadow: 0 2px 8px rgba(255, 82, 82, 0.3);
    }
    
    .action-btn.like {
      background: white;
      color: #4caf50;
      box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
    }
    
    .action-btn.superlike {
      background: white;
      color: #ffd700;
      box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
    }
    
    .action-btn.undo {
      background: #f5f5f5;
      color: #666;
    }
    
    .action-btn.undo:disabled {
      opacity: 0.5;
    }
    
    @media (max-width: 480px) {
      .swipe-container {
        padding: 8px;
      }
      
      .swipe-instructions {
        gap: 12px;
        font-size: 0.75rem;
      }
      
      .action-btn {
        width: 56px;
        height: 56px;
      }
      
      .action-buttons {
        gap: 12px;
      }
    }
  `]
})
export class SwipeViewComponent implements OnInit, OnDestroy {
  @ViewChild('cardElement') cardElement!: ElementRef;
  
  recipes: Recipe[] = [];
  loading = true;
  canUndo = false;
  
  // Touch/Mouse handling
  private startX = 0;
  private startY = 0;
  private currentX = 0;
  private currentY = 0;
  private isDragging = false;
  cardTransform = '';
  swipeDirection: SwipeDirection | null = null;
  
  private destroy$ = new Subject<void>();

  constructor(
    private recipeService: RecipeService,
    private swipeService: SwipeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get visibleRecipes(): Recipe[] {
    return this.recipes.slice(0, 3);
  }

  loadRecipes(): void {
    this.loading = true;
    this.recipeService.getRecommendations()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (recipes) => {
          this.recipes = recipes;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading recipes:', error);
          this.snackBar.open('Fehler beim Laden der Rezepte', 'OK', { duration: 3000 });
          this.loading = false;
        }
      });
  }

  getStackTransform(index: number): string {
    const scale = 1 - (index * 0.05);
    const translateY = index * 10;
    return `translateY(${translateY}px) scale(${scale})`;
  }

  // Touch Events
  onTouchStart(event: TouchEvent): void {
    if (event.target !== this.cardElement?.nativeElement && 
        !(event.target as HTMLElement).closest('.card-wrapper')) return;
    
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    this.isDragging = true;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    
    this.currentX = event.touches[0].clientX - this.startX;
    this.currentY = event.touches[0].clientY - this.startY;
    
    this.updateCardTransform();
  }

  onTouchEnd(event: TouchEvent): void {
    if (!this.isDragging) return;
    
    this.handleSwipeEnd();
  }

  // Mouse Events
  onMouseDown(event: MouseEvent): void {
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.isDragging = true;
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    
    this.currentX = event.clientX - this.startX;
    this.currentY = event.clientY - this.startY;
    
    this.updateCardTransform();
  }

  onMouseUp(event: MouseEvent): void {
    if (!this.isDragging) return;
    
    this.handleSwipeEnd();
  }

  private updateCardTransform(): void {
    const rotate = this.currentX * 0.05;
    this.cardTransform = `translateX(${this.currentX}px) translateY(${this.currentY}px) rotate(${rotate}deg)`;
    
    // Determine swipe direction for visual feedback
    const threshold = 50;
    if (this.currentX > threshold) {
      this.swipeDirection = 'right';
    } else if (this.currentX < -threshold) {
      this.swipeDirection = 'left';
    } else if (this.currentY < -threshold) {
      this.swipeDirection = 'up';
    } else {
      this.swipeDirection = null;
    }
  }

  private handleSwipeEnd(): void {
    const threshold = 100;
    const verticalThreshold = 80;
    
    if (this.currentX > threshold) {
      this.completeSwipe('right');
    } else if (this.currentX < -threshold) {
      this.completeSwipe('left');
    } else if (this.currentY < -verticalThreshold) {
      this.completeSwipe('up');
    } else {
      // Reset card position
      this.cardTransform = '';
      this.swipeDirection = null;
    }
    
    this.isDragging = false;
    this.currentX = 0;
    this.currentY = 0;
  }

  private completeSwipe(direction: SwipeDirection): void {
    const recipe = this.recipes[0];
    if (!recipe) return;
    
    // Animate card off screen
    const translateX = direction === 'right' ? 500 : direction === 'left' ? -500 : 0;
    const translateY = direction === 'up' ? -500 : 0;
    const rotate = direction === 'right' ? 30 : direction === 'left' ? -30 : 0;
    
    this.cardTransform = `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg)`;
    
    setTimeout(() => {
      this.recordSwipe(recipe.id, direction);
      this.recipes.shift();
      this.cardTransform = '';
      this.swipeDirection = null;
      this.canUndo = true;
      
      // Load more if running low
      if (this.recipes.length < 3) {
        this.loadMoreRecipes();
      }
    }, 200);
  }

  onButtonSwipe(direction: SwipeDirection): void {
    this.swipeCurrentCard(direction);
  }

  swipeCurrentCard(direction: SwipeDirection): void {
    this.completeSwipe(direction);
  }

  private recordSwipe(recipeId: number, direction: SwipeDirection): void {
    this.swipeService.recordSwipe(recipeId, direction)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          const message = direction === 'right' ? 'Gespeichert!' : 
                         direction === 'up' ? 'Superlike! ⭐' : 'Übersprungen';
          this.snackBar.open(message, '', { duration: 1500 });
        },
        error: (error) => {
          console.error('Error recording swipe:', error);
        }
      });
  }

  undoSwipe(): void {
    this.swipeService.undoLastSwipe()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadRecipes();
          this.canUndo = false;
          this.snackBar.open('Rückgängig gemacht', '', { duration: 1500 });
        },
        error: () => {
          this.snackBar.open('Fehler beim Rückgängig machen', 'OK', { duration: 3000 });
        }
      });
  }

  viewDetails(recipe: Recipe): void {
    this.router.navigate(['/recipes', recipe.id]);
  }

  private loadMoreRecipes(): void {
    this.recipeService.getRecommendations()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (newRecipes) => {
          this.recipes.push(...newRecipes);
        }
      });
  }
}
