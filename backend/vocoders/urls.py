from django.urls import path

from .views import VocoderViewSet

urlpatterns = [
    path("", VocoderViewSet.as_view({"get": "list", "post": "create"})),
    path("<int:pk>/", VocoderViewSet.as_view({"get": "retrieve", "put": "update", "delete": "destroy"})),
]