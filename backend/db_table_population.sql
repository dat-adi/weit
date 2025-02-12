-- Create Table: foods
CREATE TABLE foods (
    food_id INTEGER PRIMARY KEY,
    item_name TEXT NOT NULL,
    item_description TEXT,
    serving_size INTEGER,
    calories INTEGER,
    protein INTEGER,
    carbs INTEGER,
    fat INTEGER
);

-- Insert data into foods table
INSERT INTO foods (food_id, item_name, item_description, serving_size, calories, protein, carbs, fat) VALUES
(1, 'Banana Overnight Oats', 'Quick and easy morning breakfast!', 1, 330, 12, 14, 14);

-- Create Table: food_ingredients
CREATE TABLE food_ingredients (
    food_ingre_id INTEGER PRIMARY KEY,
    food_id INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,
    FOREIGN KEY (food_id) REFERENCES foods(food_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingre_id)
);

-- Insert data into food_ingredients table
INSERT INTO food_ingredients (food_ingre_id, food_id, ingredient_id) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4);

-- Create Table: ingredients
CREATE TABLE ingredients (
    ingre_id INTEGER PRIMARY KEY,
    ingredient_name TEXT NOT NULL,
    ingredient_qty REAL
);

-- Insert data into ingredients table
INSERT INTO ingredients (ingre_id, ingredient_name, ingredient_qty) VALUES
(1, 'banana', 1),
(2, 'milk', 1),
(3, 'oats', 1),
(4, 'chia seeds', 1),
(5, 'cocoa powder', 1);

-- Create Table: food_log
CREATE TABLE food_log (
    log_entry_id INTEGER PRIMARY KEY,
    entry_dt DATETIME NOT NULL,
    food_id INTEGER NOT NULL,
    FOREIGN KEY (food_id) REFERENCES foods(food_id)
);

-- Insert data into food_log table
INSERT INTO food_log (log_entry_id, entry_dt, food_id) VALUES
(1, '2025-02-12 19:21:00', 1);

-- Create Table: food_log_ingredients
CREATE TABLE food_log_ingredients (
    log_item_id INTEGER NOT NULL,
    ingredient INTEGER NOT NULL,
    qty REAL NOT NULL,
    PRIMARY KEY (log_item_id, ingredient),
    FOREIGN KEY (ingredient) REFERENCES ingredients(ingre_id)
);

-- Insert data into food_log_ingredients table
INSERT INTO food_log_ingredients (log_item_id, ingredient, qty) VALUES
(1, 1, 2),
(1, 2, 1),
(1, 3, 0.5),
(1, 4, 1);

-- Add lunch: Grilled Veggie Sandwich
INSERT INTO foods (food_id, item_name, item_description, serving_size, calories, protein, carbs, fat) 
VALUES (2, 'Grilled Veggie Sandwich', 'A healthy and delicious sandwich filled with grilled vegetables.', 1, 350, 12, 45, 10);

-- Add ingredients for Grilled Veggie Sandwich
INSERT INTO ingredients (ingre_id, ingredient_name, ingredient_qty) VALUES
(6, 'whole grain bread', 2),   -- 2 slices
(7, 'grilled bell peppers', 1), -- 1 cup
(8, 'hummus', 2),             -- 2 tablespoons
(9, 'zucchini', 0.5),         -- 0.5 medium zucchini
(10, 'olive oil', 1);         -- 1 tablespoon

-- Link ingredients to Grilled Veggie Sandwich in food_ingredients table
INSERT INTO food_ingredients (food_ingre_id, food_id, ingredient_id) VALUES
(5, 2, 6), 
(6, 2, 7), 
(7, 2, 8), 
(8, 2, 9), 
(9, 2, 10);

-- Add dinner: Lentil Soup
INSERT INTO foods (food_id, item_name, item_description, serving_size, calories, protein, carbs, fat) 
VALUES (3, 'Lentil Soup', 'A hearty and comforting lentil soup packed with flavor.', 1, 250, 18, 30, 5);

-- Add ingredients for Lentil Soup
INSERT INTO ingredients (ingre_id, ingredient_name, ingredient_qty) VALUES
(11, 'red lentils', 1),       -- 1 cup
(12, 'carrots', 1),           -- 1 medium carrot
(13, 'celery', 1),            -- 1 stalk
(14, 'onion', 1),             -- 1 medium onion
(15, 'vegetable broth', 2),   -- 2 cups
(16, 'garlic', 2),            -- 2 cloves
(17, 'olive oil', 1);         -- 1 tablespoon

-- Link ingredients to Lentil Soup in food_ingredients table
INSERT INTO food_ingredients (food_ingre_id, food_id, ingredient_id) VALUES
(10, 3, 11), 
(11, 3, 12), 
(12, 3, 13), 
(13, 3, 14), 
(14, 3, 15), 
(15, 3, 16), 
(16, 3, 17);

INSERT INTO foods (food_id, item_name, item_description, serving_size, calories, protein, carbs, fat) 
VALUES (4, 'Hard-Boiled Eggs', 'A quick and easy source of protein.', 1, 155, 12.6, 1.1, 10.6);

INSERT INTO ingredients (ingre_id, ingredient_name, ingredient_qty) VALUES
(18, 'egg', 2);

INSERT INTO food_ingredients (food_ingre_id, food_id, ingredient_id) VALUES
(17, 4, 18);
