# PlantCare Railway Deployment Guide

## Railway Deployment Instructions

### 1. Push your code to GitHub
```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### 2. Configure Railway Environment Variables
In your Railway dashboard, add these environment variables:
- `MONGODB_URI` = (your MongoDB connection string from Railway)
- `NODE_ENV` = production
- `NEXT_TELEMETRY_DISABLED` = 1

### 3. Deploy from GitHub
1. Connect your GitHub repository to Railway
2. Railway will automatically detect the Dockerfile
3. The deployment will use the Node.js 18 runtime

### 4. Troubleshooting Common Issues

#### Build Fails
- Check that all environment variables are set
- Verify MongoDB connection string format
- Ensure Node.js version compatibility

#### Runtime Errors  
- Check Railway logs for specific error messages
- Verify MongoDB service is running
- Test API endpoints locally first

### 5. Local Testing Before Deploy
```bash
# Install dependencies
yarn install

# Build the project
yarn build

# Start production mode
yarn start
```

## Alternative: Deploy without Docker

Railway also supports automatic builds without Docker:
1. Remove the Dockerfile
2. Railway will use Nixpacks to auto-detect and build
3. Make sure package.json has proper build scripts

## Environment Variables Required:
- MONGODB_URI (provided by Railway MongoDB service)
