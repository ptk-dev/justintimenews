from app import app

def application(environ, start_response):
    status='200 OK'
    headers=[('Content-Type', 'text/plain')]
    body=app.wsgi_app(environ, start_response)
    return body