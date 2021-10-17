# Server

## Settings

### Docker

. Build docker (fullstack-app/server): `docker build -t muzyk0/fullstack-app:latest .`

### Controlling PostgreSQL service

# s

Once installer has completed installation successfully, following information should hold true for your platform.

. Service name: postgresql-2ndQ-13

Open terminal and type following commands

. Status: `sudo service "postgresql-2ndQ-13" status`
. Start: `sudo service "postgresql-2ndQ-13" start`
. Stop: `sudo service "postgresql-2ndQ-13" stop`

#### postgresql service

. show status of service: `systemctl status postgresql`
. start service: `systemctl start postgresql`
. stop service: `systemctl stop postgresql`
. disable service(not auto-start any more) `systemctl disable postgresql`
. enable service postgresql(auto-start) `systemctl enable postgresql`

### Connect to PostgreSQL via psql

==============================

. Open terminal
. Change directory: cd /opt/2ndQuadrant/PostgreSQL/13/bin
. Connect with PostgreSQL by via psql client: ./psql -U postgres -d postgres -p 5432

Type in your 'postgres' superuser password. This should be the same as supplied during installation on Database Superuser Password screen
Once connected, you can key in SQL queries as you like. Please refer to psql documentation for help on using psql client.

https://www.postgresql.org/docs/9.4/static/app-psql.html

## Solve problems

#### If you can error `listen EADDRINUSE: address already in use :::4000`

First, you would want to know which process is using port 3000

`sudo lsof -i :4000`
this will list all PID listening on this port, once you have the PID you can terminate it with the following:

`kill -9 {PID}`
