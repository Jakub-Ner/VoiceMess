from django.urls import path

from .views import VocoderViewSet

urlpatterns = [
    path("", VocoderViewSet.as_view({"post": "create"})),
    path("list/<str:customer_id>/", VocoderViewSet.as_view({"get": "list"})),
    path("<int:pk>/", VocoderViewSet.as_view({"get": "retrieve", "put": "update", "delete": "destroy"})),
]
