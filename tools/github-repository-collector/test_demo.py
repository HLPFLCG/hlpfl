#!/usr/bin/env python3
"""
Test script to demonstrate the GitHub Repository Collector functionality
without requiring a real GitHub token or username.
"""

import os
import yaml
import json
from pathlib import Path

def create_test_config():
    """Create a test configuration file"""
    config = {
        "github": {
            "token": "ghp_test_token_only_for_demo",
            "username": "octocat",  # GitHub's example user
            "organization": ""
        },
        "collection": {
            "include_forks": False,
            "include_archived": False,
            "include_private": False,  # Can't access private without real token
            "file_filters": {
                "max_file_size_mb": 5,  # Small for demo
                "exclude_extensions": [".exe", ".dll", ".so", ".dylib", ".bin", ".zip", ".tar", ".gz", ".rar", ".7z"],
                "exclude_directories": ["node_modules", ".git", ".vscode", ".idea", "dist", "build", "target", "__pycache__"],
                "exclude_patterns": ["*.log", "*.tmp", "*.cache", "*.swp", "*.pyc", "*.pyo", ".DS_Store"]
            }
        },
        "output": {
            "base_directory": "demo_collection",
            "structure": "by_repo",
            "naming": "preserve",
            "create_metadata": True,
            "create_index": True
        },
        "advanced": {
            "rate_limit": 10,  # Conservative for demo
            "max_workers": 2,
            "max_retries": 2,
            "retry_delay": 1,
            "verbose": True
        }
    }
    
    with open("demo_config.yaml", 'w') as f:
        yaml.dump(config, f, default_flow_style=False, indent=2)
    
    print("✓ Created demo_config.yaml")

def test_config_loading():
    """Test configuration loading and validation"""
    print("\n🧪 Testing Configuration Loading...")
    
    try:
        from github_collector import GitHubCollector
        collector = GitHubCollector("demo_config.yaml")
        print("✓ Configuration loaded successfully")
        
        # Test config values
        assert collector.config["github"]["username"] == "octocat"
        assert collector.config["collection"]["file_filters"]["max_file_size_mb"] == 5
        assert collector.config["output"]["structure"] == "by_repo"
        print("✓ Configuration values validated")
        
        return collector
    except Exception as e:
        print(f"✗ Configuration test failed: {e}")
        return None

def test_authentication():
    """Test GitHub API authentication (will likely fail with demo token)"""
    print("\n🧪 Testing GitHub Authentication...")
    
    try:
        from github_collector import GitHubCollector
        collector = GitHubCollector("demo_config.yaml")
        
        # This will likely fail but tests the authentication flow
        result = collector.authenticate()
        
        if result:
            print("✓ Authentication successful (unexpected for demo)")
            return True
        else:
            print("⚠ Authentication failed as expected with demo token")
            return False
    except Exception as e:
        print(f"✗ Authentication test failed: {e}")
        return False

def test_file_filtering():
    """Test file filtering logic"""
    print("\n🧪 Testing File Filtering...")
    
    try:
        from github_collector import FileInfo, GitHubCollector
        
        collector = GitHubCollector("demo_config.yaml")
        
        # Test file that should be included
        good_file = FileInfo(
            path="src/main.py",
            name="main.py",
            size=1024,
            sha="abc123",
            download_url="https://raw.githubusercontent.com/test/repo/main/src/main.py",
            repo_name="test-repo",
            repo_owner="testuser"
        )
        
        should_exclude, reason = collector.should_exclude_file(good_file)
        assert not should_exclude, f"Good file was excluded: {reason}"
        print("✓ Good file passed filters")
        
        # Test file that should be excluded (too large)
        large_file = FileInfo(
            path="large_file.bin",
            name="large_file.bin",
            size=100 * 1024 * 1024,  # 100MB
            sha="def456",
            download_url="https://raw.githubusercontent.com/test/repo/main/large_file.bin",
            repo_name="test-repo",
            repo_owner="testuser"
        )
        
        should_exclude, reason = collector.should_exclude_file(large_file)
        assert should_exclude, "Large file was not excluded"
        print("✓ Large file correctly excluded")
        
        # Test file that should be excluded (bad extension)
        exe_file = FileInfo(
            path="program.exe",
            name="program.exe",
            size=1024,
            sha="ghi789",
            download_url="https://raw.githubusercontent.com/test/repo/main/program.exe",
            repo_name="test-repo",
            repo_owner="testuser"
        )
        
        should_exclude, reason = collector.should_exclude_file(exe_file)
        assert should_exclude, "EXE file was not excluded"
        print("✓ EXE file correctly excluded")
        
        # Test file that should be excluded (bad directory)
        node_modules_file = FileInfo(
            path="node_modules/package/index.js",
            name="index.js",
            size=1024,
            sha="jkl012",
            download_url="https://raw.githubusercontent.com/test/repo/main/node_modules/package/index.js",
            repo_name="test-repo",
            repo_owner="testuser"
        )
        
        should_exclude, reason = collector.should_exclude_file(node_modules_file)
        assert should_exclude, "Node modules file was not excluded"
        print("✓ Node modules file correctly excluded")
        
        return True
    except Exception as e:
        print(f"✗ File filtering test failed: {e}")
        return False

