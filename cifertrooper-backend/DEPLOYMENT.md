# Deployment Guide

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in values
cp .env.example .env

# 3. Start dev server (requires MongoDB running locally)
npm run dev
```

## Docker (Recommended)

```bash
# Copy and configure env
cp .env.example .env
# Edit .env with your JWT_SECRET and CORS_ORIGINS

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f api
```

## Production (VPS / Cloud)

```bash
npm run build
NODE_ENV=production node dist/server.js
```

Use PM2 for process management:
```bash
npm install -g pm2
pm2 start dist/server.js --name cifertrooper-api
pm2 save
pm2 startup
```

## API Docs
Swagger UI available at: `http://localhost:5000/api/docs`

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| PORT | Server port | 5000 |
| MONGO_URI | MongoDB connection string | localhost/cifertrooper |
| JWT_SECRET | JWT signing secret | (required) |
| JWT_EXPIRES_IN | Token expiry | 7d |
| CORS_ORIGINS | Comma-separated allowed origins | http://localhost:3000 |
| RATE_LIMIT_MAX | Max requests per window | 100 |
| RATE_LIMIT_WINDOW_MS | Rate limit window in ms | 900000 (15min) |
