"""skeleton URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from j2a import views

router = routers.DefaultRouter()
router.register(r'insights', views.InsightsViewSet)
router.register(r'articles', views.ArticlesViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('<int:paraphrased>/<int:year_start>-<int:year_end>/<slug:tags>/<slug:prompt>/', views.search_and_filter),
    path('article_details/<int:article_id>/', views.article_details),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    ]
