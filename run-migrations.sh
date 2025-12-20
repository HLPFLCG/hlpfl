#!/bin/bash

echo "🚀 Running database migrations for all environments..."
echo ""

# Production database
echo "📦 Migrating Production database..."
wrangler d1 execute hlpfl-space-db --remote --file=./migrations/0001_initial_schema.sql
if [ $? -eq 0 ]; then
    echo "✅ Production migration completed successfully!"
else
    echo "❌ Production migration failed!"
    exit 1
fi
echo ""

# Development database
echo "📦 Migrating Development database..."
wrangler d1 execute hlpfl-space-db-dev --remote --file=./migrations/0001_initial_schema.sql --env development
if [ $? -eq 0 ]; then
    echo "✅ Development migration completed successfully!"
else
    echo "❌ Development migration failed!"
    exit 1
fi
echo ""

# Staging database
echo "📦 Migrating Staging database..."
wrangler d1 execute hlpfl-space-db-staging --remote --file=./migrations/0001_initial_schema.sql --env staging
if [ $? -eq 0 ]; then
    echo "✅ Staging migration completed successfully!"
else
    echo "❌ Staging migration failed!"
    exit 1
fi
echo ""

echo "✅ All migrations completed successfully!"
echo ""
echo "Next steps:"
echo "1. Set JWT secret: wrangler secret put JWT_SECRET"
echo "2. Deploy backend: wrangler deploy"
echo "3. Deploy frontend: cd frontend && npm run build && npx wrangler pages deploy .next --project-name hlpfl-frontend"