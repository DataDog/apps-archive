# Datadog Redis App

## Prerequesites

- Docker and docker-compose
- A Datadog account (even the trial one) with a Datadog API key

## Installation Steps

- Clone the repo.
- Copy the .env.example file and create an .env file. You will have to fill in
  your datadog API Key
- Run `docker-compose build` to build your docker infrastructure
- Run `docker-compose up` to run all your containers
- Finally run your flask and react apps (see the useful commands below).

## Useful commands

### Docker commands
- `docker container ls` - Display your running docker containers.

It should display like below:

```
CONTAINER ID   IMAGE                     COMMAND                  CREATED          STATUS                    PORTS                    NAMES
b05000fb8024   redis-x-datadog_flask     "python3"                10 minutes ago   Up 10 minutes             0.0.0.0:5000->5000/tcp   redis-x-datadog-flask-1
dd1e3115abbc   redis-x-datadog_react     "docker-entrypoint.s…"   10 minutes ago   Up 10 minutes             0.0.0.0:3010->3010/tcp   redis-x-datadog-react-1
30d9f60dcd6e   redis-x-datadog_datadog   "/bin/entrypoint.sh"     11 minutes ago   Up 10 minutes (healthy)   8125/udp, 8126/tcp       redis-x-datadog-datadog-1
8a70b4ca9795   redis                     "docker-entrypoint.s…"   4 days ago       Up 10 minutes             6379/tcp                 redis-x-datadog-redis-1
```


### Flask Container
- `docker container run exec -ti ${yourFlaskContainerId - b05000fb8024 for example} bash` - Access your Python/Flask container 
- `flask run` - Launch your flask Micro Api

Please note:
- it will run on the port 5000.

### React Container
- `docker container run exec -ti ${yourReactContainerId - dd1e3115abbc} bash` -
  Access your React container
- `yarn start` - Launch your react app

Please note:
- `yarn` is installed by default on your docker cotnainer.
- The project will run on port 3010, so please open your browser on
  http://localhost:3010

### Redis Container
- To access your redis container, run `docker container exec -ti
  ${yourContainerId} redis-cli`, then:
  - `keys *` - Get all the redis keys
  - `get key:10` - Get the value of the key **key:10**
  - `debug populate 100` - Populate your redis with 100 redis keys.
- To launch a redis benchmark, run `docker container exec -ti ${yourContainerId} redis-benchmark`

## Architecture Diagram

@TODO

## Resources

- [Monitor Redis using Datadog](https://www.datadoghq.com/blog/monitor-redis-using-datadog/)
- [How to monitor Redis performance metrics](https://www.datadoghq.com/blog/how-to-monitor-redis-performance-metrics/)
- [Understanding The Top 5 Redis Performance Metrics Guide](https://www.datadoghq.com/resources/understanding-the-top-5-redis-performance-metrics-guide/)
- [How to Benchmark the Performance of a Redis Server](https://www.digitalocean.com/community/tutorials/how-to-perform-redis-benchmark-tests)
- [7 Redis Worst Practices](https://redis.com/blog/7-redis-worst-practices/)
- https://realpython.com/python-redis/

## Use Cases

- Recuperer les cles les plus anciennes || les cles qui existent depuis trop
  longtemps (genre une semaine)
- Mettre des patterns dans le recherche type regex
- Mauvaise ecriture et/ou lecture des redis:
  - j'ecris d'une certaine facon
  - je lis d'une autre facon

- Exemples de commande:
  - `redis-cli -h redis-01 -p 6380 --scan --pattern site:5675:userKeys* | xargs -n 1 redis-cli -h redis-01 -p 6380 del`
- Tout ce qui est relatif aux queues

