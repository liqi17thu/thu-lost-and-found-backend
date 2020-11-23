import json
from datetime import datetime, timedelta
from django.utils import timezone

from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from django.db import IntegrityError
from django.http import HttpResponse, Http404, HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from thu_lost_and_found_backend import settings
from thu_lost_and_found_backend.helpers.toolkits import delete_instance_medias
from thu_lost_and_found_backend.user_service.models import User, UserVerificationApplication, UserInvitation, \
    UserEmailVerification
from thu_lost_and_found_backend.user_service.serializer import UserSerializer, UserVerificationApplicationSerializer, \
    UserInvitationSerializer, UserEmailVerificationSerializer
from .invitation_template import invitation_template
from ..authentication_service.permission import SuperAdminOnlyPermission


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_destroy(self, instance):
        delete_instance_medias(instance, 'avatar')
        instance.delete()


class UserVerificationApplicationViewSet(viewsets.ModelViewSet):
    queryset = UserVerificationApplication.objects.all()
    serializer_class = UserVerificationApplicationSerializer


class UserInvitationViewSet(viewsets.ModelViewSet):
    queryset = UserInvitation.objects.all()
    serializer_class = UserInvitationSerializer
    permission_classes = [SuperAdminOnlyPermission]

    def create(self, request, *args, **kwargs):

        request.data['token'] = \
            User.objects.make_random_password(length=64,
                                              allowed_chars='abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789')
        if 'expiration_date' not in request.data:
            request.data['expiration_date'] = datetime.now() + timedelta(weeks=2)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Check if user with that email exists
        try:
            User.objects.get(email=request.data['email'])
            return HttpResponseBadRequest(f'User with this "{request.data["email"]}" email already exists.')
        except User.DoesNotExist:
            pass

        self.perform_create(serializer)

        send_mail(subject='THU Lost-and-Found Invitation Link',
                  message='',
                  html_message=invitation_template.format(
                      role=request.data['role'],
                      invitation_link=f'{settings.APP_URL}/#/invitation/f{request.data["token"]}/',
                      expiration_date=request.data['expiration_date'].strftime('%m-%d-%Y')
                  ),

                  from_email=f'"{settings.EMAIL_DISPLAY_NAME}" <{settings.EMAIL_HOST_USER}>',
                  recipient_list=[request.data['email']],
                  fail_silently=False)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(methods=['get', 'post'], url_path=r'register/(?P<token>[\w\d]+)', detail=False)
    def register(self, request, token):
        invitation = get_object_or_404(UserInvitation, token=token)

        if invitation.expiration_date <= timezone.now():
            invitation.delete()
            return Http404()

        if request.method == 'GET':
            invitation_json = json.dumps(UserInvitationSerializer(invitation).data)
            return HttpResponse(invitation_json, content_type='application/json')

        elif request.method == 'POST':
            missing_fields = {}
            contents = json.loads(request.body)
            for field in ["username", "password", "first_name", "last_name"]:
                if field not in contents:
                    missing_fields[field] = ['This field is required.']
            if len(missing_fields) >= 1:
                return HttpResponseBadRequest(json.dumps(missing_fields))

            try:
                new_user = User.objects.create(
                    username=contents['username'],
                    email=invitation.email,
                    password=make_password(contents['password']),
                    first_name=contents['first_name'],
                    last_name=contents['last_name'],
                    is_verified=False,
                    status='ACT',
                    is_staff=True if invitation.role == 'STF' else False,
                    is_superuser=True if invitation.role == 'ADM' else False,
                    date_joined=datetime.now()
                )
            except (IntegrityError, TypeError) as error:
                return HttpResponseBadRequest(error)

            new_user_json = json.dumps(UserSerializer(new_user).data)

            # Remove invitation after creation of user
            invitation.delete()

            return HttpResponse(new_user_json, content_type='application/json')

        else:
            return Http404()


class UserEmailVerificationViewSet(viewsets.ModelViewSet):
    queryset = UserEmailVerification.objects.all()
    serializer_class = UserEmailVerificationSerializer
