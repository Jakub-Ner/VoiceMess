### Django commands:
- `python manage.py createsuperuser` - create superuser in order to use admin panel
- `python manage.py startapp <app_name>` - create new backend module, i.e. new model
- `python manage.py runserver` - run server on localhost:8000
- `python manage.py makemigrations` - generate migration file that reflects changes in models.py
- `python manage.py migrate` - apply changes from migration file to database
- `python manage.py generate` - remove db.sqlite3 and create new one with default data
Admin panel: localhost:8000/admin

#### Remove migrations:
```commandline
rm customer/migrations/000*
rm vocoders/migrations/000*
rm contacts/migrations/000*
```