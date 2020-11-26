from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('wechat/token/', views.wechat_token, name='wechat_token_obtain_pair'),
    path('wechat/component-verify-ticket/', views.wechat_component_verify_ticket,
         name='wechat_component_verify_ticket'),
]
