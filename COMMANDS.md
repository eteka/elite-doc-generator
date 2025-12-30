# Command Reference

Quick reference for all npm commands and common tasks.

## 📦 Installation

```bash
# Install all dependencies
npm install

# Clean install (removes node_modules first)
rm -rf node_modules package-lock.json
npm install

# Install specific package
npm install <package-name>

# Install dev dependency
npm install -D <package-name>
```

## 🚀 Development

```bash
# Start development server (default port 3000)
npm run dev

# Start on different port
npm run dev -- -p 3001

# Start with turbo mode
npm run dev --turbo
```

## 🏗️ Build

```bash
# Build for production
npm run build

# Build and analyze bundle
npm run build -- --analyze

# Clean build cache
rm -rf .next
npm run build
```

## ▶️ Production

```bash
# Start production server
npm start

# Start on different port
npm start -- -p 3001
```

## 🧹 Linting

```bash
# Run ESLint
npm run lint

# Fix ESLint errors automatically
npm run lint -- --fix

# Check specific files
npm run lint -- src/**/*.ts
```

## 🧪 Testing (Future)

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- path/to/test.ts
```

## 📊 Type Checking

```bash
# Check TypeScript types
npx tsc --noEmit

# Watch mode for type checking
npx tsc --noEmit --watch
```

## 🎨 Formatting (if Prettier is added)

```bash
# Format all files
npx prettier --write .

# Check formatting
npx prettier --check .

# Format specific files
npx prettier --write "src/**/*.{ts,tsx}"
```

## 📦 Package Management

```bash
# Update all packages to latest
npm update

# Check for outdated packages
npm outdated

# Update specific package
npm update <package-name>

# Remove unused packages
npm prune

# List installed packages
npm list

# List top-level packages only
npm list --depth=0
```

## 🔍 Debugging

```bash
# Start with Node debugger
node --inspect node_modules/.bin/next dev

# Start with verbose logging
DEBUG=* npm run dev

# Check Next.js info
npx next info
```

## 🧰 Utilities

```bash
# Generate Next.js types
npx next build

# Clear Next.js cache
rm -rf .next

# Clear all caches
rm -rf .next node_modules/.cache

# Check bundle size
npx @next/bundle-analyzer
```

## 📝 Code Generation (Custom Scripts)

```bash
# Generate new component (if script exists)
npm run generate:component ComponentName

# Generate new page (if script exists)
npm run generate:page page-name

# Generate new template (if script exists)
npm run generate:template template-name
```

## 🔧 Maintenance

```bash
# Audit dependencies for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Force fix (may break things)
npm audit fix --force

# Check for security issues
npm audit --production
```

## 📊 Performance Analysis

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer

# Check lighthouse scores
npx lighthouse http://localhost:3000

# Profile build performance
npm run build -- --profile
```

## 🌐 Environment Variables

```bash
# Load environment variables
# Create .env.local file first

# Development
npm run dev
# Automatically loads .env.local

# Production
npm run build
npm start
# Loads .env.production
```

## 🐳 Docker (if Dockerfile exists)

```bash
# Build Docker image
docker build -t elite-doc-generator .

# Run Docker container
docker run -p 3000:3000 elite-doc-generator

# Docker Compose
docker-compose up
docker-compose down
```

## 🚀 Deployment

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy to Netlify
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Custom Server
```bash
# Build
npm run build

# Start with PM2
pm2 start npm --name "elite-doc-generator" -- start

# Stop
pm2 stop elite-doc-generator

# Restart
pm2 restart elite-doc-generator
```

## 🔄 Git Workflow

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Your message"

# Push to remote
git push origin main

# Create new branch
git checkout -b feature/new-feature

# Merge branch
git checkout main
git merge feature/new-feature
```

## 📚 Documentation

```bash
# Generate TypeDoc (if configured)
npx typedoc

# Generate JSDoc (if configured)
npx jsdoc

# Serve documentation locally
npx serve docs
```

## 🎯 Quick Start Commands

```bash
# Complete setup from scratch
npm install
npm run dev

# Fresh start (clean everything)
rm -rf node_modules .next package-lock.json
npm install
npm run dev

# Production build and start
npm run build
npm start

# Check everything is working
npm run lint
npm run build
npm start
```

## 🆘 Troubleshooting Commands

```bash
# Clear all caches
rm -rf .next node_modules/.cache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for port conflicts
lsof -i :3000
kill -9 <PID>

# Check Node version
node --version

# Check npm version
npm --version

# Verify Next.js installation
npx next --version
```

## 📱 Mobile Development

```bash
# Test on local network
npm run dev -- -H 0.0.0.0

# Access from mobile device
# Use your computer's IP address
# Example: http://192.168.1.100:3000
```

## 🔐 Security

```bash
# Check for vulnerabilities
npm audit

# Update vulnerable packages
npm audit fix

# Check package licenses
npx license-checker

# Scan for secrets
npx secretlint "**/*"
```

## 📊 Monitoring

```bash
# Monitor build size
npm run build
du -sh .next

# Monitor memory usage
node --max-old-space-size=4096 node_modules/.bin/next build

# Profile performance
npm run build -- --profile
```

## 🎨 Styling

```bash
# Generate Tailwind config
npx tailwindcss init -p

# Build Tailwind CSS
npx tailwindcss -i ./app/globals.css -o ./dist/output.css

# Watch Tailwind changes
npx tailwindcss -i ./app/globals.css -o ./dist/output.css --watch
```

## 🔧 Configuration

```bash
# Validate tsconfig.json
npx tsc --showConfig

# Validate package.json
npm pkg fix

# Check Next.js config
npx next info
```

## 📦 Export Commands

```bash
# Export static site (if configured)
npm run build
npm run export

# Serve exported site
npx serve out
```

## 🎯 Most Used Commands

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Lint
npm run lint

# Install
npm install

# Update
npm update
```

---

**Tip:** Add these to your shell aliases for faster access:
```bash
alias nrd="npm run dev"
alias nrb="npm run build"
alias nrs="npm start"
alias nrl="npm run lint"
```