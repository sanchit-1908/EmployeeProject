from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")  # Local MongoDB
db = client["assessment_db"]
collection = db["employees"]
    