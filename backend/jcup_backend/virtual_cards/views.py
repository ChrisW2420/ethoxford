from rest_framework import generics, permissions, response, status, views
from .serializers import VirtualCardSerializer
from .models import VirtualCardModel

class VirtualCardCreate(views.APIView):
  def post(self, request, format=None):
    serializer = VirtualCardSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save(user = self.request.user)
      return response.Response(serializer.data, status=status.HTTP_200_OK)
    else:
      return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
  permission_classes = (permissions.IsAuthenticated,)

class VirtualCardList(generics.ListAPIView):
  serializer_class = VirtualCardSerializer
  queryset = VirtualCardModel.objects.all()
  permission_classes = (permissions.AllowAny,)

class VirtualCardDetail(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = VirtualCardSerializer
  queryset = VirtualCardModel.objects.all()
  permission_classes = (permissions.AllowAny,)