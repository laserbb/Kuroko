from django.shortcuts import render
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView, RetrieveAPIView
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from knox.models import AuthToken
from knox.auth import TokenAuthentication
from user_auth.serializers import LoginSerializer, UserCreateSerializer, UserCommonSerializer


class UserCreateView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer


class UserSingleView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer


class LoginAPIView(CreateAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "token": AuthToken.objects.create(user)[1]
        })


class UserRetrieveView(RetrieveAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = UserCommonSerializer

    def retrieve(self, request, *args, **kwargs):
        print(request.user)
        return Response(UserCommonSerializer(request.user).data)

