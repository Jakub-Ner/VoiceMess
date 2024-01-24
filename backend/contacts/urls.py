from django.urls import path

from .views import ContactViewSet

urlpatterns = [
    path("", ContactViewSet.as_view({"get": "list", "post": "create"}),name="contact-create"),
    path("<str:pk>/", ContactViewSet.as_view({"get": "retrieve", "patch": "update", "delete": "destroy"}),name="contact-update"),
]
