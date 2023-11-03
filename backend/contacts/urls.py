from django.urls import path

from .views import ContactViewSet

urlpatterns = [
    path("", ContactViewSet.as_view({"get": "list", "post": "create"})),
    path("<int:pk>/", ContactViewSet.as_view({"get": "retrieve", "put": "update", "delete": "destroy"})),
]
