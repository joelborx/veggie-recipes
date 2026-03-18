import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recipe {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  prep_time: number;
  cook_time: number;
  difficulty: 'easy' | 'medium' | 'hard';
  servings: number;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  tags: string[];
  ingredients: Ingredient[];
  instructions: string[];
  created_at: string;
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

export interface RecipeFilter {
  tags?: string[];
  difficulty?: string;
  maxTime?: number;
  search?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getRecipes(filter?: RecipeFilter): Observable<Recipe[]> {
    let params = new HttpParams();
    
    if (filter) {
      if (filter.tags?.length) {
        params = params.set('tags', filter.tags.join(','));
      }
      if (filter.difficulty) {
        params = params.set('difficulty', filter.difficulty);
      }
      if (filter.maxTime) {
        params = params.set('max_time', filter.maxTime.toString());
      }
      if (filter.search) {
        params = params.set('search', filter.search);
      }
    }
    
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes`, { params });
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/recipes/${id}`);
  }

  getRecommendations(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes/recommendations`);
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/recipes/tags`);
  }

  searchRecipes(query: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes/search`, {
      params: { q: query }
    });
  }
}
