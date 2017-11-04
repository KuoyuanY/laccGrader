from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^rubric/', views.rubric, name='rubric'),
    ]
