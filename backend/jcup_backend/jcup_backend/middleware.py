from django import http
from django.utils.deprecation import MiddlewareMixin
import json

class YankTokenRefreshFromHeaderIntoTheBody(MiddlewareMixin):

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, *view_args, **view_kwargs):
        if request.path == '/logout/':
            request.COOKIES = {}
        if request.path == '/users/token/refresh/' and 'refresh_token' in request.COOKIES:
            data = json.loads(request.body)
            data['refresh'] = request.COOKIES['refresh_token']
            request._body = json.dumps(data).encode('utf-8')

        return None