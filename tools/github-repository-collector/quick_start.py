#!/usr/bin/env python3
"""
Quick Start Script for GitHub Repository Collector

This script provides an interactive setup wizard to help you configure
and run the GitHub repository collector quickly.
"""

import os
import sys
import yaml
import getpass
from pathlib import Path

def clear_screen():
    """Clear the terminal screen"""
    os.system('cls' if os.name == 'nt' else 'clear')

def print_header():
    """Print the welcome header"""
    print("=" * 60)
    print("    GitHub Repository Collector - Quick Start")
    print("=" * 60)
    print()

def get_user_input(prompt, default=None, password=False):
    """Get user input with optional default value"""
    if default:
        prompt = f"{prompt} [{default}]: "
    else:
        prompt = f"{prompt}: "
    
    if password:
        value = getpass.getpass(prompt)
    else:
        value = input(prompt)
    
    return value if value else default

def setup_wizard():
    """Interactive setup wizard"""
    clear_screen()
    print_header()
    print("This wizard will help you configure the GitHub repository collector.")
    print("You'll need a GitHub Personal Access Token for best results.")
    print()
    
    # Get GitHub settings
    print("🔐 GitHub Configuration")
    print("-" * 30)
    
    token = get_user_input("GitHub Personal Access Token", password=True)
    username = get_user_input("GitHub Username (leave empty to use authenticated user)")
    organization = get_user_input("GitHub Organization (leave empty for user repos)")
    
    print()
    print("📁 Collection Settings")
    print("-" * 30)
    
    output_dir = get_user_input("Output directory", "collected_repos")
    
    print()
    print("📊 Repository Filters")
    print("-" * 30)
    
    include_forks = get_user_input("Include forked repositories? (y/n)", "n").lower() == 'y'
    include_archived = get_user_input("Include archived repositories? (y/n)", "n").lower() == 'y'
    include_private = get_user_input("Include private repositories? (y/n)", "y").lower() == 'y'
    
    print()
    print("🗂️  Output Organization")
    print("-" * 30)
    
    print("Choose organization structure:")
    print("1. flat - All files in one directory")
    print("2. by_repo - Organized by repository name")
    print("3. by_owner - Organized by owner then repository")
    print("4. by_type - Organized by file type then repository")
    
    structure_options = {
        "1": "flat",
        "2": "by_repo", 
        "3": "by_owner",
        "4": "by_type"
    }
    
    structure_choice = get_user_input("Choose structure (1-4)", "2")
    structure = structure_options.get(structure_choice, "by_repo")
    
    # Create configuration
    config = {
        "github": {
            "token": token,
            "username": username,
            "organization": organization
        },
        "collection": {
            "include_forks": include_forks,
            "include_archived": include_archived,
            "include_private": include_private,
            "file_filters": {
                "max_file_size_mb": 50,
                "exclude_extensions": [".exe", ".dll", ".so", ".dylib", ".bin", ".zip", ".tar", ".gz", ".rar", ".7z"],
                "exclude_directories": ["node_modules", ".git", ".vscode", ".idea", "dist", "build", "target", "__pycache__", ".pytest_cache"],
                "exclude_patterns": ["*.log", "*.tmp", "*.cache", "*.swp", "*.pyc", "*.pyo", ".DS_Store", "Thumbs.db"]
            }
        },
        "output": {
            "base_directory": output_dir,
            "structure": structure,
            "naming": "preserve",
            "create_metadata": True,
            "create_index": True
        },
        "advanced": {
            "rate_limit": 30,
            "max_workers": 4,
            "max_retries": 3,
            "retry_delay": 1,
            "verbose": False
        }
    }
    
    return config

def save_config(config, filename="config.yaml"):
    """Save configuration to file"""
    try:
        with open(filename, 'w') as f:
            yaml.dump(config, f, default_flow_style=False, indent=2)
        return True
    except Exception as e:
        print(f"Error saving configuration: {e}")
        return False

