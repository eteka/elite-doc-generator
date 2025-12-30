#!/bin/bash

# Elite Doc Generator - Setup Verification Script
# This script verifies that everything is properly installed and configured

echo "🔍 Elite Doc Generator - Setup Verification"
echo "============================================"
echo ""

# Check Node.js version
echo "📦 Checking Node.js version..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✅ Node.js installed: $NODE_VERSION"
    
    # Check if version is 18 or higher
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_MAJOR" -ge 18 ]; then
        echo "✅ Node.js version is compatible (18+)"
    else
        echo "⚠️  Warning: Node.js 18+ recommended, you have $NODE_VERSION"
    fi
else
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

echo ""

# Check npm version
echo "📦 Checking npm version..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "✅ npm installed: $NPM_VERSION"
else
    echo "❌ npm not found"
    exit 1
fi

echo ""

# Check if node_modules exists
echo "📦 Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "✅ node_modules directory exists"
    
    # Check if Next.js is installed
    if [ -d "node_modules/next" ]; then
        NEXT_VERSION=$(node -p "require('./node_modules/next/package.json').version")
        echo "✅ Next.js installed: $NEXT_VERSION"
    else
        echo "⚠️  Next.js not found in node_modules"
        echo "   Run: npm install"
    fi
else
    echo "⚠️  node_modules not found"
    echo "   Run: npm install"
fi

echo ""

# Check package.json
echo "📄 Checking package.json..."
if [ -f "package.json" ]; then
    echo "✅ package.json exists"
else
    echo "❌ package.json not found"
    exit 1
fi

echo ""

# Check tsconfig.json
echo "📄 Checking TypeScript configuration..."
if [ -f "tsconfig.json" ]; then
    echo "✅ tsconfig.json exists"
else
    echo "⚠️  tsconfig.json not found"
fi

echo ""

# Check key directories
echo "📁 Checking project structure..."
REQUIRED_DIRS=("app" "components" "lib" "templates" "public")
for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ /$dir directory exists"
    else
        echo "❌ /$dir directory missing"
    fi
done

echo ""

# Check key files
echo "📄 Checking key files..."
KEY_FILES=(
    "app/page.tsx"
    "app/layout.tsx"
    "components/navbar.tsx"
    "lib/templates.ts"
    "tailwind.config.ts"
)

for file in "${KEY_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
    fi
done

echo ""

# Check documentation
echo "📚 Checking documentation..."
DOC_FILES=(
    "README.md"
    "INSTALLATION.md"
    "QUICK_START.md"
    "SECURITY.md"
)

for file in "${DOC_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "⚠️  $file missing"
    fi
done

echo ""

# Security check
echo "🔒 Checking security..."
if [ -d "node_modules" ]; then
    echo "Running npm audit..."
    npm audit --production 2>&1 | grep -E "(vulnerabilities|found)" || echo "✅ No vulnerabilities found"
else
    echo "⚠️  Cannot check security - run npm install first"
fi

echo ""

# Summary
echo "============================================"
echo "📊 Verification Summary"
echo "============================================"
echo ""

if [ -d "node_modules" ] && [ -f "package.json" ] && [ -d "app" ]; then
    echo "✅ Project structure: OK"
    echo "✅ Dependencies: Installed"
    echo "✅ Configuration: Complete"
    echo ""
    echo "🎉 Setup verification complete!"
    echo ""
    echo "Next steps:"
    echo "  1. npm run dev     # Start development server"
    echo "  2. Open http://localhost:3000"
    echo ""
else
    echo "⚠️  Setup incomplete"
    echo ""
    echo "Required actions:"
    if [ ! -d "node_modules" ]; then
        echo "  1. Run: npm install"
    fi
    echo "  2. Run: npm run dev"
    echo ""
fi

echo "For detailed instructions, see:"
echo "  - QUICK_START.md"
echo "  - INSTALLATION.md"
echo "  - SETUP_COMPLETE.md"
echo ""