def test_output_path_generation():
    """Test output path generation for different structures"""
    print("\n🧪 Testing Output Path Generation...")
    
    try:
        from github_collector import FileInfo, GitHubCollector
        
        test_file = FileInfo(
            path="src/example.py",
            name="example.py",
            size=1024,
            sha="test123",
            download_url="https://raw.githubusercontent.com/test/repo/main/src/example.py",
            repo_name="my-repo",
            repo_owner="myuser"
        )
        
        # Test flat structure
        config_flat = {
            "output": {
                "base_directory": "test_output",
                "structure": "flat",
                "naming": "preserve"
            }
        }
        
        collector_flat = GitHubCollector()
        collector_flat.config = config_flat
        path_flat = collector_flat.get_output_path(test_file)
        expected_flat = Path("test_output/example.py")
        assert path_flat == expected_flat, f"Flat path mismatch: {path_flat} != {expected_flat}"
        print("✓ Flat structure path generation correct")
        
        # Test by_repo structure
        config_repo = {
            "output": {
                "base_directory": "test_output",
                "structure": "by_repo",
                "naming": "preserve"
            }
        }
        
        collector_repo = GitHubCollector()
        collector_repo.config = config_repo
        path_repo = collector_repo.get_output_path(test_file)
        expected_repo = Path("test_output/my-repo/example.py")
        assert path_repo == expected_repo, f"Repo path mismatch: {path_repo} != {expected_repo}"
        print("✓ By-repo structure path generation correct")
        
        # Test by_owner structure
        config_owner = {
            "output": {
                "base_directory": "test_output",
                "structure": "by_owner",
                "naming": "preserve"
            }
        }
        
        collector_owner = GitHubCollector()
        collector_owner.config = config_owner
        path_owner = collector_owner.get_output_path(test_file)
        expected_owner = Path("test_output/myuser/my-repo/example.py")
        assert path_owner == expected_owner, f"Owner path mismatch: {path_owner} != {expected_owner}"
        print("✓ By-owner structure path generation correct")
        
        # Test by_type structure
        config_type = {
            "output": {
                "base_directory": "test_output",
                "structure": "by_type",
                "naming": "preserve"
            }
        }
        
        collector_type = GitHubCollector()
        collector_type.config = config_type
        path_type = collector_type.get_output_path(test_file)
        expected_type = Path("test_output/py/my-repo/example.py")
        assert path_type == expected_type, f"Type path mismatch: {path_type} != {expected_type}"
        print("✓ By-type structure path generation correct")
        
        # Test naming conventions
        config_prefix = {
            "output": {
                "base_directory": "test_output",
                "structure": "by_repo",
                "naming": "repo_prefix"
            }
        }
        
        collector_prefix = GitHubCollector()
        collector_prefix.config = config_prefix
        path_prefix = collector_prefix.get_output_path(test_file)
        expected_prefix = Path("test_output/my-repo/my-repo_example.py")
        assert path_prefix == expected_prefix, f"Prefix path mismatch: {path_prefix} != {expected_prefix}"
        print("✓ Repo prefix naming correct")
        
        return True
    except Exception as e:
        print(f"✗ Output path test failed: {e}")
        return False

