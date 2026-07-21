from rest_framework import serializers
from .models import Registration


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ['email', 'password', 'age']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_age(self, value):
        if value < 0:
            raise serializers.ValidationError("Age must be positive.")
        if value < 18:
            raise serializers.ValidationError("Must be at least 18 years old.")
        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError(
                "Password must be at least 8 characters.")
        return value
