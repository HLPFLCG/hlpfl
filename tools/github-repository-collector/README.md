# HLPFL GitHub Repository Collector

> **Comprehensive tool for collecting, analyzing, and managing HLPFL GitHub repositories**

## 🎯 Overview

This tool suite provides automated collection and analysis of all HLPFL GitHub repositories, enabling efficient backup, development environment setup, and codebase management.

## 🚀 Quick Start

### Option 1: Bash Script (Recommended)
```bash
# Make executable
chmod +x collect_hlpflcg_repos.sh

# Run collection
./collect_hlpflcg_repos.sh
```

### Option 2: Python Tool
```bash
# Install dependencies
pip install -r requirements.txt

# Run collector
python3 hlpflcg_collector.py --config config_hlpflcg_individual.yaml
```

## 📦 What's Included

### Repository Collection
- **8 Complete Repositories**: All HLPFL projects successfully collected
- **Total Size**: 159.8 MB (cleaned and optimized)
- **Code Files**: 335+ source files
- **Automated Cleanup**: Removed build artifacts, dependencies, and sensitive data

### Analysis Tools
- **Technology Stack Documentation**: Complete architecture overview
- **Repository Mapping**: How projects connect and interact
- **Performance Analysis**: Size, complexity, and dependency metrics

### Collected Repositories
| Repository | Size | Purpose |
|------------|------|---------|
| hlpflrecords | 117 MB | Main music platform |
| linkinbio | 29 MB | Link-in-bio management |
| alki.info | 8.9 MB | Content platform |
| hlpflforms | 1.3 MB | Forms system |
| socialmediamanager | 1.1 MB | Social media tools |
| chatbot-blank | 240 KB | Chatbot template |
| whitelabellinkinbio | 172 KB | White-label solution |
| googletagmanager | 124 KB | Analytics integration |

## 🛠️ Features

### Python Collector Features
- ✅ GitHub API integration with authentication
- ✅ Smart file filtering and organization
- ✅ Multiple output structures (flat, by_repo, by_type)
- ✅ Progress tracking and logging
- ✅ Metadata generation
- ✅ Error handling and retries
- ✅ Configurable filtering rules

### Bash Script Features
- ✅ Simple and reliable execution
- ✅ Automatic cleanup and optimization
- ✅ Progress reporting
- ✅ Collection summary generation
- ✅ No external dependencies required

## 📊 Usage Examples

### Basic Collection
```bash
# Collect all repositories
./collect_hlpflcg_repos.sh

# Output will be in hlpflcg_collection/
```

### Advanced Python Collection
```bash
# Use custom configuration
python3 hlpflcg_collector.py \
  --config config_hlpflcg_individual.yaml \
  --output my_collection \
  --verbose

# Quick setup wizard
python3 quick_start.py
```

### Configuration
```yaml
# config_hlpflcg_individual.yaml
github:
  repositories:
    - "HLPFLCG/hlpflrecords"
    - "HLPFLCG/alki.info"
    # ... more repositories

collection:
  file_filters:
    max_file_size_mb: 100
    exclude_extensions: [".exe", ".dll"]
    exclude_directories: ["node_modules", ".git"]

output:
  base_directory: "hlpflcg_collection"
  structure: "by_repo"
  create_metadata: true
```

## 🏗️ Technology Stack Analysis

### Core Platforms
1. **hlpflrecords** - Next.js 14, React, TypeScript
2. **hlpflforms** - Cloudflare Workers, serverless functions
3. **socialmediamanager** - Cloudflare Workers + frontend

### Infrastructure
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Cloudflare Workers, Hono v4
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 object storage
- **CDN**: Cloudflare global network

### Development Tools
- **Package Management**: npm, yarn
- **Testing**: Vitest, Jest
- **Build Tools**: Next.js, Webpack
- **Deployment**: Cloudflare Pages, Workers

## 📁 Collection Structure