def test_metadata_generation():
    """Test metadata file generation"""
    print("\n🧪 Testing Metadata Generation...")
    
    try:
        from github_collector import GitHubCollector, FileInfo
        import tempfile
        import shutil
        
        # Create temporary directory for testing
        temp_dir = tempfile.mkdtemp()
        test_config = {
            "output": {
                "base_directory": temp_dir,
                "structure": "by_repo",
                "naming": "preserve",
                "create_metadata": True,
                "create_index": True
            },
            "collection": {
                "include_forks": False,
                "include_archived": False,
                "include_private": False,
                "file_filters": {
                    "max_file_size_mb": 50,
                    "exclude_extensions": [],
                    "exclude_directories": [],
                    "exclude_patterns": []
                }
            },
            "github": {"token": "", "username": "test", "organization": ""},
            "advanced": {"rate_limit": 30, "max_workers": 4, "max_retries": 3, "retry_delay": 1, "verbose": False}
        }
        
        collector = GitHubCollector()
        collector.config = test_config
        
        # Add some test data
        collector.collected_files = [
            {
                "original_path": "src/main.py",
                "output_path": f"{temp_dir}/test-repo/main.py",
                "size": 1024,
                "repo": "test-repo",
                "sha": "abc123"
            },
            {
                "original_path": "README.md",
                "output_path": f"{temp_dir}/test-repo/README.md",
                "size": 512,
                "repo": "test-repo",
                "sha": "def456"
            }
        ]
        
        collector.excluded_files = [
            (FileInfo("large.bin", "large.bin", 100000000, "ghi789", "", "test-repo", "testuser"), "File too large")
        ]
        
        collector.metadata["repositories"] = {
            "test-repo": {
                "full_name": "testuser/test-repo",
                "description": "Test repository",
                "language": "Python",
                "size": 100,
                "stars": 42,
                "forks": 5,
                "private": False,
                "archived": False,
                "created_at": "2023-01-01T00:00:00Z",
                "updated_at": "2023-12-01T00:00:00Z",
                "files_found": 3,
                "files_collected": 2,
                "total_size": 1536
            }
        }
        
        # Test metadata creation
        collector.create_metadata_files()
        
        # Check if metadata file was created
        metadata_file = Path(temp_dir) / "collection_metadata.json"
        assert metadata_file.exists(), "Metadata file was not created"
        print("✓ Metadata file created")
        
        # Check metadata content
        with open(metadata_file, 'r') as f:
            metadata = json.load(f)
        
        assert "collection_date" in metadata, "Collection date missing"
        assert "summary" in metadata, "Summary missing"
        assert metadata["summary"]["total_files_collected"] == 2, "File count incorrect"
        print("✓ Metadata content correct")
        
        # Check index file
        index_file = Path(temp_dir) / "file_index.txt"
        assert index_file.exists(), "Index file was not created"
        print("✓ Index file created")
        
        # Check exclusion report
        exclusion_file = Path(temp_dir) / "excluded_files.txt"
        assert exclusion_file.exists(), "Exclusion file was not created"
        print("✓ Exclusion report created")
        
        # Clean up
        shutil.rmtree(temp_dir)
        print("✓ Temporary files cleaned up")
        
        return True
    except Exception as e:
        print(f"✗ Metadata generation test failed: {e}")
        return False

def run_all_tests():
    """Run all test functions"""
    print("🚀 GitHub Repository Collector - Demo Tests")
    print("=" * 50)
    
    # Create test configuration
    create_test_config()
    
    tests = [
        ("Configuration Loading", test_config_loading),
        ("GitHub Authentication", test_authentication),
        ("File Filtering", test_file_filtering),
        ("Output Path Generation", test_output_path_generation),
        ("Metadata Generation", test_metadata_generation)
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        try:
            result = test_func()
            if result:
                passed += 1
        except Exception as e:
            print(f"✗ {test_name} failed with exception: {e}")
    
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! The GitHub Repository Collector is working correctly.")
    else:
        print("⚠️  Some tests failed. Check the output above for details.")
    
    print("\n📋 Next Steps:")
    print("1. Create a real GitHub Personal Access Token")
    print("2. Update config.yaml with your username and token")
    print("3. Run: python github_collector.py --username YOUR_USERNAME")
    print("4. Or use the interactive wizard: python quick_start.py")
    
    # Clean up demo config
    if os.path.exists("demo_config.yaml"):
        os.remove("demo_config.yaml")

if __name__ == "__main__":
    run_all_tests()