# Polyteach-back

## Description

This project is the main backend API for the Polytech project.
You can find the related projects at:

* https://github.com/yannick-mayeur/polyteach-front
* https://github.com/Alexis559/polyteach-video

## Requirements

* Docker
* docker-compose


## Steps to use

### Set up env

Before launching the project there are several variables you have to set up:

Locally this can be done with dotenv.

```
PGHOST // Host of database
PGPORT // Port of database
PGDATABASE // Database name
PGUSER // Username for database
PGPASSWORD // Password for database
DD_API_KEY // Only for production
SESSION_SECRET // secret for OAuth
OPENVIDU_URL // Url for the openvidu-kms-server
NODE_ENV // production, development, staging
```

For local dev the basic setup is:

```
PGHOST='db'
PGUSER='admin'
PGDATABASE='polyteach-db'
PGPASSWORD='foobar'
PGPORT=5432
SESSION_SECRET='VLRS2ETbWgEU4fJv'

```


### Launch the project
```
$ git clone https://github.com/yannick-mayeur/polyteach-front
$ cd polyteach-front
$ docker-compose build
$ docker-compose up
$ cat dump.sql | docker exec -i polyteach-back_db_1 psql -U admin -d polyteach-db
```

You can then access the API at `http://localhost:3000/`. A list of all
available roots is available with GET `/`.
