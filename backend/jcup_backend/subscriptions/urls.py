from django.urls import path
from .views import SubscriptionCreate, SubscriptionDetail, SubscriptionList, UserSubscriptionList

urlpatterns = [
    path('all/', SubscriptionList.as_view(), name="Subscription list"),
    path('', UserSubscriptionList.as_view(), name="User Subscription List"),
    path('create/', SubscriptionCreate.as_view(), name = "Subscription create"),
    path('<uuid:pk>/', SubscriptionDetail.as_view(), name = "Subscription detail"),
]
