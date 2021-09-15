# Fullstack APP

## Settings

### Controlling PostgreSQL service

==============================

Once installer has completed installation successfully, following information should hold true for your platform.

. Service name: postgresql-2ndQ-13

Open terminal and type following commands

. Status: sudo service "postgresql-2ndQ-13" status
. Start: sudo service "postgresql-2ndQ-13" start
. Stop: sudo service "postgresql-2ndQ-13" stop

### Connect to PostgreSQL via psql

==============================

. Open terminal
. Change directory: cd /opt/2ndQuadrant/PostgreSQL/13/bin
. Connect with PostgreSQL by via psql client: ./psql -U postgres -d postgres -p 5432

Type in your 'postgres' superuser password. This should be the same as supplied during installation on Database Superuser Password screen
Once connected, you can key in SQL queries as you like. Please refer to psql documentation for help on using psql client.

https://www.postgresql.org/docs/9.4/static/app-psql.html