```
hlpflcg_collection/
├── README.md                 # Collection overview
├── detailed_analysis.md      # Technical analysis
├── hlpflrecords/            # Main platform
├── linkinbio/               # Social tool
├── alki.info/               # Content site
├── hlpflforms/              # Forms platform
├── socialmediamanager/      # Management tool
├── chatbot-blank/           # Chatbot template
├── whitelabellinkinbio/     # White-label tool
└── googletagmanager/        # Analytics integration
```

## 🔧 Configuration Options

### File Filtering
- **Size Limits**: Exclude files over specified size
- **Extension Filters**: Remove binaries, executables
- **Directory Exclusions**: Skip node_modules, .git, build dirs
- **Pattern Matching**: Exclude files by name patterns

### Output Structures
- **flat**: All files in single directory
- **by_repo**: Organized by repository name
- **by_type**: Organized by file type
- **by_owner**: Organized by repository owner

## 📈 Analytics and Reporting

### Collection Metrics
- Total repositories collected
- Files processed and excluded
- Size before and after cleanup
- Collection duration

### Repository Analysis
- Technology stack identification
- Dependency analysis
- Complexity metrics
- Architecture documentation

## 🔄 Automated Scheduling

### Cron Job Setup
```bash
# Add to crontab for daily collection
0 2 * * * cd /path/to/hlpfl/tools/github-repository-collector && ./collect_hlpflcg_repos.sh
```

### GitHub Actions Integration
```yaml
# .github/workflows/collect-repos.yml
name: Collect Repositories
on:
  schedule:
    - cron: '0 2 * * *'
  workflow_dispatch:
jobs:
  collect:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Collector
        run: |
          cd tools/github-repository-collector
          ./collect_hlpflcg_repos.sh
```

## 🚀 Integration with HLPFL Platform

This repository collector integrates seamlessly with the HLPFL platform:

### Development Workflow
1. **Local Development**: Collect fresh copies for local setup
2. **Staging**: Use collected repos for staging environments
3. **Backup**: Automated backup of all repository code
4. **Analysis**: Monitor codebase growth and changes

### CI/CD Integration
- **Pre-deployment**: Collect and analyze before deployments
- **Testing**: Use collected code for integration tests
- **Documentation**: Auto-generate documentation from collected repos

## 🔍 Use Cases

### 1. Development Environment Setup
```bash
# Quickly set up local development environment
./collect_hlpflcg_repos.sh
cd hlpflcg_collection/hlpflrecords
npm install
npm run dev
```

### 2. Backup and Archival
```bash
# Create timestamped backups
./collect_hlpflcg_repos.sh
mv hlpflcg_collection "backup_$(date +%Y%m%d)"
```

### 3. Code Analysis
```bash
# Generate detailed analysis
python3 hlpflcg_collector.py --config config_hlpflcg_individual.yaml --verbose
```

### 4. Migration Planning
- Analyze dependencies between repositories
- Identify shared components
- Plan consolidation strategies

## 🛡️ Security Considerations

### Data Protection
- ✅ Removed git history and sensitive data
- ✅ Cleaned dependency caches
- ✅ No exposed credentials or secrets
- ✅ File size and type restrictions

### Access Control
- Use GitHub personal access tokens with appropriate scopes
- Implement rate limiting for API calls
- Secure storage of configuration files

## 📞 Support

### Documentation
- **[Configuration Guide](configuration.md)**: Detailed setup instructions
- **[API Reference](api-reference.md)**: GitHub API integration
- **[Troubleshooting](troubleshooting.md)**: Common issues and solutions

### Getting Help
- Check the collected repositories in `collected_repos/`
- Review collection logs in `collection.log`
- Consult the main HLPFL documentation

---

**Integrated into HLPFL Platform**  
*Repository management tool for the artist-first social media platform*

## 🎯 Deployment Status

This GitHub Repository Collector is now part of the main HLPFL platform repository:
- **Location**: `tools/github-repository-collector/`
- **Branch**: `feature/github-repository-collector`
- **Integration**: Ready for production deployment
- **Access**: Available to all HLPFL developers

The tool can be used directly within the HLPFL codebase for:
- Automated repository management
- Development environment setup
- Backup and archival operations
- Code analysis and documentation