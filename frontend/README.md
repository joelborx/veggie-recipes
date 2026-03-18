# Veggie Recipes - Angular Frontend

A modern, mobile-first Angular frontend for the Veggie Recipes app with a Tinder-like swipe interface for discovering vegetarian recipes.

## Features

### 🎯 Core Features
- **Swipe Interface**: Tinder-like card swiping to discover recipes
  - Swipe Right: Like ❤️
  - Swipe Left: Skip 👋
  - Swipe Up: Super Like ⭐
  - Keyboard shortcuts: Arrow keys for navigation
- **Recipe Discovery**: Browse and filter recipes by tags, difficulty, time, and calories
- **Meal Tracking**: Log meals and track nutrition history
- **User Profiles**: Manage preferences and view activity stats

### 🎨 UI/UX
- Modern, clean design with glassmorphism effects
- Mobile-first responsive design
- Smooth animations for swipe gestures
- Angular Material components for consistent UI
- Beautiful gradient backgrounds

### 🔧 Technical Features
- Standalone Angular components (no NgModules)
- JWT authentication with HTTP interceptors
- Route guards for protected pages
- Reactive forms with validation
- HTTP client with error handling

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/           # Navigation header
│   │   │   ├── footer/           # Simple footer
│   │   │   ├── recipe-card/      # Reusable recipe card with swipe
│   │   │   ├── swipe-view/       # Tinder-like swipe interface
│   │   │   ├── recipe-list/      # Grid/list view with filters
│   │   │   ├── recipe-detail/    # Full recipe view
│   │   │   ├── login/            # Login form
│   │   │   ├── register/         # Registration form
│   │   │   ├── profile/          # User profile page
│   │   │   └── meal-tracker/     # Meal logging & stats
│   │   ├── services/
│   │   │   ├── auth.service.ts   # Authentication & JWT
│   │   │   ├── recipe.service.ts # Recipe API calls
│   │   │   ├── swipe.service.ts  # Swipe recording
│   │   │   └── meal.service.ts   # Meal logging & stats
│   │   ├── guards/
│   │   │   └── auth.guard.ts     # Route protection
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts # JWT token injection
│   │   ├── app.component.ts      # Root component
│   │   └── app.routes.ts         # Route definitions
│   ├── environments/
│   │   └── environment.ts        # API configuration
│   ├── styles.css                # Global styles & animations
│   ├── index.html
│   └── main.ts                   # Bootstrap
├── angular.json                  # Angular CLI config
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API running on `http://localhost:5000`

### Installation

1. **Install dependencies**:
```bash
cd /data/.openclaw/workspace/projects/veggie-recipes/frontend
npm install
```

2. **Configure the backend API** (if needed):
Edit `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'  // Change this if your backend is different
};
```

3. **Start the development server**:
```bash
ng serve
# or
npm start
```

4. **Open in browser**:
Navigate to `http://localhost:4200`

## Development Commands

```bash
# Start development server
ng serve

# Build for production
ng build

# Run tests
ng test

# Lint code
ng lint
```

## Testing with the Backend

### Backend Requirements
The frontend expects a REST API at `http://localhost:5000/api` with these endpoints:

**Authentication:**
- `POST /api/auth/login` - Login with username/password
- `POST /api/auth/register` - Register new user
- `PUT /api/auth/profile` - Update user profile

**Recipes:**
- `GET /api/recipes` - List recipes (with query filters)
- `GET /api/recipes/:id` - Get single recipe
- `GET /api/recipes/swipe` - Get recipes for swipe view
- `GET /api/recipes/tags` - Get available tags

**Swipes:**
- `POST /api/swipes` - Record a swipe
- `GET /api/swipes/stats` - Get swipe statistics
- `GET /api/swipes/liked` - Get liked recipe IDs

**Meals:**
- `POST /api/meals` - Log a meal
- `GET /api/meals` - Get meal history
- `GET /api/meals/stats` - Get nutrition stats
- `DELETE /api/meals/:id` - Delete a meal

### CORS Configuration
Make sure your backend allows CORS from `http://localhost:4200`:
```python
# Flask example
from flask_cors import CORS
CORS(app, origins=["http://localhost:4200"])
```

## Configuration

### Environment Variables
Create `src/environments/environment.prod.ts` for production:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api'
};
```

### Build for Production
```bash
ng build --configuration production
```

Output will be in `dist/frontend/`.

## Key Features Explained

### Swipe Gestures
The RecipeCard component supports:
- **Touch/Mouse dragging**: Click/touch and drag to swipe
- **Visual feedback**: Overlays show swipe direction
- **Smooth animations**: Cards animate out based on swipe direction
- **Keyboard support**: Arrow keys for desktop users

### Authentication Flow
1. User logs in → JWT token stored in localStorage
2. Auth interceptor adds token to all API requests
3. Auth guard protects routes
4. Auto-redirect to login for unauthenticated users

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 600px, 768px, 1200px
- Touch-friendly buttons (min 44px)
- Optimized card sizes for mobile

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Common Issues

**CORS errors**: Ensure backend allows `http://localhost:4200`

**API not found**: Check `environment.ts` has correct API URL

**Build errors**: Run `npm install` to ensure all dependencies

**Hot reload not working**: Use `ng serve --poll=2000`

### Development Tips

1. **Use Angular DevTools**: Browser extension for debugging
2. **Check Network tab**: Verify API calls in browser dev tools
3. **Console logs**: Services log errors for debugging
4. **Type safety**: All services use TypeScript interfaces

## License
MIT