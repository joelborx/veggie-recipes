import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MealLog {
  id: number;
  recipe_id: number;
  recipe_title?: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  date: string;
  notes?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  created_at: string;
}

export interface MealLogRequest {
  recipe_id: number;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  date: string;
  notes?: string;
}

export interface MealStats {
  totalMeals: number;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  mealsByType: { [key: string]: number };
  weeklyData: {
    labels: string[];
    calories: number[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrl = 'https://sara-hip-moral-lobby.trycloudflare.com/api';

  constructor(private http: HttpClient) {}

  logMeal(meal: MealLogRequest): Observable<MealLog> {
    return this.http.post<MealLog>(`${this.apiUrl}/meals`, meal);
  }

  getMealHistory(startDate?: string, endDate?: string): Observable<MealLog[]> {
    let params = new HttpParams();
    if (startDate) {
      params = params.set('start_date', startDate);
    }
    if (endDate) {
      params = params.set('end_date', endDate);
    }
    return this.http.get<MealLog[]>(`${this.apiUrl}/meals`, { params });
  }

  getMealStats(period: 'week' | 'month' | 'year' = 'week'): Observable<MealStats> {
    return this.http.get<MealStats>(`${this.apiUrl}/meals/stats`, {
      params: { period }
    });
  }

  deleteMeal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/meals/${id}`);
  }

  updateMeal(id: number, meal: Partial<MealLogRequest>): Observable<MealLog> {
    return this.http.put<MealLog>(`${this.apiUrl}/meals/${id}`, meal);
  }
}
