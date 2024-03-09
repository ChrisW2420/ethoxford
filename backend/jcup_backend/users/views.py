from .models import UserModel
from rest_framework import generics, permissions, response, status, views
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth import authenticate
from jcup_backend import settings
from django.middleware import csrf

# Create your views here.
class UserCreate(generics.CreateAPIView):
  serializer_class = RegisterSerializer
  permission_classes = (permissions.AllowAny,)

class UserList(generics.ListAPIView):
  serializer_class = UserSerializer
  queryset = UserModel.objects.all()
  permission_classes = (permissions.AllowAny,)

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = UserSerializer
  queryset = UserModel.objects.all()
  permission_classes = (permissions.AllowAny,)


def getTokens(user):
  refresh = RefreshToken.for_user(user)

  return {
    'refresh': str(refresh),
    'access': str(refresh.access_token),
  }

class UserSignin(views.APIView):
  permission_classes = (permissions.AllowAny,)
  def post(self, request, format=None):
    data = request.data
    resp = response.Response()
    email = data.get('email', None)
    password = data.get('password', None)
    user = authenticate(email=email, password=password)

    if user is not None:
      if user.is_active:
        data = getTokens(user)
        resp.set_cookie(
          key = settings.SIMPLE_JWT['AUTH_COOKIE'],
          value = data['refresh'],
          max_age = 2678400, # 31 days
          secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
          httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
          samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
          path = settings.SIMPLE_JWT['AUTH_COOKIE_PATH'],
          # domain = settings.SIMPLE_JWT['AUTH_COOKIE_DOMAIN'], # TODO uncomment this when fixed in settings
        )
        csrf_token = csrf.get_token(request)
        resp.data = {
          'message': 'success',
          'access': data['access'],
          'refresh': data['refresh'],
          'csrf': csrf_token,
          'data': {
            'id': user.id,
            'email': user.email,
            'date': user.date,
          }
        }
        
        return resp
      else:
        return response.Response({'message': 'Account not active'}, status=status.HTTP_404_NOT_FOUND)
    else:
      return response.Response({'message': 'Invalid username or password'}, status=status.HTTP_404_NOT_FOUND)