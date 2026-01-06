#!/usr/bin/env python3
"""
GitHub Repository Collector - Bulk collect all files from GitHub repositories

This tool allows you to collect all files from your GitHub repositories (or any
user/organization's repositories) into a single organized directory structure.
"""

import os
import sys
import yaml
import json
import time
import logging
from pathlib import Path
from typing import List, Dict, Set, Optional, Tuple
from dataclasses import dataclass
from datetime import datetime

import requests
from github import Github, GithubException, UnknownObjectException
from tqdm import tqdm
import click

@dataclass
class FileInfo:
    """Information about a file in a repository"""
    path: str
    name: str
    size: int
    sha: str
    download_url: str
    repo_name: str
    repo_owner: str

class GitHubCollector:
    """Main collector class for GitHub repositories"""
    
    def __init__(self, config_path: str = "config.yaml"):
        self.config = self.load_config(config_path)
        self.setup_logging()
        self.github_client = None
        self.collected_files = []
        self.excluded_files = []
        self.metadata = {
            "collection_date": datetime.now().isoformat(),
            "config": self.config,
            "repositories": {},
            "summary": {}
        }
    
    def load_config(self, config_path: str) -> Dict:
        """Load configuration from YAML file"""
        try:
            with open(config_path, 'r') as f:
                config = yaml.safe_load(f)
            return config
        except FileNotFoundError:
            click.echo(f"Configuration file {config_path} not found. Using defaults.")
            return self.get_default_config()
        except yaml.YAMLError as e:
            click.echo(f"Error parsing configuration file: {e}")
            sys.exit(1)
    
    def get_default_config(self) -> Dict:
        """Get default configuration"""
        return {
            "github": {"token": "", "username": "", "organization": ""},
            "collection": {
                "include_forks": False,
                "include_archived": False,
                "include_private": True,
                "file_filters": {
                    "max_file_size_mb": 50,
                    "exclude_extensions": [".exe", ".dll", ".so", ".dylib", ".bin", ".zip", ".tar", ".gz", ".rar", ".7z"],
                    "exclude_directories": ["node_modules", ".git", ".vscode", ".idea", "dist", "build", "target", "__pycache__", ".pytest_cache"],
                    "exclude_patterns": ["*.log", "*.tmp", "*.cache", "*.swp", "*.pyc", "*.pyo", ".DS_Store", "Thumbs.db"]
                }
            },
            "output": {
                "base_directory": "collected_repos",
                "structure": "by_repo",
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
    
    def setup_logging(self):
        """Setup logging configuration"""
        level = logging.DEBUG if self.config["advanced"]["verbose"] else logging.INFO
        logging.basicConfig(
            level=level,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('github_collector.log'),
                logging.StreamHandler(sys.stdout)
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def authenticate(self):
        """Authenticate with GitHub API"""
        token = self.config["github"]["token"]
        if token:
            self.github_client = Github(token, per_page=100)
            try:
                user = self.github_client.get_user()
                self.logger.info(f"Authenticated as: {user.login}")
                return True
            except GithubException as e:
                self.logger.error(f"Authentication failed: {e}")
                return False
        else:
            self.github_client = Github(per_page=100)
            self.logger.warning("No token provided. Using unauthenticated access (rate limited).")
            return True
    
    def get_repositories(self) -> List:
        """Get list of repositories to collect"""
        if not self.github_client:
            self.authenticate()
        
        username = self.config["github"]["username"]
        organization = self.config["github"]["organization"]
        
        repos = []
        
        try:
            if organization:
                org = self.github_client.get_organization(organization)
                repos_list = org.get_repos(type="all")
                self.logger.info(f"Found repositories for organization: {organization}")
            elif username:
                user = self.github_client.get_user(username)
                repos_list = user.get_repos(type="all")
                self.logger.info(f"Found repositories for user: {username}")
            else:
                # Get authenticated user's repos
                user = self.github_client.get_user()
                repos_list = user.get_repos(type="all")
                self.logger.info(f"Found repositories for authenticated user: {user.login}")
            
            for repo in repos_list:
                # Apply filters
                if not self.config["collection"]["include_forks"] and repo.fork:
                    continue
                if not self.config["collection"]["include_archived"] and repo.archived:
                    continue
                if not self.config["collection"]["include_private"] and repo.private:
                    continue
                
                repos.append(repo)
                self.logger.debug(f"Added repo: {repo.full_name}")
        
        except GithubException as e:
            self.logger.error(f"Error fetching repositories: {e}")
            return []
        
        self.logger.info(f"Total repositories to process: {len(repos)}")
        return repos
    
    def should_exclude_file(self, file_info: FileInfo) -> Tuple[bool, str]:
        """Check if file should be excluded based on filters"""
        filters = self.config["collection"]["file_filters"]
        
        # Check file size
        if file_info.size > filters["max_file_size_mb"] * 1024 * 1024:
            return True, f"File too large: {file_info.size / (1024*1024):.2f}MB"
        
        # Check file extension
        file_ext = Path(file_info.name).suffix.lower()
        if file_ext in filters["exclude_extensions"]:
            return True, f"Excluded extension: {file_ext}"
        
        # Check directory patterns
        path_parts = Path(file_info.path).parts
        for part in path_parts:
            if part in filters["exclude_directories"]:
                return True, f"Excluded directory: {part}"
        
        # Check file patterns
        import fnmatch
        for pattern in filters["exclude_patterns"]:
            if fnmatch.fnmatch(file_info.name.lower(), pattern.lower()):
                return True, f"Excluded pattern: {pattern}"
        
        return False, ""
    
    def get_repository_files(self, repo) -> List[FileInfo]:
        """Get all files from a repository"""
        files = []
        
        try:
            contents = repo.get_contents("")
            
            while contents:
                file_content = contents.pop(0)
                
                if file_content.type == "dir":
                    try:
                        contents.extend(repo.get_contents(file_content.path))
                    except GithubException as e:
                        self.logger.warning(f"Could not access directory {file_content.path}: {e}")
                        continue
                
                elif file_content.type == "file":
                    file_info = FileInfo(
                        path=file_content.path,
                        name=file_content.name,
                        size=file_content.size or 0,
                        sha=file_content.sha,
                        download_url=file_content.download_url,
                        repo_name=repo.name,
                        repo_owner=repo.owner.login
                    )
                    
                    should_exclude, reason = self.should_exclude_file(file_info)
                    if should_exclude:
                        self.excluded_files.append((file_info, reason))
                        self.logger.debug(f"Excluded {file_info.path}: {reason}")
                    else:
                        files.append(file_info)
        
        except GithubException as e:
            self.logger.error(f"Error getting files from {repo.full_name}: {e}")
        
        return files
    
    def get_output_path(self, file_info: FileInfo) -> Path:
        """Generate output path for a file based on configuration"""
        base_dir = Path(self.config["output"]["base_directory"])
        structure = self.config["output"]["structure"]
        naming = self.config["output"]["naming"]
        
        if structure == "flat":
            output_dir = base_dir
        elif structure == "by_repo":
            output_dir = base_dir / file_info.repo_name
        elif structure == "by_owner":
            output_dir = base_dir / file_info.repo_owner / file_info.repo_name
        elif structure == "by_type":
            file_ext = Path(file_info.name).suffix.lower()
            if not file_ext:
                file_ext = "no_extension"
            output_dir = base_dir / file_ext.lstrip('.') / file_info.repo_name
        else:
            output_dir = base_dir / file_info.repo_name
        
        # Handle naming convention
        if naming == "repo_prefix":
            filename = f"{file_info.repo_name}_{file_info.name}"
        elif naming == "timestamp":
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"{timestamp}_{file_info.name}"
        else:  # preserve
            filename = file_info.name
        
        return output_dir / filename
    
    def download_file(self, file_info: FileInfo) -> bool:
        """Download a single file"""
        try:
            output_path = self.get_output_path(file_info)
            output_path.parent.mkdir(parents=True, exist_ok=True)
            
            if file_info.download_url:
                response = requests.get(file_info.download_url, timeout=30)
                response.raise_for_status()
                
                with open(output_path, 'wb') as f:
                    f.write(response.content)
                
                self.collected_files.append({
                    "original_path": file_info.path,
                    "output_path": str(output_path),
                    "size": file_info.size,
                    "repo": file_info.repo_name,
                    "sha": file_info.sha
                })
                
                return True
            else:
                self.logger.warning(f"No download URL for {file_info.path}")
                return False
        
        except Exception as e:
            self.logger.error(f"Error downloading {file_info.path}: {e}")
            return False
    
    def collect_repositories(self):
        """Main collection method"""
        self.logger.info("Starting GitHub repository collection...")
        
        # Get repositories
        repositories = self.get_repositories()
        if not repositories:
            self.logger.error("No repositories found to collect.")
            return
        
        # Process each repository
        for repo in tqdm(repositories, desc="Processing repositories"):
            self.logger.info(f"Processing repository: {repo.full_name}")
            
            # Get files from repository
            files = self.get_repository_files(repo)
            self.logger.info(f"Found {len(files)} files to download from {repo.name}")
            
            # Update metadata
            self.metadata["repositories"][repo.name] = {
                "full_name": repo.full_name,
                "description": repo.description,
                "language": repo.language,
                "size": repo.size,
                "stars": repo.stargazers_count,
                "forks": repo.forks_count,
                "private": repo.private,
                "archived": repo.archived,
                "created_at": repo.created_at.isoformat() if repo.created_at else None,
                "updated_at": repo.updated_at.isoformat() if repo.updated_at else None,
                "files_found": len(files),
                "files_collected": 0,
                "total_size": 0
            }
            
            # Download files with progress bar
            successful_downloads = 0
            total_size = 0
            
            for file_info in tqdm(files, desc=f"Downloading {repo.name}", leave=False):
                if self.download_file(file_info):
                    successful_downloads += 1
                    total_size += file_info.size
                    
                    # Rate limiting
                    time.sleep(60 / self.config["advanced"]["rate_limit"])
            
            # Update repository metadata
            self.metadata["repositories"][repo.name]["files_collected"] = successful_downloads
            self.metadata["repositories"][repo.name]["total_size"] = total_size
            
            self.logger.info(f"Downloaded {successful_downloads}/{len(files)} files from {repo.name}")
    
    def create_metadata_files(self):
        """Create metadata and index files"""
        if not self.config["output"]["create_metadata"]:
            return
        
        base_dir = Path(self.config["output"]["base_directory"])
        
        # Create collection metadata
        self.metadata["summary"] = {
            "total_repositories": len(self.metadata["repositories"]),
            "total_files_collected": len(self.collected_files),
            "total_files_excluded": len(self.excluded_files),
            "total_size_mb": sum(f["size"] for f in self.collected_files) / (1024 * 1024)
        }
        
        metadata_path = base_dir / "collection_metadata.json"
        with open(metadata_path, 'w') as f:
            json.dump(self.metadata, f, indent=2)
        
        self.logger.info(f"Created metadata file: {metadata_path}")
        
        # Create file index
        if self.config["output"]["create_index"]:
            index_path = base_dir / "file_index.txt"
            with open(index_path, 'w') as f:
                f.write("# GitHub Repository Collection - File Index\n")
                f.write(f"# Generated: {datetime.now().isoformat()}\n\n")
                
                for file_info in self.collected_files:
                    f.write(f"{file_info['output_path']} | {file_info['original_path']} | {file_info['repo']}\n")
            
            self.logger.info(f"Created file index: {index_path}")
        
        # Create exclusion report
        if self.excluded_files:
            exclusion_path = base_dir / "excluded_files.txt"
            with open(exclusion_path, 'w') as f:
                f.write("# Excluded Files Report\n")
                f.write(f"# Generated: {datetime.now().isoformat()}\n\n")
                
                for file_info, reason in self.excluded_files:
                    f.write(f"{file_info.path} | {reason} | {file_info.repo_name}\n")
            
            self.logger.info(f"Created exclusion report: {exclusion_path}")

# CLI Interface
@click.command()
@click.option('--config', '-c', default='config.yaml', help='Configuration file path')
@click.option('--username', '-u', help='GitHub username to collect from')
@click.option('--organization', '-o', help='GitHub organization to collect from')
@click.option('--token', '-t', help='GitHub personal access token')
@click.option('--output', '-d', help='Output directory')
@click.option('--verbose', '-v', is_flag=True, help='Verbose output')
def main(config, username, organization, token, output, verbose):
    """GitHub Repository Collector - Bulk collect all files from GitHub repositories"""
    
    # Initialize collector
    collector = GitHubCollector(config)
    
    # Override config with CLI options
    if username:
        collector.config["github"]["username"] = username
    if organization:
        collector.config["github"]["organization"] = organization
    if token:
        collector.config["github"]["token"] = token
    if output:
        collector.config["output"]["base_directory"] = output
    if verbose:
        collector.config["advanced"]["verbose"] = True
    
    # Validate configuration
    if not collector.config["github"]["username"] and not collector.config["github"]["organization"]:
        click.echo("Error: Must specify either a username or organization.")
        click.echo("Use --username, --organization, or set in config.yaml")
        sys.exit(1)
    
    # Start collection
    try:
        collector.authenticate()
        collector.collect_repositories()
        collector.create_metadata_files()
        
        # Print summary
        summary = collector.metadata.get("summary", {})
        click.echo(f"\n✅ Collection Complete!")
        click.echo(f"📁 Total repositories: {summary.get('total_repositories', 0)}")
        click.echo(f"📄 Total files collected: {summary.get('total_files_collected', 0)}")
        click.echo(f"🚫 Total files excluded: {summary.get('total_files_excluded', 0)}")
        click.echo(f"💾 Total size: {summary.get('total_size_mb', 0):.2f} MB")
        click.echo(f"📂 Output directory: {collector.config['output']['base_directory']}")
        
    except Exception as e:
        click.echo(f"❌ Error during collection: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()