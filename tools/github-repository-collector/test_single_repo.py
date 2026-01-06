#!/usr/bin/env python3

"""
Simple test for single repository collection
"""

from github import Github
import yaml
import os
from pathlib import Path

def test_single_repo():
    # Test with a single repository
    g = Github(per_page=100)
    
    try:
        repo = g.get_repo("HLPFLCG/hlpflrecords")
        print(f"Repository found: {repo.full_name}")
        print(f"Description: {repo.description}")
        print(f"Language: {repo.language}")
        print(f"Stars: {repo.stargazers_count}")
        print(f"Forks: {repo.forks_count}")
        print(f"Size: {repo.size} KB")
        
        # Get some files
        contents = repo.get_contents("")
        file_count = 0
        
        for content in contents[:5]:  # Just show first 5 items
            if content.type == "file":
                print(f"File: {content.path} ({content.size} bytes)")
                file_count += 1
            else:
                print(f"Directory: {content.path}")
        
        print(f"\nFound {file_count} files in root directory")
        return True
        
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    test_single_repo()