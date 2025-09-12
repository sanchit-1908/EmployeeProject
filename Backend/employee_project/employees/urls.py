from django.urls import path
from . import views

urlpatterns = [
    path("", views.getallemployee),
    path("create", views.create_employee),
    path("department/<str:departmentname>", views.list_by_department),
    path("avg_salary", views.avg_salary),
    path("search/<str:skills>", views.search_by_skill),
    path("<str:employee_id>", views.get_employee),
    path("<str:employee_id>/update", views.update_employee),
    path("<str:employee_id>/delete", views.delete_employee),
    
    
]
