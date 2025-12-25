#!/bin/bash

# Simple script to collect HLPFLCG repositories using git clone

REPOS=(
    "HLPFLCG/hlpflrecords"
    "HLPFLCG/alki.info"
    "HLPFLCG/hlpflforms"
    "HLPFLCG/socialmediamanager"
    "HLPFLCG/linkinbio"
    "HLPFLCG/whitelabellinkinbio"
    "HLPFLCG/chatbot-blank"
    "HLPFLCG/googletagmanager"
)

OUTPUT_DIR="hlpflcg_collection"
mkdir -p "$OUTPUT_DIR"
cd "$OUTPUT_DIR"

echo "Starting collection of HLPFLCG repositories..."
echo "=============================================="

for repo in "${REPOS[@]}"; do
    echo "Cloning $repo..."
    
    if git clone "https://github.com/$repo.git"; then
        echo "✅ Successfully cloned $repo"
        
        # Clean up each repository
        repo_name=$(basename "$repo")
        cd "$repo_name"
        
        echo "  Cleaning up $repo_name..."
        
        # Remove git history to save space
        rm -rf .git
        
        # Remove common large directories
        rm -rf node_modules
        rm -rf .next
        rm -rf .vercel
        rm -rf dist
        rm -rf build
        rm -rf .cache
        rm -rf __pycache__
        rm -rf .pytest_cache
        rm -rf coverage
        rm -rf .turbo
        rm -rf .wrangler
        
        # Remove lock files (can be regenerated)
        rm -f package-lock.json
        rm -f yarn.lock
        rm -f pnpm-lock.yaml
        
        # Remove log files
        find . -name "*.log" -delete
        find . -name "*.tmp" -delete
        find . -name "*.cache" -delete
        find . -name "*.swp" -delete
        find . -name ".DS_Store" -delete
        find . -name "Thumbs.db" -delete
        find . -name "*.map" -delete
        
        cd ..
        echo "  ✅ Cleaned up $repo_name"
        
    else
        echo "❌ Failed to clone $repo"
    fi
    
    echo ""
done

echo "=============================================="
echo "Collection complete!"
echo "Repositories collected in: $(pwd)"

# Create a summary
echo "Creating collection summary..."
cat > README.md << EOF
# HLPFLCG Repository Collection

This directory contains a collection of all HLPFLCG GitHub repositories.

## Repositories Collected:

EOF

for repo in "${REPOS[@]}"; do
    repo_name=$(basename "$repo")
    if [ -d "$repo_name" ]; then
        echo "- **$repo_name** - https://github.com/$repo" >> README.md
        if [ -f "$repo_name/README.md" ]; then
            echo "  - Contains README.md" >> README.md
        fi
        echo "" >> README.md
    fi
done

echo "Collection summary created in README.md"
echo ""
echo "Total repositories: ${#REPOS[@]}"
echo "Collection completed at: $(date)"