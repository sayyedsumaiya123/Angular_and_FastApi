import os
import sys

# Add the project root to sys.path so that routers and database modules are resolvable
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app
