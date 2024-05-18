from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from sqlalchemy import select
from fastapi import FastAPI
from database import get_db

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/puzzle/{id}")
def fetch_puzzle(id: int,  db: Session = Depends(get_db)):

    puzzle_resultset = db.execute(text("""
    SELECT * 
    FROM   puzzle 
        LEFT JOIN users 
                ON puzzle.created_by = users.id 
    WHERE  puzzle.id = :id 
    """), {'id': id}).fetchone()

    hint_result_set = db.execute(text("""
    SELECT Concat(clue, direction) AS clue, 
        hint 
    FROM   hints 
    WHERE  id = :id 
    """), {'id': id}).fetchall()

    result = dict(puzzle_resultset)
    hints = dict(hint_result_set)

    structure = []

    for char, idx in enumerate(result["solution"]):
        if char == '.':
            structure.append(idx)

    resp = {"title": result["title"],
            "createdOn": result["created_on"],
            "createdBy": result["name"],
            "boardWidth": result["board_width"],
            "boardHeight": result["board_height"],
            "structure": structure,
            "hints": hints
            }

    return resp


@app.post("/puzzle/{id}/{solution}")
def validate_puzzle(id: int, solution: str, db:Session = Depends(get_db)):
    resultset = db.execute(text("""
    SELECT solution 
    FROM   puzzle 
    WHERE  puzzle.id = :id 
    """), {'id': id}).fetchone()

    actual_solution = dict(resultset)["solution"]

    if len(solution) != len(actual_solution):
        return "Invalid Solution (length does not match expected)"
    
    if actual_solution == solution:
        return True
    
    indices = []
    for idx, char in enumerate(solution):
        if actual_solution[idx] != char:
            indices.append(idx)

    return {"invalidIndices": indices}


