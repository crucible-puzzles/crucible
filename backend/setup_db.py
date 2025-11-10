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
    
    # Split by statement and execute
    statements = [s.strip() for s in schema_sql.split(';') if s.strip()]
    
    with engine.connect() as conn:
        for statement in statements:
            if statement:
                try:
                    conn.execute(text(statement))
                    conn.commit()
                    print(f"✓ Executed: {statement[:50]}...")
                except Exception as e:
                    print(f"✗ Error: {str(e)}")
                    print(f"  Statement: {statement[:100]}...")
    
    print("\n✓ Database setup complete!")
    print("\nYou can now start the backend server with:")
    print("  uvicorn app.main:app --reload --port 8000")

if __name__ == "__main__":
    setup_database()