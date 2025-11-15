"""
Database setup script for Crucible
Run this to initialize the database with the new schema
"""

import sys
from sqlalchemy import create_engine, text
from app.config import settings

def setup_database():
    """Initialize database with schema"""
    print("Setting up Crucible database...")
    
    engine = create_engine(settings.DATABASE_URL)
    
    # Read and execute schema
    with open('DDL/schema.sql', 'r') as f:
        schema_sql = f.read()
    
    # Execute the entire schema as one transaction
    with engine.connect() as conn:
        try:
            conn.execute(text(schema_sql))
            conn.commit()
            print(f"✓ Database schema executed successfully")
        except Exception as e:
            print(f"✗ Error executing schema: {str(e)}")
            conn.rollback()
            raise
    
    print("\n✓ Database setup complete!")
    print("\nYou can now start the backend server with:")
    print("  uvicorn app.main:app --reload --port 8000")

if __name__ == "__main__":
    setup_database()