from django.urls import path

from .views import CustomerViewSet

urlpatterns = [
    path("", CustomerViewSet.as_view({"get": "list", "post": "create"})),
    path("<int:pk>/", CustomerViewSet.as_view({"get": "retrieve", "put": "update", "delete": "destroy"})),
]
