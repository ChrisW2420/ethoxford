"""
URL configuration for jcup_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
from django.urls import path, include
from users import urls as users_urls
from smart_contracts import urls as smart_contracts_urls
from virtual_cards import urls as virtual_cards_urls

urlpatterns = [
    # path("admin/", admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('users/', include(users_urls)),
    path('smart_contracts/', include(smart_contracts_urls)),
    path('virtual_cards/', include(virtual_cards_urls))
]
