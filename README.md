# Next.js Open Jira Application

To run locally, you start db

```
docker-compose up -d 
```
* -d, means __detached__

MongoDB URI db local:


```
mongo://localhost:27027/entries-db
```

## For enviroment variables config, rename file  __.env.template__ a __.env__

## Rebuild node modules

```
yarn install
yarn dev

```

## Fill database with test data

```
http://localhost:3000/api/seed
```

