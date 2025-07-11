# Separate Deployment Guide

## Option 1: Deploy Frontend and Backend Separately

### Frontend (Vercel)
1. Create new Vercel project
2. Connect to GitHub: `gureli35/url-kisaltici`
3. Set root directory to: `client`
4. Environment variables:
   - `NEXT_PUBLIC_API_URL=https://your-api-domain.vercel.app/api`

### Backend (Vercel Functions)
1. Create another Vercel project
2. Set root directory to: `api`
3. Environment variables:
   - `DB_HOST=your-db-host`
   - `DB_USER=your-db-user`
   - `DB_PASSWORD=your-db-password`
   - `DB_DATABASE=url_shortener`
   - `CLIENT_URL=https://your-frontend-domain.vercel.app`

## Option 2: Railway Deployment

### Frontend + Backend on Railway
1. Go to Railway.app
2. Connect GitHub repository
3. Add MySQL database service
4. Set environment variables
5. Deploy both services

## Option 3: Netlify + Railway

### Frontend on Netlify
1. Connect GitHub to Netlify
2. Set build command: `cd client && npm run build`
3. Set publish directory: `client/out`

### Backend on Railway
1. Create Railway project
2. Connect GitHub repository
3. Set start command: `cd api && npm start`

## Recommended: PlanetScale Database

Free MySQL-compatible database:
1. Create PlanetScale account
2. Create database
3. Get connection string
4. Use in environment variables
