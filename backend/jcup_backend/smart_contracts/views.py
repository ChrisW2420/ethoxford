from rest_framework import generics, permissions, response, status, views
from .serializers import SmartContractSerializer
from .models import SmartContractModel

class SmartContractCreate(views.APIView):
  def post(self, request, format=None):
    serializer = SmartContractSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save(user = self.request.user)
      return response.Response(serializer.data, status=status.HTTP_200_OK)
    else:
      return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
  permission_classes = (permissions.IsAuthenticated,)

class SmartContractList(generics.ListAPIView):
  serializer_class = SmartContractSerializer
  queryset = SmartContractModel.objects.all()
  permission_classes = (permissions.AllowAny,)

class SmartContractDetail(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = SmartContractSerializer
  queryset = SmartContractModel.objects.all()
  permission_classes = (permissions.AllowAny,)