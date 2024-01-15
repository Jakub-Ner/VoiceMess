from django.urls import path

from .views import VocoderViewSet, VocoderGenerateView

urlpatterns = [
    path("create/<str:customer_id>", VocoderViewSet.as_view({"post": "create"}), name="vocoder-create"),
    path("list/<str:customer_id>/", VocoderViewSet.as_view({"get": "list"})),
    path("one/<str:pk>/", VocoderViewSet.as_view({"get": "retrieve", "put": "update", "delete": "destroy"})),
    path("generate/", VocoderGenerateView.as_view()),
]
