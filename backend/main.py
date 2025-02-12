from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
import sqlite3
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get SQLite connection
def get_db():
    conn = sqlite3.connect("food_database.db")
    conn.row_factory = sqlite3.Row  # Access rows as dictionaries
    try:
        yield conn
    finally:
        conn.close()

# Models
class FoodLogEntry(BaseModel):
    food_id: int

# Routes
@app.get("/foods", response_model=List[str])
def get_food_items(db: sqlite3.Connection = Depends(get_db)):
    query = "SELECT item_name FROM foods"
    cursor = db.execute(query)
    foods = [row["item_name"] for row in cursor.fetchall()]
    return foods

@app.get("/foods/{food_id}")
def get_food_details(food_id: int, db: sqlite3.Connection = Depends(get_db)):
    query = "SELECT * FROM foods WHERE food_id = ?"
    cursor = db.execute(query, (food_id,))
    food = cursor.fetchone()
    if not food:
        raise HTTPException(status_code=404, detail="Food not found")
    return dict(food)

@app.get("/foods/{food_id}/ingredients")
def get_food_ingredients(food_id: int, db: sqlite3.Connection = Depends(get_db)):
    query = """
    SELECT ingredients.*
    FROM food_ingredients
    JOIN ingredients
    ON food_ingredients.ingredient_id = ingredients.ingre_id
    WHERE food_ingredients.food_id = ?
    """
    cursor = db.execute(query, (food_id,))
    ingredients = [dict(row) for row in cursor.fetchall()]
    if not ingredients:
        raise HTTPException(status_code=404, detail="Ingredients not found")
    return ingredients

@app.post("/food_log")
def add_food_log_entry(food_log: FoodLogEntry, db: sqlite3.Connection = Depends(get_db)):
    current_datetime = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    cursor = db.execute(
        "INSERT INTO food_log (entry_dt, food_id) VALUES (?, ?)",
        (current_datetime, food_log.food_id)
    )
    entry_id = cursor.lastrowid
    
    # Add associated food log ingredients
    ingredient_query = """
    SELECT ingredient_id, ingredient_qty
    FROM food_ingredients
    JOIN ingredients ON food_ingredients.ingredient_id = ingredients.ingre_id
    WHERE food_ingredients.food_id = ?
    """
    cursor = db.execute(ingredient_query, (food_log.food_id,))
    ingredients = cursor.fetchall()
    
    for ingredient in ingredients:
        db.execute(
            "INSERT INTO food_log_ingredients (log_item_id, ingredient, qty) VALUES (?, ?, ?)",
            (entry_id, ingredient["ingredient_id"], ingredient["ingredient_qty"])
        )
    
    db.commit()
    return {"entry_id": entry_id}

@app.get("/food_log")
def get_today_food_log(db: sqlite3.Connection = Depends(get_db)):
    today_date = datetime.now().strftime("%Y-%m-%d")
    query = """
    SELECT *
    FROM food_log 
    JOIN foods ON food_log.food_id = foods.food_id
    WHERE DATE(food_log.entry_dt) = ?
    """
    cursor = db.execute(query, (today_date,))
    meals = [
        {"time": "8:00 AM", "name": "Breakfast", "items": []},
        {"time": "1:00 PM", "name": "Lunch", "items": []},
        {"time": "8:00 PM", "name": "Dinner", "items": []},
    ]

    # I'm supposed to be sending back
    # [{
    # "time": "8:00 AM" or something,
    # "name": "Breakfast",
    # "items": [{
    #   "name": item_name,
    #   "calories": calories,
    #   "protein": protein,
    #   "carbs": carbs,
    #   "fat": fat
    # }]
    # },]
    for row in cursor.fetchall():
        log = dict(row)
        meal_type = -1

        if datetime.strptime(log["entry_dt"], "%Y-%m-%d %H:%M:%S").hour < 10:
            meal_type = 0
        elif datetime.strptime(log["entry_dt"], "%Y-%m-%d %H:%M:%S").hour < 18:
            meal_type = 1
        else:
            meal_type = 2

        meals[meal_type]["items"].append({
            "name": log["item_name"],
            "calories": log["calories"],
            "protein": log["protein"],
            "carbs": log["carbs"],
            "fat": log["fat"]
        })

    return meals

@app.get("/food_log/macros")
def get_today_macros(db: sqlite3.Connection = Depends(get_db)):
    today_date = datetime.now().strftime("%Y-%m-%d")
    query = """
    SELECT 
        SUM(f.calories) AS total_calories,
        SUM(f.protein) AS total_protein,
        SUM(f.carbs) AS total_carbs,
        SUM(f.fat) AS total_fat
    FROM 
        food_log AS fl
    JOIN 
        foods AS f
    ON 
        fl.food_id = f.food_id
    WHERE 
        DATE(fl.entry_dt) = ?
    """
    cursor = db.execute(query, (today_date,))
    macros = cursor.fetchone()
    data = dict(macros)
    for k, v in data.items():
        if v == None:
            data[k] = 0
    resp = [
      {
        "name": "Protein",
        "value": data["total_protein"]/120,
        "grams": data["total_protein"],
        "target": 120,
        "color": "#D1623F",
      },
      {
        "name": "Carbs",
        "value": data["total_carbs"]/250,
        "grams": data["total_carbs"],
        "target": 250,
        "color": "#2563eb",
      },
      {
        "name": "Fat",
        "value": data["total_fat"]/70,
        "grams": data["total_fat"],
        "target": 70,
        "color": "#16a34a",
      },
    ]

    return resp

