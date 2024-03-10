from rest_framework import generics, permissions, response, status, views
from .serializers import SubscriptionSerializer
from .models import SubscriptionModel

class SubscriptionCreate(views.APIView):
  def post(self, request, format=None):
    serializer = SubscriptionSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save(user = self.request.user)
      return response.Response(serializer.data, status=status.HTTP_200_OK)
    else:
      return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
  permission_classes = (permissions.IsAuthenticated,)

class SubscriptionList(generics.ListAPIView):
  serializer_class = SubscriptionSerializer
  queryset = SubscriptionModel.objects.all()
  permission_classes = (permissions.AllowAny,)

class UserSubscriptionList(generics.ListAPIView):
  serializer_class = SubscriptionSerializer
  def get_queryset(self):
    user = self.request.user
    queryset = SubscriptionModel.objects.filter(user=user)
    return queryset

    return SubscriptionModel.objects.none()
  
  permission_classes = (permissions.IsAuthenticated,) # only allow admin user to see all pages

class SubscriptionDetail(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = SubscriptionSerializer
  queryset = SubscriptionModel.objects.all()
  permission_classes = (permissions.AllowAny,)