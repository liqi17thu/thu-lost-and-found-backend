# chat/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from thu_lost_and_found_backend.user_service.models import User
from .models import Message


# TODO: periodically remove sent message to avoid overwhelming storage.
class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.user = eval(self.scope['url_route']['kwargs']['user'])
        user = User.objects.get(pk=self.user)
        user.channel_name = self.channel_name
        user.save()

        self.accept()

        unsent_messages = Message.objects.filter(receiver=user, sent=False)
        for unsent_message in unsent_messages:
            unsent_message.sent = True
            unsent_message.save()
            self.send(text_data=json.dumps({
                'message': unsent_message.message,
                'sender': unsent_message.sender.id
            }))

    def disconnect(self, close_code):
        user = User.objects.get(pk=self.user)
        user.channel_name = ''
        user.save()

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        sender_id = int(text_data_json['sender'])
        receiver_id = int(text_data_json['receiver'])
        message = text_data_json['message']

        sender = User.objects.get(pk=sender_id)
        receiver = User.objects.get(pk=receiver_id)
        message_obj = Message.objects.create(sender=sender, receiver=receiver, message=message)

        if receiver.channel_name:
            message_obj.sent = True
            async_to_sync(self.channel_layer.send)(
                receiver.channel_name,
                {
                    'type': 'chat.message',
                    'sender': sender_id,
                    'message': message
                }
            )

        message_obj.save()

    # Receive message from room group
    def chat_message(self, event):
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': event['message'],
            'sender': event['sender']
        }))