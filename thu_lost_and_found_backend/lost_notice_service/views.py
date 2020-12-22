import json

from django.db.models import Max, Count
from django.db.models.functions import TruncYear, TruncMonth, TruncDay
from django.utils.dateparse import parse_datetime
from django.http import HttpResponseBadRequest
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.pagination import CursorPagination
from rest_framework.response import Response

from thu_lost_and_found_backend.helpers.toolkits import save_uploaded_images, delete_instance_medias, \
    delete_media_from_url
from thu_lost_and_found_backend.lost_notice_service.models import LostNotice, LostNoticeStatus
from thu_lost_and_found_backend.lost_notice_service.serializer import LostNoticeSerializer


class LostNoticeViewSet(viewsets.ModelViewSet):
    queryset = LostNotice.objects.all()
    serializer_class = LostNoticeSerializer
    pagination_class = CursorPagination
    ordering = ['-updated_at']
    # permission_classes = [NoticePermission]

    filterset_fields = ['status', 'est_lost_start_datetime', 'est_lost_end_datetime',
                        'updated_at', 'created_at',
                        'property__template__type__name', 'property__tags__name',
                        'author__username', 'author__id']

    search_fields = ['description', 'lost_location__name', 'reward',
                     'property__name', 'property__description', 'property__tags__name',
                     'property__template__type__name',
                     'author__username', 'extra']

    def create(self, request, *args, **kwargs):

        # request.data['extra'] = '{"author":' + str(request.user.id) + '}'
        request.data['extra'] = '{"author":2}'
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if len(request.FILES) != 0:
            id_max = LostNotice.objects.all().aggregate(Max('id'))['id__max']
            instance_id = id_max + 1 if id_max else 1
            images_url = save_uploaded_images(request, 'lost_notice_images', instance_id=instance_id)

            request.data['images'] = json.dumps({"images_url": images_url})
            # Update serializer
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
            images_url = save_uploaded_images(request, 'lost_notice_images', instance_id=instance.id)
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
            id_max = LostNotice.objects.all().aggregate(Max('id'))['id__max']
            instance_id = id_max + 1 if id_max else 1

        result = save_uploaded_images(request, 'lost_notice_images', instance_id=instance_id)
        if result:
            return Response({'url': result})

    @action(detail=False, methods=['post'], url_path=r'delete-image')
    def delete_image(self, request):
        if 'url' in request.data:
            image_url = request.data['url']
        else:
            return HttpResponseBadRequest('url is required.')

        try:
            delete_media_from_url(image_url)
            return Response('Image deleted')
        except (ValueError, OSError) as error:
            return HttpResponseBadRequest(error)

    @action(detail=True, methods=['post'], url_path=r'change-status')
    def change_status(self, request, pk):
        notice = LostNotice.objects.get(pk=pk)
        if 'status' not in request.data:
            return Response("status is not specified!")
        status = request.data['status']
        if status not in LostNoticeStatus:
            return Response("not a vaild status")
        notice.status = status
        notice.save()
        return Response('ok')


    @action(detail=False, methods=['get'], url_path=r'stat-timeline')
    def stat_timeline(self, request):
        start_time = parse_datetime(request.data['start_time'])
        end_time = parse_datetime(request.data['end_time'])
        date_type = request.data['type']
        queryset = LostNotice.objects.filter(created_at__range=(start_time, end_time))

        if date_type == 'year':
            queryset = queryset.annotate(month=TruncYear('created_at')).values('year').annotate(count=Count('id')).values('year', 'count')
        if date_type == 'month':
            queryset = queryset.annotate(month=TruncMonth('created_at')).values('month').annotate(count=Count('id')).values('month', 'count')
        else:
            queryset = queryset.annotate(day=TruncDay('created_at')).values('day').annotate(count=Count('id')).values('day', 'count')

        return Response(queryset)

    @action(detail=False, methods=['get'], url_path=r'stat-status')
    def stat_status(self, request):
        queryset = LostNotice.objects.values('status').annotate(count=Count('id')).values('status', 'count')
        return Response(queryset)
