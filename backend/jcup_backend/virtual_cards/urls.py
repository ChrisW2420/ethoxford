from django.urls import path
from .views import VirtualCardCreate, VirtualCardDetail, VirtualCardList

urlpatterns = [
    path('', VirtualCardList.as_view(), name="Virtual Card list"),
    path('create/', VirtualCardCreate.as_view(), name = "Virtual Card create"),
    path('<uuid:pk>/', VirtualCardDetail.as_view(), name = "Virtual Card detail"),
]
