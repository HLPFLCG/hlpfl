#!/usr/bin/env python3

"""
HLPFLCG GitHub Repository Collector - Simple version for individual repositories
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

class HLPFLCGCollector:
    """Simplified collector for HLPFLCG repositories"""
    
    def __init__(self, config_path: str = "config_hlpflcg_individual.yaml"):
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
                return yaml.safe_load(f)
        except FileNotFoundError:
            print(f"Error: Configuration file '{config_path}' not found.")
            sys.exit(1)
        except yaml.YAMLError as e:
            print(f"Error parsing configuration file: {e}")
            sys.exit(1)
    
    def setup_logging(self):
        """Setup logging configuration"""
        log_level = logging.DEBUG if self.config.get("advanced", {}).get("verbose", False) else logging.INFO
        logging.basicConfig(
            level=log_level,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.StreamHandler(),
                logging.FileHandler('collection.log')
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def authenticate(self):
        """Authenticate with GitHub API"""
        token = self.config["github"].get("token", "")
        
        if token:
            self.github_client = Github(token, per_page=100)
            self.logger.info("Authenticated with GitHub using token")
        else:
            self.github_client = Github(per_page=100)
            self.logger.warning("No token provided. Using unauthenticated access (rate limited).")
    
    def get_repositories(self) -> List:
        """Get list of repositories to collect"""
        if not self.github_client:
            self.authenticate()

        repositories = self.config["github"].get("repositories", [])
        repos = []

        try:
            self.logger.info(f"Processing {len(repositories)} individual repositories from config")
            for repo_name in repositories:
                try:
                    repo = self.github_client.get_repo(repo_name)
                    self.logger.info(f"Found repository: {repo.full_name}")
                    repos.append(repo)
                except GithubException as e:
                    self.logger.warning(f"Could not access repository {repo_name}: {e}")
                    continue
                        
        except Exception as e:
            self.logger.error(f"Error fetching repositories: {e}")
            return []

        self.logger.info(f"Total repositories to process: {len(repos)}")
        return repos
    
    def should_exclude_file(self, file_info: FileInfo) -> Tuple[bool, str]:
        """Check if a file should be excluded based on filters"""
        filters = self.config["collection"]["file_filters"]
        
        # Check file size
        max_size_mb = filters.get("max_file_size_mb", 100)
        if file_info.size > max_size_mb * 1024 * 1024:
            return True, f"File too large: {file_info.size / (1024*1024):.2f}MB"
        
        # Check file extension
        exclude_extensions = filters.get("exclude_extensions", [])
        file_ext = Path(file_info.name).suffix.lower()
        if file_ext in exclude_extensions:
            return True, f"Excluded extension: {file_ext}"
        
        # Check directory
        exclude_directories = filters.get("exclude_directories", [])
        for dir_name in exclude_directories:
            if file_info.path.startswith(dir_name + "/"):
                return True, f"Excluded directory: {dir_name}"
        
        # Check patterns
        exclude_patterns = filters.get("exclude_patterns", [])
        for pattern in exclude_patterns:
            if pattern.replace("*", "") in file_info.name:
                return True, f"Excluded pattern: {pattern}"
        
        return False, ""
    
    def collect_repository_files(self, repo) -> List[FileInfo]:
        """Collect all files from a repository"""
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
                else:
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
            self.logger.error(f"Error collecting files from {repo.full_name}: {e}")
        
        return files
    
    def download_file(self, file_info: FileInfo, output_path: Path) -> bool:
        """Download a single file"""
        try:
            response = requests.get(file_info.download_url, timeout=30)
            response.raise_for_status()
            
            # Create directory if it doesn't exist
            output_path.parent.mkdir(parents=True, exist_ok=True)
            
            with open(output_path, 'wb') as f:
                f.write(response.content)
            
            return True
        except Exception as e:
            self.logger.error(f"Error downloading {file_info.path}: {e}")
            return False
    
    def collect_all_repositories(self):
        """Main method to collect all repositories"""
        self.logger.info("Starting HLPFLCG GitHub repository collection...")
        
        # Get repositories
        repositories = self.get_repositories()
        if not repositories:
            self.logger.error("No repositories found to collect.")
            return False
        
        # Setup output directory
        output_base = Path(self.config["output"]["base_directory"])
        output_base.mkdir(exist_ok=True)
        
        total_files = 0
        total_size = 0
        
        # Collect files from each repository
        for repo in tqdm(repositories, desc="Processing repositories"):
            self.logger.info(f"Processing repository: {repo.full_name}")
            
            # Collect file list
            files = self.collect_repository_files(repo)
            self.logger.info(f"Found {len(files)} files to collect from {repo.name}")
            
            # Setup repository output directory
            repo_output_dir = output_base / repo.name
            
            # Download files
            successful_downloads = 0
            for file_info in tqdm(files, desc=f"Downloading {repo.name}", leave=False):
                output_path = repo_output_dir / file_info.path
                
                if self.download_file(file_info, output_path):
                    successful_downloads += 1
                    total_files += 1
                    total_size += file_info.size
                    self.collected_files.append(file_info)
            
            # Update metadata
            self.metadata["repositories"][repo.name] = {
                "full_name": repo.full_name,
                "description": repo.description,
                "clone_url": repo.clone_url,
                "default_branch": repo.default_branch,
                "language": repo.language,
                "size": repo.size,
                "stars": repo.stargazers_count,
                "forks": repo.forks_count,
                "is_private": repo.private,
                "is_archived": repo.archived,
                "created_at": repo.created_at.isoformat() if repo.created_at else None,
                "updated_at": repo.updated_at.isoformat() if repo.updated_at else None,
                "files_collected": successful_downloads,
                "total_files_found": len(files)
            }
        
        # Update summary
        self.metadata["summary"] = {
            "total_repositories": len(repositories),
            "total_files_collected": total_files,
            "total_size_bytes": total_size,
            "total_size_mb": round(total_size / (1024 * 1024), 2),
            "files_excluded": len(self.excluded_files),
            "collection_duration": time.time() - time.time()  # Will be updated
        }
        
        # Save metadata
        self.save_metadata()
        
        self.logger.info(f"Collection complete! Collected {total_files} files from {len(repositories)} repositories")
        return True
    
    def save_metadata(self):
        """Save collection metadata to file"""
        output_dir = Path(self.config["output"]["base_directory"])
        
        # Save metadata
        with open(output_dir / "collection_metadata.json", 'w') as f:
            json.dump(self.metadata, f, indent=2)
        
        # Save file index
        if self.config["output"].get("create_index", True):
            index_file = output_dir / "file_index.txt"
            with open(index_file, 'w') as f:
                f.write("HLPFLCG Repository Collection - File Index\n")
                f.write("=" * 50 + "\n\n")
                
                for file_info in self.collected_files:
                    rel_path = Path(file_info.repo_name) / file_info.path
                    f.write(f"{rel_path}\n")

@click.command()
@click.option('--config', '-c', default='config_hlpflcg_individual.yaml', help='Configuration file path')
@click.option('--output', '-o', help='Output directory (overrides config)')
@click.option('--verbose', '-v', is_flag=True, help='Verbose output')
def main(config, output, verbose):
    """HLPFLCG GitHub Repository Collector"""
    collector = HLPFLCGCollector(config)
    
    # Override output directory if specified
    if output:
        collector.config["output"]["base_directory"] = output
    
    # Override verbose setting if specified
    if verbose:
        collector.config["advanced"]["verbose"] = True
        collector.setup_logging()
    
    success = collector.collect_all_repositories()
    
    if success:
        print("\n✅ Collection completed successfully!")
        print(f"📁 Files saved to: {collector.config['output']['base_directory']}")
        print(f"📊 Total files collected: {len(collector.collected_files)}")
        print(f"📈 Total repositories: {len(collector.metadata['repositories'])}")
    else:
        print("\n❌ Collection failed. Check collection.log for details.")
        sys.exit(1)

if __name__ == "__main__":
    main()