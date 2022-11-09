from django.conf.urls.static import static
from django.urls import path

from MyCar import settings
from cars import views as cars_views
from user_auth import views as auth_views

urlpatterns = [
    path('api/v1.0/auth/registration/', auth_views.UserCreateView.as_view(), name='index'),
    path('api/v1.0/auth/login/', auth_views.LoginAPIView.as_view()),
    path('api/v1.0/country/', cars_views.CountryCommonView.as_view()),
    path('api/v1.0/cars/search/', cars_views.CarSearchView.as_view()),
    path('api/v1.0/cars/create/', cars_views.CarCreateView.as_view()),
    path('api/v1.0/cars/<int:pk>/', cars_views.CarRetrieveView.as_view()),
    path('api/v1.0/cars/', cars_views.CarListView.as_view()),
    path('api/v1.0/auth/profile/', auth_views.UserRetrieveView.as_view()),
    path('api/v1.0/car/all', cars_views.CarSearchView.as_view()),
    path('api/v1.0/country/all', cars_views.CountryCommonView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
