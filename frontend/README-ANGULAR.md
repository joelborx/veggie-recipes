# VeggieSwipe - Angular Frontend

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   │   └── header.component.ts
│   │   │   ├── footer/
│   │   │   │   └── footer.component.ts
│   │   │   ├── recipe-card/
│   │   │   │   └── recipe-card.component.ts
│   │   │   ├── swipe-view/
│   │   │   │   └── swipe-view.component.ts
│   │   │   ├── recipe-list/
│   │   │   │   └── recipe-list.component.ts
│   │   │   ├── recipe-detail/
│   │   │   │   └── recipe-detail.component.ts
│   │   │   ├── login/
│   │   │   │   └── login.component.ts
│   │   │   ├── register/
│   │   │   │   └── register.component.ts
│   │   │   ├── profile/
│   │   │   │   └── profile.component.ts
│   │   │   └── meal-tracker/
│   │   │       └── meal-tracker.component.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── recipe.service.ts
│   │   │   ├── swipe.service.ts
│   │   │   └── meal.service.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
└── package.json
```

## 🚀 How to Start the Frontend

### Development Mode
```bash
cd /data/.openclaw/workspace/projects/veggie-recipes/frontend
npm start
```
The app will be available at: **http://localhost:4200/**

### Production Build
```bash
cd /data/.openclaw/workspace/projects/veggie-recipes/frontend
npm run build
```
The build output will be in `dist/frontend/`.

## 🔗 Backend API Configuration

The frontend expects the backend API at: `http://localhost:5000/api`

To change this, edit the API URLs in:
- `src/app/services/auth.service.ts`
- `src/app/services/recipe.service.ts`
- `src/app/services/swipe.service.ts`
- `src/app/services/meal.service.ts`

## 📱 Features

### 1. Authentication
- Login/Register with JWT token storage
- Protected routes with AuthGuard
- Automatic token injection in HTTP requests

### 2. Swipe Interface (Tinder-like)
- Swipe left: Dislike
- Swipe right: Like/Save
- Swipe up: Superlike
- Touch and mouse gesture support
- Visual feedback during swipes
- Undo functionality

### 3. Recipe Management
- Browse all recipes with filters
- Filter by tags, difficulty, time
- Search functionality
- Detailed recipe view with ingredients and instructions
- Nutrition facts display
- Adjustable serving sizes

### 4. Meal Tracking
- Log meals with date and type
- View meal history
- Statistics dashboard (calories, protein, meals count)
- Delete logged meals

### 5. User Profile
- Edit profile information
- Manage dietary preferences
- Manage allergies
- View personal statistics

## 🎨 Styling

- **Framework**: Angular Material (Indigo-Pink theme)
- **Design**: Mobile-first, responsive
- **Animations**: CSS transitions for swipe effects
- **Icons**: Material Icons

## 🧪 Testing with Backend

1. Make sure the backend is running on `http://localhost:5000`
2. Start the frontend: `npm start`
3. Open browser to `http://localhost:4200`
4. Register a new account or login
5. Start swiping!

## 🔧 Configuration Needed

### CORS (Backend)
Ensure your backend allows requests from `http://localhost:4200`:

```python
# Flask example
from flask_cors import CORS
CORS(app, origins=["http://localhost:4200"])
```

### API Endpoints Expected

The frontend expects these endpoints:

**Auth:**
- `POST /api/auth/login`
- `POST /api/auth/register`
- `PUT /api/auth/profile`

**Recipes:**
- `GET /api/recipes`
- `GET /api/recipes/:id`
- `GET /api/recipes/recommendations`
- `GET /api/recipes/tags`

**Swipes:**
- `POST /api/swipes`
- `GET /api/swipes/history`
- `POST /api/swipes/undo`

**Meals:**
- `POST /api/meals`
- `GET /api/meals`
- `GET /api/meals/stats`
- `DELETE /api/meals/:id`

## 📦 Dependencies

- Angular 21
- Angular Material
- RxJS
- TypeScript

## 📝 Notes

- All components are standalone (no NgModules)
- Lazy loading for route components
- HTTP interceptors for auth tokens
- Responsive design for mobile devices
