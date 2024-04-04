# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pymongo import MongoClient
# app = FastAPI()

# # allow CORS from everywhere for now
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=['*']
# )

# @app.get("/")
# async def root():
#     return {"message" : "🐳 Docker is amazing!"


# #commands to run this api:
# # pip install uvicorn
# # pip install fastapi
# # python -m uvicorn main:app --reloadfrom fastapi import FastAPI
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson import ObjectId  # Import ObjectId from bson module
from pydantic import BaseModel

app = FastAPI()

# Allow CORS from all origins for all routes and methods
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def getDB():
    # Connect to the local MongoDB instance
    client = MongoClient('mongodb://192.168.1.9:27017/')

    # Access the desired database (replace 'CSCI_Club_Docker_Demo' with your database name)
    db = client['CSCI_Club_Docker_Demo']

    return db


class Data(BaseModel):
    name: str
    favoritefood: str
    major: str
    hoppy: str


@app.post("/savedata")
async def save_data(data: Data):
    # Connect to MongoDB
    db = getDB()
    # Replace 'my_collection' with your actual collection name
    collection = db['my_collection']

    # Insert document into MongoDB
    result = collection.insert_one(data.dict())
    print("Inserted document with id:", result.inserted_id)

    return {"message": "Data saved successfully"}


@app.get("/getdata")
async def get_data():
    try:
        # Connect to MongoDB
        db = getDB()
        # Replace 'my_collection' with your actual collection name
        collection = db['my_collection']

        # Fetch all documents from the collection
        documents = collection.find()

        # Convert documents to list of dictionaries
        data_list = []
        for doc in documents:
            # Convert ObjectId to string for '_id' field
            doc['_id'] = str(doc['_id'])
            data_list.append(doc)

        # Return data with appropriate CORS headers
        return data_list
    except Exception as e:
        # Log the error for debugging purposes
        print("Error occurred while fetching data:", e)
        # Raise an HTTPException with appropriate status code and message
        raise HTTPException(status_code=500, detail="Internal Server Error")
