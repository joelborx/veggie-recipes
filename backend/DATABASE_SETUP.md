# MongoDB Setup Guide for Veggie Recipes App

## Option 1: Docker (Recommended for Development) ✅ READY

I've created a `docker-compose.yml` file that sets up:
- MongoDB 7.0 with persistent storage
- MongoDB Express (web UI) available at http://localhost:8081

### To start the database:
```bash
cd /data/.openclaw/workspace/projects/veggie-recipes/backend
docker-compose up -d
```

### To stop the database:
```bash
docker-compose down
```

### Access MongoDB Express (Web UI):
- URL: http://localhost:8081
- Username: admin
- Password: veggie_dev_password

### Connection Details:
- **Host**: localhost:27017
- **Database**: veggie_recipes
- **Root Username**: admin
- **Root Password**: veggie_dev_password
- **Connection String**: `mongodb://localhost:27017/veggie_recipes`

---

## Option 2: MongoDB Atlas (Cloud) - Manual Setup Required

Since Atlas requires email verification and account creation, follow these steps:

### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/GitHub/Email
3. Verify your email

### Step 2: Create Cluster
1. Click "Create" → "Cluster"
2. Choose "M0 Sandbox" (FREE tier)
3. Select region closest to you (e.g., Frankfurt for Europe)
4. Name cluster: `veggie-recipes-cluster`
5. Click "Create Cluster" (takes ~5 minutes)

### Step 3: Create Database User
1. Go to Database Access → Add New Database User
2. Authentication: Password
3. Username: `veggie_user`
4. Password: Generate a secure password (save it!)
5. Database User Privileges: Read and write to any database
6. Click "Add User"

### Step 4: Whitelist IP Addresses
1. Go to Network Access → Add IP Address
2. Click "Allow Access from Anywhere" (0.0.0.0/0) for development
3. Or add your specific IP

### Step 5: Get Connection String
1. Go to Clusters → Click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Update `.env` file with the new URI

### Example Atlas Connection String:
```
mongodb+srv://veggie_user:<password>@veggie-recipes-cluster.xxxxx.mongodb.net/veggie_recipes?retryWrites=true&w=majority
```

---

## Option 3: Local MongoDB Installation

### macOS (Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Ubuntu/Debian:
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
```

### Windows:
Download installer from: https://www.mongodb.com/try/download/community

---

## Current Environment Configuration

The `.env` file has been updated with:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/veggie_recipes
JWT_SECRET=vbZGYQfiF43ZP/z5Z7feL2OHrtHl2DwYUaocpTe7nNQ=
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:4200
```

### Security Notes:
- JWT_SECRET is a cryptographically secure random string (32 bytes)
- Store production credentials securely (use environment variables, never commit to git)
- For production, use MongoDB Atlas with IP whitelisting and VPC peering

---

## Testing the Connection

Once MongoDB is running (via Docker, Atlas, or local install):

```bash
cd /data/.openclaw/workspace/projects/veggie-recipes/backend
npm start
```

You should see:
```
MongoDB Connected: localhost
Server running on port 5000
API available at http://localhost:5000/api
```

Test the health endpoint:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2026-03-18T...",
  "message": "Veggie Recipes API is running!"
}
```

---

## Files Created/Modified

1. ✅ `docker-compose.yml` - Docker setup for MongoDB + MongoDB Express
2. ✅ `.env` - Environment variables with secure JWT secret
3. ✅ `DATABASE_SETUP.md` - This guide

## Next Steps

1. Install Docker if not already installed
2. Run `docker-compose up -d` in the backend directory
3. Run `npm start` to start the server
4. Access MongoDB Express at http://localhost:8081 for database management