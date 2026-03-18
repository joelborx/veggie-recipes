# Veggie Recipes App

Eine vegetarische Rezept-App mit Swipe-Funktion, Nährwert-Tracking und personalisierten Empfehlungen.

## Features

- 💫 **Swipe-Modus** - Wie TikTok/Tinder für Rezepte
- 📊 **Nährwerte** - Kalorien, Eiweiß, Kohlenhydrate, Fette
- 🔍 **Filter** - Nach Nährwerten, Zeit, Schwierigkeit
- 🤖 **Algorithmus** - Lernt Vorlieben + Rotation
- 👤 **Multi-User** - Eigene Accounts + Präferenzen
- 🍽️ **Ernährungstracking** - Tagesbilanz
- 🔗 **Yazio-Integration** - Sync mit Yazio-App (geplant)

## Tech Stack

- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Frontend:** Angular
- **Auth:** JWT
- **Hosting:** Cloudflare Tunnel

## Projekt-Struktur

```
veggie-recipes/
├── backend/          # Express API
│   ├── models/       # Mongoose Models
│   ├── routes/       # API Routes
│   ├── middleware/   # Auth Middleware
│   └── data/         # Seed Daten
├── frontend/         # Angular App
│   ├── src/app/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── ...
└── STATUS.md         # Aktueller Projektstand
```

## Schnellstart

### Backend
```bash
cd backend
docker-compose up -d  # MongoDB starten
npm install
npm start              # Port 5000
```

### Frontend
```bash
cd frontend
npm install
ng serve               # Port 4200
```

## API Endpoints

- `POST /api/auth/register` - Registrierung
- `POST /api/auth/login` - Login
- `GET /api/recipes` - Alle Rezepte
- `GET /api/recipes/recommendations` - Empfehlungen
- `POST /api/swipes` - Swipe speichern
- `POST /api/meals` - Mahlzeit loggen

## Mitwirkende

- **Product Owner:** Joel
- **Projektmanager:** Brody

## Lizenz

MIT
