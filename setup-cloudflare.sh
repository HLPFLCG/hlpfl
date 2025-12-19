#!/bin/bash

# HLPFL Cloudflare Setup Script
# This script helps automate the Cloudflare setup process

set -e  # Exit on error

echo "🚀 HLPFL Cloudflare Setup Script"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo -e "${RED}❌ Wrangler CLI is not installed${NC}"
    echo "Install it with: npm install -g wrangler"
    exit 1
fi

echo -e "${GREEN}✅ Wrangler CLI is installed${NC}"
echo ""

# Check if user is logged in
if ! wrangler whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  You are not logged in to Cloudflare${NC}"
    echo "Running: wrangler login"
    wrangler login
fi

echo -e "${GREEN}✅ Logged in to Cloudflare${NC}"
echo ""

# Get account ID
echo "📋 Getting your Cloudflare Account ID..."
ACCOUNT_ID=$(wrangler whoami | grep "Account ID" | awk '{print $3}')
echo -e "${GREEN}Account ID: $ACCOUNT_ID${NC}"
echo ""

# Ask user if they want to proceed
read -p "Do you want to create Cloudflare resources? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Setup cancelled."
    exit 0
fi

echo ""
echo "🗄️  Creating D1 Databases..."
echo "=============================="

# Create production database
echo "Creating production database..."
PROD_DB_OUTPUT=$(wrangler d1 create hlpfl-space-db 2>&1)
PROD_DB_ID=$(echo "$PROD_DB_OUTPUT" | grep "database_id" | awk -F'"' '{print $2}')
echo -e "${GREEN}✅ Production DB created: $PROD_DB_ID${NC}"

# Create dev database
echo "Creating development database..."
DEV_DB_OUTPUT=$(wrangler d1 create hlpfl-space-db-dev 2>&1)
DEV_DB_ID=$(echo "$DEV_DB_OUTPUT" | grep "database_id" | awk -F'"' '{print $2}')
echo -e "${GREEN}✅ Development DB created: $DEV_DB_ID${NC}"

# Create staging database
echo "Creating staging database..."
STAGING_DB_OUTPUT=$(wrangler d1 create hlpfl-space-db-staging 2>&1)
STAGING_DB_ID=$(echo "$STAGING_DB_OUTPUT" | grep "database_id" | awk -F'"' '{print $2}')
echo -e "${GREEN}✅ Staging DB created: $STAGING_DB_ID${NC}"

echo ""
echo "📦 Creating R2 Buckets..."
echo "=========================="

# Create R2 buckets
wrangler r2 bucket create hlpfl-space-media
echo -e "${GREEN}✅ Production bucket created${NC}"

wrangler r2 bucket create hlpfl-space-media-dev
echo -e "${GREEN}✅ Development bucket created${NC}"

wrangler r2 bucket create hlpfl-space-media-staging
echo -e "${GREEN}✅ Staging bucket created${NC}"

echo ""
echo "🔑 Creating KV Namespaces..."
echo "============================="

# Create Rate Limit KV namespaces
echo "Creating Rate Limit KV namespaces..."
RATE_LIMIT_PROD=$(wrangler kv:namespace create RATE_LIMIT 2>&1 | grep "id =" | awk -F'"' '{print $2}')
echo -e "${GREEN}✅ Production Rate Limit KV: $RATE_LIMIT_PROD${NC}"

RATE_LIMIT_DEV=$(wrangler kv:namespace create RATE_LIMIT --preview 2>&1 | grep "id =" | awk -F'"' '{print $2}')
echo -e "${GREEN}✅ Development Rate Limit KV: $RATE_LIMIT_DEV${NC}"

RATE_LIMIT_STAGING=$(wrangler kv:namespace create RATE_LIMIT --env staging 2>&1 | grep "id =" | awk -F'"' '{print $2}')
echo -e "${GREEN}✅ Staging Rate Limit KV: $RATE_LIMIT_STAGING${NC}"

# Create Sessions KV namespaces
echo "Creating Sessions KV namespaces..."
SESSIONS_PROD=$(wrangler kv:namespace create SESSIONS 2>&1 | grep "id =" | awk -F'"' '{print $2}')
echo -e "${GREEN}✅ Production Sessions KV: $SESSIONS_PROD${NC}"

SESSIONS_DEV=$(wrangler kv:namespace create SESSIONS --preview 2>&1 | grep "id =" | awk -F'"' '{print $2}')
echo -e "${GREEN}✅ Development Sessions KV: $SESSIONS_DEV${NC}"

SESSIONS_STAGING=$(wrangler kv:namespace create SESSIONS --env staging 2>&1 | grep "id =" | awk -F'"' '{print $2}')
echo -e "${GREEN}✅ Staging Sessions KV: $SESSIONS_STAGING${NC}"

