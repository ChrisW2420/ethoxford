# ethoxford
frontend
npx http-server

cd backend
make a venv

pip install django django-cors-headers djangorestframework-simplejwt djangorestframework

cd jcup_backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 0.0.0.0:8000