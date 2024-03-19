from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('upload/',views.index.as_view(),name='index'),
    path('auth/register/',views.RegisterUser.as_view(),name='registerUser'),
    path('auth/login/',views.LoginUser.as_view(),name='loginUser'),
]