def validate_config(config):
    """Validate configuration"""
    issues = []
    
    if not config["github"]["username"] and not config["github"]["organization"]:
        issues.append("Must specify either username or organization")
    
    if not config["github"]["token"]:
        issues.append("No token provided - rate limited to 60 requests/hour")
    
    if issues:
        print("\n⚠️  Configuration Issues:")
        for issue in issues:
            print(f"  • {issue}")
        print()
        
        if get_user_input("Continue anyway? (y/n)", "n").lower() != 'y':
            return False
    
    return True

def show_summary(config):
    """Show configuration summary"""
    print("\n📋 Configuration Summary")
    print("=" * 40)
    
    github_config = config["github"]
    print(f"Target: {github_config['organization'] or github_config['username'] or 'Authenticated user'}")
    print(f"Token: {'✓' if github_config['token'] else '✗ (rate limited)'}")
    
    collection_config = config["collection"]
    print(f"Include forks: {collection_config['include_forks']}")
    print(f"Include archived: {collection_config['include_archived']}")
    print(f"Include private: {collection_config['include_private']}")
    
    output_config = config["output"]
    print(f"Output directory: {output_config['base_directory']}")
    print(f"Organization: {output_config['structure']}")
    print()

def run_collection(config):
    """Run the collection with the provided config"""
    try:
        from github_collector import GitHubCollector
        
        print("🚀 Starting collection...")
        print("Press Ctrl+C to stop at any time")
        print()
        
        # Create temporary config file
        temp_config = "temp_config.yaml"
        save_config(config, temp_config)
        
        # Initialize and run collector
        collector = GitHubCollector(temp_config)
        
        if collector.authenticate():
            collector.collect_repositories()
            collector.create_metadata_files()
            
            # Print summary
            summary = collector.metadata.get("summary", {})
            print(f"\n✅ Collection Complete!")
            print(f"📁 Total repositories: {summary.get('total_repositories', 0)}")
            print(f"📄 Total files collected: {summary.get('total_files_collected', 0)}")
            print(f"🚫 Total files excluded: {summary.get('total_files_excluded', 0)}")
            print(f"💾 Total size: {summary.get('total_size_mb', 0):.2f} MB")
            print(f"📂 Output directory: {config['output']['base_directory']}")
        else:
            print("❌ Authentication failed")
        
        # Clean up temp config
        if os.path.exists(temp_config):
            os.remove(temp_config)
            
    except KeyboardInterrupt:
        print("\n\n⏹️  Collection stopped by user")
    except ImportError:
        print("❌ Could not import github_collector. Make sure you're in the correct directory.")
    except Exception as e:
        print(f"❌ Error during collection: {e}")

def main():
    """Main quick start function"""
    while True:
        clear_screen()
        print_header()
        print("Choose an option:")
        print("1. Run setup wizard")
        print("2. Use existing config.yaml")
        print("3. Exit")
        print()
        
        choice = get_user_input("Choice (1-3)", "1")
        
        if choice == "1":
            # Run setup wizard
            config = setup_wizard()
            show_summary(config)
            
            if not validate_config(config):
                continue
            
            if get_user_input("Save this configuration? (y/n)", "y").lower() == 'y':
                if save_config(config):
                    print("✓ Configuration saved to config.yaml")
                else:
                    print("✗ Failed to save configuration")
                    continue
            
            if get_user_input("Run collection now? (y/n)", "y").lower() == 'y':
                run_collection(config)
            
            if get_user_input("Run again? (y/n)", "n").lower() != 'y':
                break
                
        elif choice == "2":
            # Use existing config
            if os.path.exists("config.yaml"):
                try:
                    with open("config.yaml", 'r') as f:
                        config = yaml.safe_load(f)
                    show_summary(config)
                    
                    if not validate_config(config):
                        continue
                    
                    if get_user_input("Run collection now? (y/n)", "y").lower() == 'y':
                        run_collection(config)
                    
                    if get_user_input("Run again? (y/n)", "n").lower() != 'y':
                        break
                        
                except Exception as e:
                    print(f"Error loading config.yaml: {e}")
                    if get_user_input("Continue? (y/n)", "y").lower() != 'y':
                        continue
            else:
                print("No config.yaml file found.")
                if get_user_input("Continue? (y/n)", "y").lower() != 'y':
                    continue
                    
        elif choice == "3":
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")
            get_user_input("Press Enter to continue...")

if __name__ == "__main__":
    main()