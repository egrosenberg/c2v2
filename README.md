Prerequisites:

- Docker
- npm

(This project was created on a Centos10 machine and I have not confirmed workflows for other operating systems)

Install postgres docker image

```bash
docker pull postgres
```

Set up docker containers

```bash
# Create docker network
docker network create --subnet=10.5.0.0/16 celestus_net

# Create postgres docker server
docker run --name postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=celestus -d --net celestus_net --ip 10.5.0.6 -p 5432:5432 postgres
```

Install modules

```bash
npm i
```

Maintaining DB

```bash
# Generate migration files
npm run migrate:gen

# Run migrations
npm run migrate:run

# Empty out DB tables
npm run db:truncate

# Run seeding functions
npm run db:seed
```

This software is provided "as is" and free of charge. See `LICENSE.txt` for more information.
