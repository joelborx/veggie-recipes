# Veggie Recipes - Datenmodell

## Entitäten

### User
- id: string (UUID)
- email: string (unique)
- name: string
- passwordHash: string
- preferences: UserPreferences
- createdAt: Date
- updatedAt: Date

### UserPreferences
- userId: string
- calorieGoal: number (tägliches Ziel)
- proteinGoal: number
- dietaryRestrictions: string[] (z.B. "vegan", "glutenfrei", "laktosefrei")
- allergies: string[]
- dislikedIngredients: string[]
- likedIngredients: string[]
- cuisinePreferences: string[] (italienisch, asiatisch, etc.)

### Recipe (Rezept)
- id: string (UUID)
- title: string
- description: string
- imageUrl: string
- prepTime: number (Minuten)
- cookTime: number (Minuten)
- difficulty: enum ["easy", "medium", "hard"]
- servings: number
- ingredients: Ingredient[]
- instructions: string[]
- nutritionFacts: NutritionFacts
- tags: string[] (vegetarisch, vegan, glutenfrei, etc.)
- cuisine: string (italienisch, indisch, etc.)
- season: string[] (Frühling, Sommer, Herbst, Winter)
- createdAt: Date
- updatedAt: Date

### Ingredient
- name: string
- amount: number
- unit: string (g, ml, Stück, etc.)
- category: string (Gemüse, Obst, Getreide, etc.)

### NutritionFacts (Nährwerte pro Portion)
- calories: number (kcal)
- protein: number (g)
- carbs: number (g)
- fat: number (g)
- fiber: number (g)
- sugar: number (g)

### SwipeAction (Swipe-Verlauf)
- id: string (UUID)
- userId: string
- recipeId: string
- action: enum ["like", "dislike", "superlike"]
- timestamp: Date

### EatenMeal (Gegessene Mahlzeiten)
- id: string (UUID)
- userId: string
- recipeId: string
- date: Date (Tag der Mahlzeit)
- mealType: enum ["breakfast", "lunch", "dinner", "snack"]
- servings: number
- syncedToYazio: boolean
- yazioLogId: string (optional)
- createdAt: Date

### RecipeView (Tracking für Empfehlungen)
- id: string (UUID)
- userId: string
- recipeId: string
- viewedAt: Date
- duration: number (Sekunden, wie lange angeschaut)

## Beziehungen

- User 1:N SwipeAction
- User 1:N EatenMeal
- User 1:N RecipeView
- User 1:1 UserPreferences
- Recipe 1:N SwipeAction
- Recipe 1:N EatenMeal
- Recipe 1:N RecipeView

## Algorithmus-Logik

### Empfehlungs-Score
Der Algorithmus berechnet einen Score für jedes Rezept:

```
Score = (
  (likeSimilarity * 0.3) +
  (nutritionMatch * 0.2) +
  (timeSinceLastView * 0.15) +
  (seasonMatch * 0.1) +
  (cuisineDiversity * 0.1) +
  (ingredientPreference * 0.15)
)
```

- **likeSimilarity**: Wie ähnlich ist es zu bisher gelikten Rezepten?
- **nutritionMatch**: Passt es zu den Nährwert-Zielen?
- **timeSinceLastView**: Wann wurde es zuletzt gezeigt? (Rotation)
- **seasonMatch**: Passen die Zutaten zur aktuellen Jahreszeit?
- **cuisineDiversity**: Abwechslung in der Küche
- **ingredientPreference**: Bevorzugte Zutaten vorhanden?

### Swipe-Queue
- Max 20 Rezepte im Voraus laden
- Nach jedem Swipe: neuen Score berechnen
- Disliked Rezepte: 7 Tage nicht anzeigen
- Superliked Rezepte: Priorität erhöhen
