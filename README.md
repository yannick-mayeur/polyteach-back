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

```
$ git clone https://github.com/yannick-mayeur/polyteach-front
$ cd polyteach-front
$ docker-compose build
$ docker-compose up
$ cat dump.sql | docker exec -i polyteach-back_db_1 psql -U admin -d polyteach-db
```

You can then access the API at `http://localhost:3000/`. A list of all
available roots is available with GET `/`.
