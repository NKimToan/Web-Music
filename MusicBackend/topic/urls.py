from django.urls import path
from . import views

urlpatterns = [
    path("topic/views/",views.TopicListView.as_view(), name="view_topics"),
    path("topic/view/<int:pk>/",views.TopicView.as_view(), name="view_topic"),
    path("topic/",views.TopicCreate.as_view(), name="create_topic"),
    path("topic/update/<int:pk>/",views.TopicUpdate.as_view(), name="update_topic"),
    path("topic/delete/<int:pk>/",views.TopicDelete.as_view(), name="delete_topic")
]