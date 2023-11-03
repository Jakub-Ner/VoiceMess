from .models import Vocoder

from rest_framework import serializers


class VocoderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vocoder
        fields = "__all__"
