# Veggie Recipes Database Credentials

## Development Environment

### MongoDB (Docker)
- **Container Name**: veggie-recipes-mongodb
- **Port**: 27017
- **Database**: veggie_recipes
- **Root Username**: admin
- **Root Password**: veggie_dev_password
- **Connection String**: `mongodb://localhost:27017/veggie_recipes`

### MongoDB Express (Web UI)
- **URL**: http://localhost:8081
- **Username**: admin
- **Password**: veggie_dev_password

### Application
- **JWT Secret**: `vbZGYQfiF43ZP/z5Z7feL2OHrtHl2DwYUaocpTe7nNQ=`
- **API Port**: 5000
- **Client URL**: http://localhost:4200

---

## How to Start

1. Start the database:
   ```bash
   cd /data/.openclaw/workspace/projects/veggie-recipes/backend
   docker-compose up -d
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Access the API at: http://localhost:5000/api

---

## ⚠️ Security Warning

These credentials are for **local development only**.
Never use these in production!
For production, use MongoDB Atlas with:
- Strong, unique passwords
- IP whitelisting
- VPC peering or private endpoints
- TLS/SSL encryption
- Different JWT secret stored in secure vault