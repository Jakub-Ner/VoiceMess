from django.urls import path

from .views import CustomerViewSet

urlpatterns = [
    path("", CustomerViewSet.as_view({"get": "list", "post": "create"}), name='customer-list'),
    path("<str:pk>/", CustomerViewSet.as_view({"get": "retrieve", "patch": "update", "delete": "destroy"}), name='customer-list'),
]
