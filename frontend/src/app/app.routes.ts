import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/swipe', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  { 
    path: 'swipe', 
    loadComponent: () => import('./components/swipe-view/swipe-view.component').then(m => m.SwipeViewComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'recipes', 
    loadComponent: () => import('./components/recipe-list/recipe-list.component').then(m => m.RecipeListComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'recipes/:id', 
    loadComponent: () => import('./components/recipe-detail/recipe-detail.component').then(m => m.RecipeDetailComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'meals', 
    loadComponent: () => import('./components/meal-tracker/meal-tracker.component').then(m => m.MealTrackerComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/swipe' }
];
