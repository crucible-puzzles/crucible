from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select
from fastapi import FastAPI
from database import get_db

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/puzzle/{id}")
def fetch_puzzle(id: int,  db:Session = Depends(get_db)):

    resultset = db.execute("""
    SELECT * 
    FROM   puzzle 
        LEFT JOIN users 
                ON puzzle.created_by = users.id 
    WHERE  puzzle.id = :id 
    """, {'id': id}).fetchone()

    result = dict(resultset)

    structure = []

    for char, idx in enumerate(result["solution"]):
        if char == '.':
            structure.append(idx)
        

    resp = {"Title": result["title"],
            "Created On": result["created_on"],
            "Created By": result["name"],
            "board_height": result["x"],
            "board_width": result["y"],
            "structure" : structure,
            }


    return resp