echo ""
echo "📝 Summary of Created Resources"
echo "================================"
echo ""
echo "Account ID: $ACCOUNT_ID"
echo ""
echo "D1 Databases:"
echo "  Production: $PROD_DB_ID"
echo "  Development: $DEV_DB_ID"
echo "  Staging: $STAGING_DB_ID"
echo ""
echo "R2 Buckets:"
echo "  Production: hlpfl-space-media"
echo "  Development: hlpfl-space-media-dev"
echo "  Staging: hlpfl-space-media-staging"
echo ""
echo "KV Namespaces (Rate Limit):"
echo "  Production: $RATE_LIMIT_PROD"
echo "  Development: $RATE_LIMIT_DEV"
echo "  Staging: $RATE_LIMIT_STAGING"
echo ""
echo "KV Namespaces (Sessions):"
echo "  Production: $SESSIONS_PROD"
echo "  Development: $SESSIONS_DEV"
echo "  Staging: $SESSIONS_STAGING"
echo ""

# Save to file
cat > cloudflare-resources.txt << EOF
HLPFL Cloudflare Resources
==========================
Created: $(date)

Account ID: $ACCOUNT_ID

D1 Databases:
  Production: $PROD_DB_ID
  Development: $DEV_DB_ID
  Staging: $STAGING_DB_ID

R2 Buckets:
  Production: hlpfl-space-media
  Development: hlpfl-space-media-dev
  Staging: hlpfl-space-media-staging

KV Namespaces (Rate Limit):
  Production: $RATE_LIMIT_PROD
  Development: $RATE_LIMIT_DEV
  Staging: $RATE_LIMIT_STAGING

KV Namespaces (Sessions):
  Production: $SESSIONS_PROD
  Development: $SESSIONS_DEV
  Staging: $SESSIONS_STAGING
EOF

echo -e "${GREEN}✅ Resource IDs saved to cloudflare-resources.txt${NC}"
echo ""

# Update wrangler.toml
echo "⚙️  Updating wrangler.toml..."
sed -i.bak "s/YOUR_ACCOUNT_ID/$ACCOUNT_ID/g" wrangler.toml
sed -i.bak "s/YOUR_PRODUCTION_DATABASE_ID_HERE/$PROD_DB_ID/g" wrangler.toml
sed -i.bak "s/YOUR_DEV_DATABASE_ID_HERE/$DEV_DB_ID/g" wrangler.toml
sed -i.bak "s/YOUR_STAGING_DATABASE_ID_HERE/$STAGING_DB_ID/g" wrangler.toml
sed -i.bak "s/YOUR_RATE_LIMIT_KV_ID_HERE/$RATE_LIMIT_PROD/g" wrangler.toml
sed -i.bak "s/YOUR_SESSIONS_KV_ID_HERE/$SESSIONS_PROD/g" wrangler.toml
sed -i.bak "s/YOUR_DEV_RATE_LIMIT_KV_ID_HERE/$RATE_LIMIT_DEV/g" wrangler.toml
sed -i.bak "s/YOUR_DEV_SESSIONS_KV_ID_HERE/$SESSIONS_DEV/g" wrangler.toml
sed -i.bak "s/YOUR_STAGING_RATE_LIMIT_KV_ID_HERE/$RATE_LIMIT_STAGING/g" wrangler.toml
sed -i.bak "s/YOUR_STAGING_SESSIONS_KV_ID_HERE/$SESSIONS_STAGING/g" wrangler.toml

echo -e "${GREEN}✅ wrangler.toml updated${NC}"
echo ""

# Run database migrations
echo "🗃️  Running database migrations..."
echo "===================================="

echo "Running production migration..."
wrangler d1 execute hlpfl-space-db --file=./migrations/0001_initial_schema.sql
echo -e "${GREEN}✅ Production database initialized${NC}"

echo "Running development migration..."
wrangler d1 execute hlpfl-space-db-dev --file=./migrations/0001_initial_schema.sql --env development
echo -e "${GREEN}✅ Development database initialized${NC}"

echo "Running staging migration..."
wrangler d1 execute hlpfl-space-db-staging --file=./migrations/0001_initial_schema.sql --env staging
echo -e "${GREEN}✅ Staging database initialized${NC}"

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "1. Set your secrets with: wrangler secret put SECRET_NAME"
echo "2. Deploy backend with: wrangler deploy"
echo "3. Deploy frontend with: cd frontend && npm run build && npx wrangler pages deploy .next --project-name hlpfl-frontend"
echo ""
echo "See CLOUDFLARE_SETUP_GUIDE.md for detailed instructions."
echo ""