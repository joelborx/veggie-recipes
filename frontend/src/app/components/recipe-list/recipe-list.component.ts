import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';

import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { Recipe, RecipeService, RecipeFilter } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RecipeCardComponent,
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="recipe-list-container">
      <div class="list-header">
        <h2>Alle Rezepte</h2>
        <button mat-icon-button (click)="toggleFilters()" color="primary">
          <mat-icon>filter_list</mat-icon>
        </button>
      </div>
      
      <!-- Filters -->
      <div class="filters-panel" *ngIf="showFilters">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Suchen</mat-label>
          <input matInput [(ngModel)]="filter.search" (keyup.enter)="applyFilters()" placeholder="Rezeptname...">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
        
        <div class="filter-row">
          <mat-form-field appearance="outline">
            <mat-label>Schwierigkeit</mat-label>
            <mat-select [(ngModel)]="filter.difficulty">
              <mat-option>Alle</mat-option>
              <mat-option value="easy">Einfach</mat-option>
              <mat-option value="medium">Mittel</mat-option>
              <mat-option value="hard">Schwer</mat-option>
            </mat-select>
          </mat-form-field>
          
          <mat-form-field appearance="outline">
            <mat-label>Max. Zeit (Min)</mat-label>
            <input matInput type="number" [(ngModel)]="filter.maxTime" placeholder="z.B. 30">
          </mat-form-field>
          
          <button mat-raised-button color="primary" (click)="applyFilters()">
            <mat-icon>filter_alt</mat-icon>
            Filtern
          </button>
          
          <button mat-button (click)="resetFilters()">
            Zurücksetzen
          </button>
        </div>
        
        <!-- Tags -->
        <div class="tags-filter" *ngIf="availableTags.length > 0">
          <span class="tags-label">Tags:</span>
          <mat-chip-listbox multiple [(ngModel)]="selectedTags">
            <mat-chip-option *ngFor="let tag of availableTags" [value]="tag">
              {{ tag }}
            </mat-chip-option>
          </mat-chip-listbox>
        </div>
      </div>
      
      <!-- Loading -->
      <div class="loading-container" *ngIf="loading">
        <mat-spinner diameter="50"></mat-spinner>
      </div>
      
      <!-- Recipe Grid -->
      <div class="recipe-grid" *ngIf="!loading">
        <div class="recipe-item" *ngFor="let recipe of recipes">
          <app-recipe-card 
            [recipe]="recipe" 
            [swipeMode]="false"
            (swipe)="onLike($event, recipe)"
          >
          </app-recipe-card>
        </div>
      </div>
      
      <!-- Empty State -->
      <div class="empty-state" *ngIf="!loading && recipes.length === 0">
        <mat-icon class="empty-icon">search_off</mat-icon>
        <h3>Keine Rezepte gefunden</h3>
        <p>Versuche andere Filter oder Suchbegriffe.</p>
        <button mat-raised-button color="primary" (click)="resetFilters()">
          Filter zurücksetzen
        </button>
      </div>
    </div>
  `,
  styles: [`
    .recipe-list-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 16px;
    }
    
    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .list-header h2 {
      margin: 0;
      color: #333;
    }
    
    .filters-panel {
      background: #f5f5f5;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 24px;
    }
    
    .search-field {
      width: 100%;
    }
    
    .filter-row {
      display: flex;
      gap: 16px;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 16px;
    }
    
    .filter-row mat-form-field {
      flex: 1;
      min-width: 150px;
    }
    
    .tags-filter {
      margin-top: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    
    .tags-label {
      font-weight: 500;
      color: #666;
    }
    
    .loading-container {
      display: flex;
      justify-content: center;
      padding: 48px;
    }
    
    .recipe-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }
    
    .recipe-item {
      display: flex;
      justify-content: center;
    }
    
    .empty-state {
      text-align: center;
      padding: 48px;
    }
    
    .empty-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #ccc;
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
    
    @media (max-width: 600px) {
      .recipe-grid {
        grid-template-columns: 1fr;
      }
      
      .filter-row {
        flex-direction: column;
        align-items: stretch;
      }
      
      .filter-row mat-form-field {
        width: 100%;
      }
    }
  `]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  loading = true;
  showFilters = false;
  availableTags: string[] = [];
  selectedTags: string[] = [];
  
  filter: RecipeFilter = {
    search: '',
    difficulty: undefined,
    maxTime: undefined,
    tags: []
  };
  
  private destroy$ = new Subject<void>();

  constructor(
    private recipeService: RecipeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRecipes();
    this.loadTags();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadRecipes(): void {
    this.loading = true;
    this.recipeService.getRecipes(this.filter)
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

  loadTags(): void {
    this.recipeService.getTags()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tags) => {
          this.availableTags = tags;
        }
      });
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  applyFilters(): void {
    this.filter.tags = this.selectedTags.length > 0 ? this.selectedTags : undefined;
    this.loadRecipes();
  }

  resetFilters(): void {
    this.filter = {
      search: '',
      difficulty: undefined,
      maxTime: undefined,
      tags: undefined
    };
    this.selectedTags = [];
    this.loadRecipes();
  }

  onLike(direction: string, recipe: Recipe): void {
    if (direction === 'right') {
      this.snackBar.open(`"${recipe.title}" gespeichert!`, '', { duration: 2000 });
    }
  }
}
