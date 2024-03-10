from django.urls import path
from .views import SmartContractCreate, SmartContractDetail, SmartContractList

urlpatterns = [
    path('', SmartContractList.as_view(), name="Smart Contract list"),
    path('create/', SmartContractCreate.as_view(), name = "Smart Contract create"),
    path('<uuid:pk>/', SmartContractDetail.as_view(), name = "Smart Contract detail"),
]
