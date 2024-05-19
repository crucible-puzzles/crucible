from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from sqlalchemy import select
from fastapi import FastAPI, Request
from database import get_db
import logging

logging.basicConfig(filename='crucible.log',
                    level=logging.DEBUG,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S'
                    )
logger = logging.getLogger(__name__)
app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/health")
def check_health():
    try:
        db = Depends(get_db)
        result = db.execute(text("SELECT 1")).fetchone()
        if result is None or result[0] != 1:
            raise HTTPException(status_code=500, detail="Database check failed")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Health check failed: {str(e)}")

    return {"status": "ok", "message": "Application and database are healthy"}


@app.get("/puzzle/{id}")
def fetch_puzzle(id: int,  db: Session = Depends(get_db)):
    logger.debug(f"Information for puzzle {id} requested")
    puzzle_resultset = db.execute(text("""
    SELECT * 
    FROM   puzzle 
        LEFT JOIN users 
                ON puzzle.created_by = users.id 
    WHERE  puzzle.id = :id 
    """), {'id': id}).fetchone()
    if puzzle_resultset is None:
        logger.debug(f"Puzzle {id} requested and no matching record was found")

    hint_result_set = db.execute(text("""
    SELECT clue AS number, 
        CASE 
            WHEN direction = 'd' THEN 'down' 
            WHEN direction = 'a' THEN 'across' 
        END  AS direction, 
        hint 
    FROM   hints 
    WHERE  id = :id 
    ORDER  BY direction, 
              number; 
    """), {'id': id}).fetchall()

    result = dict(puzzle_resultset)
    hints = hint_result_set

    structure = []

    for idx, char in enumerate(result["solution"]):
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

    logger.debug(f"returning response {resp}")
    return resp

@app.post("/validate_puzzle/{id}")
async def validate_puzzle(id: int, request: Request, db: Session = Depends(get_db)):
    body = dict(await request.json())

    if "solution" not in body:
        return "Invalid request. Solution parameter missing!"
    
    solution = body["solution"]

    logger.debug(f"Validation for puzzle {id} requested with solution {solution}")
    resultset = db.execute(text("""
    SELECT solution 
    FROM   puzzle 
    WHERE  puzzle.id = :id 
    """), {'id': id}).fetchone()
    if resultset is None:
        logging.debug(f"Validation for puzzle {id} requested but no record was found")

    actual_solution = dict(resultset)["solution"]

    if len(solution) != len(actual_solution):
        return "Invalid Solution (length does not match expected)"
    
    if actual_solution == solution:
        logger.debug(f"Validation for puzzle {id} passed")
        return True
    
    indices = []
    for idx, char in enumerate(solution):
        if actual_solution[idx] != char:
            indices.append(idx)

    if indices == []:
        return True

    logger.debug(f"Validation for puzzle {id} failed at indices {indices}")
    return {"invalidIndices": indices}
