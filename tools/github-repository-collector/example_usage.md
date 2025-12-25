# GitHub Repository Collector - Example Usage

This document provides practical examples of how to use the GitHub Repository Collector for different scenarios.

## Table of Contents

1. [Basic Usage](#basic-usage)
2. [Advanced Scenarios](#advanced-scenarios)
3. [Configuration Examples](#configuration-examples)
4. [Automation Examples](#automation-examples)
5. [Troubleshooting Examples](#troubleshooting-examples)

## Basic Usage

### Example 1: Collect Your Personal Repositories

```bash
# Simple collection from your personal repositories
python github_collector.py --username yourusername

# With authentication for higher rate limits
python github_collector.py --username yourusername --token ghp_your_token_here

# Custom output directory
python github_collector.py --username yourusername --output my_code_collection
```

### Example 2: Collect from an Organization

```bash
# Collect all repositories from an organization
python github_collector.py --organization mycompany

# With token (recommended for organizations)
export GITHUB_TOKEN="ghp_your_token_here"
python github_collector.py --organization mycompany --token $GITHUB_TOKEN

# Include private repositories
python github_collector.py --organization mycompany --token $GITHUB_TOKEN --output company_repos
```

### Example 3: Quick Start Wizard

```bash
# Run the interactive setup wizard
python quick_start.py

# This will guide you through:
# 1. Setting up GitHub authentication
# 2. Choosing target repositories
# 3. Configuring filters
# 4. Running the collection
```

## Advanced Scenarios

### Example 4: Academic Research Collection

```yaml
# config_academic_research.yaml
github:
  token: "ghp_your_research_token"
  username: "research-username"

collection:
  include_forks: false
  include_archived: true  # Include historical data
  include_private: false
  
  file_filters:
    max_file_size_mb: 100  # Larger limit for datasets
    exclude_extensions:
      - ".exe"
      - ".dll"
      - ".so"
      # Keep more file types for research
    exclude_directories:
      - "node_modules"
      - ".git"
      - "__pycache__"
    exclude_patterns:
      - "*.log"
      - "*.tmp"

output:
  base_directory: "research_code_corpus"
  structure: "by_type"  # Organize by file type for analysis
  naming: "repo_prefix"
  create_metadata: true
  create_index: true

advanced:
  rate_limit: 20  # Be more conservative
  verbose: true
```

```bash
# Run with academic research config
python github_collector.py --config config_academic_research.yaml
```

### Example 5: Company Backup Strategy

```yaml
# config_company_backup.yaml
github:
  token: "ghp_company_backup_token"
  organization: "my-company"

collection:
  include_forks: false
  include_archived: true  # Backup everything
  include_private: true
  
  file_filters:
    max_file_size_mb: 200  # Larger limit for backups
    exclude_extensions:
      - ".exe"
      - ".dll"
      - ".so"
      - ".dylib"
    exclude_directories:
      - "node_modules"
      - ".git"
    exclude_patterns:
      - "*.log"
      - "*.tmp"

output:
  base_directory: "/backups/github/$(date +%Y-%m-%d)"
  structure: "by_owner"  # Maintain org structure
  naming: "preserve"
  create_metadata: true
  create_index: true

advanced:
  rate_limit: 45  # Maximum rate for backup
  max_workers: 6  # Parallel downloads for backup
  verbose: true
```

```bash
# Run company backup
python github_collector.py --config config_company_backup.yaml
```

### Example 6: Open Source Contribution Analysis

```yaml
# config_os_analysis.yaml
github:
  token: "ghp_analysis_token"
  username: "your-github-username"

collection:
  include_forks: true  # Include forks for contribution tracking
  include_archived: false
  include_private: false
  
  file_filters:
    max_file_size_mb: 10  # Focus on code, not large assets
    exclude_extensions:
      - ".exe"
      - ".dll"
      - ".so"
      - ".dylib"
      - ".zip"
      - ".tar"
      - ".gz"
      - ".png"
      - ".jpg"
      - ".gif"  # Focus on source code only
    exclude_directories:
      - "node_modules"
      - ".git"
      - "dist"
      - "build"
      - "assets"
      - "images"
    exclude_patterns:
      - "*.min.js"
      - "*.min.css"

output:
  base_directory: "oss_contribution_analysis"
  structure: "by_type"  # Group by programming language
  naming: "repo_prefix"
  create_metadata: true
  create_index: true

advanced:
  rate_limit: 30
  verbose: true
```

```bash
# Analyze open source contributions
python github_collector.py --config config_os_analysis.yaml
```

## Configuration Examples

### Example 7: Minimal Configuration

```yaml
# config_minimal.yaml
github:
  username: "your-username"
  token: ""

collection:
  include_forks: false
  include_archived: false
  include_private: false

output:
  base_directory: "minimal_collection"
  structure: "by_repo"

advanced:
  rate_limit: 30
```

### Example 8: Maximum Collection (Archive Everything)

```yaml
# config_archive_all.yaml
github:
  token: "ghp_your_token"
  username: "your-username"

collection:
  include_forks: true  # Include everything
  include_archived: true
  include_private: true
  
  file_filters:
    max_file_size_mb: 500  # Very large limit
    exclude_extensions: []  # Don't exclude anything
    exclude_directories: [".git"]  # Only exclude git metadata
    exclude_patterns: []

output:
  base_directory: "complete_archive"
  structure: "by_owner"
  naming: "preserve"
  create_metadata: true
  create_index: true

advanced:
  rate_limit: 60  # Maximum rate
  max_workers: 8  # Maximum parallel downloads
  verbose: true
```

### Example 9: Specific File Types Only

```yaml
# config_source_only.yaml
github:
  token: "ghp_your_token"
  organization: "my-org"

collection:
  include_forks: false
  include_archived: false
  include_private: true
  
  file_filters:
    max_file_size_mb: 5
    exclude_extensions:
      - ".png"
      - ".jpg"
      - ".gif"
      - ".svg"
      - ".pdf"
      - ".doc"
      - ".docx"
      - ".zip"
      - ".tar"
      - ".gz"
      - ".exe"
      - ".dll"
      - ".so"
      - ".dylib"
    exclude_directories:
      - "node_modules"
      - ".git"
      - "dist"
      - "build"
      - "assets"
      - "images"
      - "docs"
    exclude_patterns:
      - "*.min.*"
      - "*.bundle.*"

output:
  base_directory: "source_code_only"
  structure: "by_type"
  naming: "preserve"
  create_metadata: true
  create_index: true

advanced:
  rate_limit: 30
  verbose: false
```

## Automation Examples

### Example 10: Daily Backup Script

```bash
#!/bin/bash
# daily_backup.sh

# Set variables
DATE=$(date +%Y-%m-%d)
BACKUP_DIR="/backups/github/$DATE"
CONFIG_FILE="/path/to/config_backup.yaml"
LOG_FILE="/var/log/github_backup_$DATE.log"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Run backup
python3 /path/to/github_collector.py \
    --config "$CONFIG_FILE" \
    --output "$BACKUP_DIR" \
    --verbose > "$LOG_FILE" 2>&1

# Check if backup was successful
if [ $? -eq 0 ]; then
    echo "Backup completed successfully: $BACKUP_DIR"
    # Send success notification
    curl -X POST -H 'Content-type: application/json' \
        --data '{"text":"GitHub backup completed successfully"}' \
        YOUR_SLACK_WEBHOOK_URL
else
    echo "Backup failed. Check log: $LOG_FILE"
    # Send failure notification
    curl -X POST -H 'Content-type: application/json' \
        --data "{&quot;text&quot;:&quot;GitHub backup failed. Check log: $LOG_FILE&quot;}" \
        YOUR_SLACK_WEBHOOK_URL
fi
```

### Example 11: Python Automation Script

```python
#!/usr/bin/env python3
# automated_collection.py

import os
import yaml
import json
from datetime import datetime, timedelta
from github_collector import GitHubCollector

def collect_multiple_users():
    """Collect from multiple users automatically"""
    
    # List of users to collect from
    users = [
        {"username": "user1", "token": "token1"},
        {"username": "user2", "token": "token2"},
        {"organization": "org1", "token": "token3"}
    ]
    
    base_output_dir = f"automated_collection_{datetime.now().strftime('%Y%m%d')}"
    
    for user_config in users:
        print(f"Collecting from {user_config.get('username') or user_config.get('organization')}...")
        
        # Create config for this user
        config = {
            "github": user_config,
            "collection": {
                "include_forks": False,
                "include_archived": False,
                "include_private": True,
                "file_filters": {
                    "max_file_size_mb": 50,
                    "exclude_extensions": [".exe", ".dll", ".so", ".dylib"],
                    "exclude_directories": ["node_modules", ".git", "__pycache__"],
                    "exclude_patterns": ["*.log", "*.tmp"]
                }
            },
            "output": {
                "base_directory": f"{base_output_dir}/{user_config.get('username') or user_config.get('organization')}",
                "structure": "by_repo",
                "naming": "preserve",
                "create_metadata": True,
                "create_index": True
            },
            "advanced": {
                "rate_limit": 30,
                "verbose": False
            }
        }
        
        # Save temporary config
        temp_config = f"temp_config_{user_config.get('username') or user_config.get('organization')}.yaml"
        with open(temp_config, 'w') as f:
            yaml.dump(config, f)
        
        try:
            # Run collector
            collector = GitHubCollector(temp_config)
            if collector.authenticate():
                collector.collect_repositories()
                collector.create_metadata_files()
                print(f"✓ Completed collection for {user_config.get('username') or user_config.get('organization')}")
            else:
                print(f"✗ Failed to authenticate for {user_config.get('username') or user_config.get('organization')}")
        except Exception as e:
            print(f"✗ Error collecting from {user_config.get('username') or user_config.get('organization')}: {e}")
        finally:
            # Clean up temp config
            if os.path.exists(temp_config):
                os.remove(temp_config)

def generate_collection_report():
    """Generate a summary report of all collections"""
    report = {
        "generated_at": datetime.now().isoformat(),
        "collections": []
    }
    
    # Find all collection directories
    for item in os.listdir("."):
        if item.startswith("automated_collection_"):
            collection_info = {
                "directory": item,
                "timestamp": item.replace("automated_collection_", ""),
                "summary": {}
            }
            
            # Look for metadata files
            for root, dirs, files in os.walk(item):
                if "collection_metadata.json" in files:
                    with open(os.path.join(root, "collection_metadata.json"), 'r') as f:
                        metadata = json.load(f)
                        collection_info["summary"] = metadata.get("summary", {})
                    break
            
            report["collections"].append(collection_info)
    
    # Save report
    with open(f"collection_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json", 'w') as f:
        json.dump(report, f, indent=2)
    
    print(f"Report generated: collection_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json")

if __name__ == "__main__":
    collect_multiple_users()
    generate_collection_report()
```

## Troubleshooting Examples

### Example 12: Debugging Configuration Issues

```bash
# Test configuration without downloading
python -c "
import yaml
from github_collector import GitHubCollector

# Load and validate config
collector = GitHubCollector('config.yaml')
print('Configuration loaded successfully')
print(f'GitHub username: {collector.config[&quot;github&quot;][&quot;username&quot;]}')
print(f'Organization: {collector.config[&quot;github&quot;][&quot;organization&quot;]}')
print(f'Output directory: {collector.config[&quot;output&quot;][&quot;base_directory&quot;]}')

# Test authentication
if collector.authenticate():
    print('✓ Authentication successful')
    repos = collector.get_repositories()
    print(f'Found {len(repos)} repositories')
else:
    print('✗ Authentication failed')
"
```

### Example 13: Rate Limit Recovery

```bash
#!/bin/bash
# recovery_script.sh

echo "Checking GitHub rate limits..."

# Check current rate limit
curl -H "Authorization: token YOUR_TOKEN" \
     https://api.github.com/rate_limit

echo ""
echo "Waiting for rate limit reset..."

# Wait for rate limit to reset (approximately 1 hour)
echo "Sleeping for 3600 seconds..."
sleep 3600

echo "Retrying collection..."
python github_collector.py --config your_config.yaml
```

### Example 14: Partial Collection Recovery

```python
#!/usr/bin/env python3
# recovery_collection.py

import os
import json
from github_collector import GitHubCollector

def resume_collection():
    """Resume collection from where it left off"""
    
    # Load previous metadata if exists
    metadata_file = "collected_repos/collection_metadata.json"
    collected_repos = set()
    
    if os.path.exists(metadata_file):
        with open(metadata_file, 'r') as f:
            metadata = json.load(f)
            collected_repos = set(metadata.get("repositories", {}).keys())
    
    print(f"Previously collected repositories: {collected_repos}")
    
    # Initialize collector
    collector = GitHubCollector("config.yaml")
    collector.authenticate()
    
    # Get all repositories
    all_repos = collector.get_repositories()
    
    # Filter out already collected repos
    remaining_repos = [repo for repo in all_repos if repo.name not in collected_repos]
    
    print(f"Remaining repositories to collect: {len(remaining_repos)}")
    
    # Collect remaining repositories
    for repo in remaining_repos:
        print(f"Collecting {repo.name}...")
        files = collector.get_repository_files(repo)
        
        for file_info in files:
            collector.download_file(file_info)
    
    collector.create_metadata_files()
    print("Collection resumed and completed!")

if __name__ == "__main__":
    resume_collection()
```

These examples should help you get started with various use cases for the GitHub Repository Collector. Adjust the configurations according to your specific needs and constraints.