import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type SwipeDirection = 'left' | 'right' | 'up';

export interface SwipeRecord {
  id: number;
  recipe_id: number;
  direction: SwipeDirection;
  created_at: string;
}

export interface SwipeRequest {
  recipe_id: number;
  direction: SwipeDirection;
}

@Injectable({
  providedIn: 'root'
})
export class SwipeService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  recordSwipe(recipeId: number, direction: SwipeDirection): Observable<SwipeRecord> {
    return this.http.post<SwipeRecord>(`${this.apiUrl}/swipes`, {
      recipe_id: recipeId,
      direction: direction
    });
  }

  getSwipeHistory(): Observable<SwipeRecord[]> {
    return this.http.get<SwipeRecord[]>(`${this.apiUrl}/swipes/history`);
  }

  getLikedRecipes(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/swipes/liked`);
  }

  getSuperlikedRecipes(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/swipes/superliked`);
  }

  undoLastSwipe(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/swipes/undo`, {});
  }
}
