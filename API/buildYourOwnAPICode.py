# Import necessary modules
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, List

# Initialize FastAPI app
app = FastAPI()

# Sample database of menus
menus = [
    {"name": "Breakfast Menu", "items": {"Pancakes": "Fluffy pancakes served with syrup", "Omelette": "Three-egg omelette with your choice of fillings"}},
    {"name": "Lunch Menu", "items": {"Caesar Salad": "Fresh romaine lettuce with Caesar dressing", "Grilled Cheese": "Classic grilled cheese sandwich"}},
    {"name": "Dinner Menu", "items": {"Steak": "Grilled ribeye steak with garlic butter", "Salmon": "Baked salmon with a lemon dill sauce"}},
    {"name": "Dessert Menu", "items": {"Cheesecake": "Creamy cheesecake with a graham cracker crust", "Brownie": "Rich chocolate brownie with walnuts"}},
    {"name": "Kids Menu", "items": {"Chicken Nuggets": "Breaded chicken nuggets with ketchup", "Mac and Cheese": "Cheesy macaroni and cheese"}},
    {"name": "Beverage Menu", "items": {"Coffee": "Freshly brewed coffee", "Smoothie": "Fruit smoothie with yogurt"}},
    {"name": "Vegan Menu", "items": {"Vegan Burger": "Plant-based burger with lettuce and tomato", "Quinoa Salad": "Quinoa salad with chickpeas and vegetables"}}
]

# Define Pydantic models for input validation
class MenuItem(BaseModel):
    name: str
    description: str

class Menu(BaseModel):
    name: str
    items: Dict[str, str]

# API endpoints
@app.get("/menus")
def get_all_menus():
    return {"menus": menus}

@app.get("/menus/{menu_name}")
def get_menu_by_name(menu_name: str):
    for menu in menus:
        if menu["name"].lower() == menu_name.lower():
            return {"menu": menu}
    raise HTTPException(status_code=404, detail="Menu not found")

@app.post("/menus/{menu_name}/items")
def add_new_item_to_menu(menu_name: str, item: MenuItem):
    for menu in menus:
        if menu["name"].lower() == menu_name.lower():
            if item.name in menu["items"]:
                raise HTTPException(status_code=400, detail="Item already exists in the menu")
            menu["items"][item.name] = item.description
            return {"message": "Item added successfully", "menu": menu}
    raise HTTPException(status_code=404, detail="Menu not found")

@app.delete("/menus/{menu_name}/items/{item_name}")
def delete_item_from_menu(menu_name: str, item_name: str):
    for menu in menus:
        if menu["name"].lower() == menu_name.lower():
            if item_name in menu["items"]:
                del menu["items"][item_name]
                return {"message": "Item deleted successfully", "menu": menu}
            raise HTTPException(status_code=404, detail="Item not found in the menu")
    raise HTTPException(status_code=404, detail="Menu not found")

@app.put("/menus/{menu_name}/items/{item_name}")
def update_item_in_menu(menu_name: str, item_name: str, item: MenuItem):
    for menu in menus:
        if menu["name"].lower() == menu_name.lower():
            if item_name in menu["items"]:
                menu["items"][item_name] = item.description
                return {"message": "Item updated successfully", "menu": menu}
            raise HTTPException(status_code=404, detail="Item not found in the menu")
    raise HTTPException(status_code=404, detail="Menu not found")