from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .pymongo_client import collection
from bson.objectid import ObjectId
from datetime import datetime


@api_view(["GET"])
def getallemployee(request):
    employees = list(collection.find({}))

    # Convert ObjectId to string for each employee
    for emp in employees:
        emp["_id"] = str(emp["_id"])

    return Response(employees)


# @api_view(["POST"])
# def create_employee(request):
#     data = request.data
#     if collection.find_one({"employee_id": data.get("employee_id")}):
#         return Response({"error": "employee_id must be unique"}, status=400)
#     collection.insert_one(data)
#     return Response(data, status=status.HTTP_201_CREATED)

from bson import ObjectId

@api_view(["POST"])
def create_employee(request):
    data = dict(request.data)  # make sure it's a plain dict

    if collection.find_one({"employee_id": data.get("employee_id")}):
        return Response({"error": "employee_id must be unique"}, status=400)
    
    data["skills"] = [s.strip() for s in data.get("skills", [])]

    if "salary" in data:
        data["salary"] = float(data["salary"]) if data["salary"] else None

    result = collection.insert_one(data)  # insert document

    # Fetch inserted document by its _id
    new_emp = collection.find_one({"_id": result.inserted_id})
    new_emp["_id"] = str(new_emp["_id"])  # convert ObjectId to string

    return Response(new_emp, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def get_employee(request, employee_id):
    emp = collection.find_one({"employee_id": employee_id})
    if not emp:
        return Response({"error": "Not found"}, status=404)
    emp["_id"] = str(emp["_id"])
    return Response(emp)


@api_view(["PUT"])
def update_employee(request, employee_id):
    print(f"updating employee {employee_id}...")
    data = dict(request.data)

  
    if "_id" in data:
        data.pop("_id")

   
    if "employee_id" in data:
        data.pop("employee_id")

    data["skills"] = [s.strip() for s in data.get("skills", [])]
    result = collection.update_one(
        {"employee_id": employee_id},   
        {"$set": data}                  
    )
    
    if "salary" in data:
        data["salary"] = float(data["salary"]) if data["salary"] else None

    if result.matched_count == 0:
        return Response({"error": "Not found"}, status=404)

    emp = collection.find_one({"employee_id": employee_id})
    emp["_id"] = str(emp["_id"])
    return Response(emp)


@api_view(["DELETE"])
def delete_employee(request, employee_id):
    result = collection.delete_one({"employee_id": employee_id})
    if result.deleted_count == 0:
        return Response({"error": "Not found"}, status=404)
    return Response({"message": "Deleted successfully"})

@api_view(["GET"])
def list_by_department(request, departmentname):
    employees = list(
        collection.find({"department": departmentname}).sort("joining_date", -1)
    )
    for e in employees:
        e["_id"] = str(e["_id"])
    return Response(employees)


@api_view(["GET"])
def avg_salary(request):
    pipeline = [
        {"$group": {"_id": "$department", "avg_salary": {"$avg": "$salary"}}},
        {"$sort": {"_id": 1}},  # 1 = ascending, -1 = descending
    ]
    result = list(collection.aggregate(pipeline))
    formatted = [{"department": r["_id"], "avg_salary": r["avg_salary"]} for r in result]
    return Response(formatted)


@api_view(["GET"])
def search_by_skill(request,skills):
    # skill = request.GET.get("skill")
    employees = list(collection.find({"skills": skills}))
    for e in employees:
        e["_id"] = str(e["_id"])    
    return Response(employees)