from django.contrib.auth.models import User
from rest_framework import serializers
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name']
        # extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        # Đoạn này không phải là tìm mật khẩu mà là băm lại mật khẩu mới
        if 'password' in validated_data:
            instance.set_password(validated_data.pop('password'))
            
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance