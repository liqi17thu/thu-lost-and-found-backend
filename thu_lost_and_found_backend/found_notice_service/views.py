import json
from django.db.models import Max

from django.http import HttpResponseBadRequest, JsonResponse
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.pagination import CursorPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from thu_lost_and_found_backend.found_notice_service.models import FoundNotice
from thu_lost_and_found_backend.found_notice_service.serializer import FoundNoticeSerializer
from thu_lost_and_found_backend.helpers.toolkits import save_uploaded_images, delete_instance_medias


class FoundNoticeViewSet(viewsets.ModelViewSet):
    queryset = FoundNotice.objects.all()
    serializer_class = FoundNoticeSerializer
    pagination_class = CursorPagination
    ordering = ['-updated_at']
    # permission_classes = [IsAuthenticatedOrReadOnly]
    # TODO: Custom property type, templates, author filter
    filterset_fields = ['description', 'status', 'found_datetime', 'found_location']
    search_fields = ['description', 'status', 'found_datetime', 'found_location']

    def create(self, request, *args, **kwargs):
        # request.data['extra'] = '{"author":' + str(request.user.id) + '}'
        request.data['extra'] = '{"author":2}'

        if len(request.FILES) != 0:
            id_max = FoundNotice.objects.all().aggregate(Max('id'))['id__max']
            instance_id = id_max + 1 if id_max else 1
            images_url = save_uploaded_images(request, 'found_notice_images', instance_id=instance_id)
            request.data['images'] = json.dumps({"images_url": images_url})

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # request.data['extra'] = '{"author":' + str(request.user.id) + '}'
        request.data['extra'] = '{"author":2}'

        if len(request.FILES) != 0:
            images_url = save_uploaded_images(request, 'found_notice_images', instance_id=instance.id)
            if instance.images is not None:
                images_url += instance.images
            request.data['images'] = json.dumps({"images_url": images_url})

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_destroy(self, instance):
        delete_instance_medias(instance, 'images', json=True)
        instance.delete()

    # TODO: update json images

    @action(detail=False, methods=['post'], url_path=r'upload-image')
    def upload_image(self, request):
        if 'id' in request.data:
            instance_id = request.data['id']
        else:
            id_max = FoundNotice.objects.all().aggregate(Max('id'))['id__max']
            instance_id = id_max + 1 if id_max else 1

        result = save_uploaded_images(request, 'found_notice_images', instance_id=instance_id)
        if result:
            return Response({'result': result})
        else:
            return HttpResponseBadRequest()
