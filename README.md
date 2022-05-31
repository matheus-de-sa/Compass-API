
## Activity Compass

#### Install dependencies

```
  npm install
```

#### Run project in development mode

```
  npm run dev
```

#### Build project

```
  npm run build
```

#### Run project after build

```
  npm run start
```

#### Run tests

```
  npm run test
```

#### Build this project

## API Documentation

### Cities

#### Returns all cities based on name or state

```http
  GET /api/cities?name=Joinville&state=SC
```

| QueryParams   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | City name (Optional)|
| `state` | `string` | State name (Optional)|

+ Response 200 (application/json)

      
      {
          "_id": "6293839eb5db1a944dfe3fda",
          "name": "Joinville",
          "state": "SC",
          "createdAt": "2022-05-29T14:30:54.532Z",
          "updatedAt": "2022-05-29T14:30:54.532Z",
          "__v": 0
      }
      

#### Create a city

```http
  POST /api/cities
```

| Body   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | City name (Required)|
| `state` | `string` | State name (Required)|

+ Request (application/json)

      {
          "name": "Joinville",
          "state": "SC"
      }

+ Response 200 (application/json)

      {
          "_id": "6293839eb5db1a944dfe3fda",
          "name": "Joinville",
          "state": "SC",
          "createdAt": "2022-05-29T14:30:54.532Z",
          "updatedAt": "2022-05-29T14:30:54.532Z",
          "__v": 0
      }

### Clients

#### Returns all clients based on id or name

```http
  GET /api/clients?id=6293b9f5586ffd821da79941
```

| QueryParams   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | Client id (Optional)|
| `name` | `string` | Client name (Optional)|

+ Response 200 (application/json)

      
      {
        "name": "Carlos Thomio",
        "sex": "Masculino",
        "birthday": "15/09/2000",
        "age": 21,
        "city": {
            "_id": "6293839eb5db1a944dfe3fda",
            "name": "Joinville",
            "state": "SC",
            "createdAt": "2022-05-29T14:30:54.532Z",
            "updatedAt": "2022-05-29T14:30:54.532Z",
            "__v": 0
        },
        "_id": "6293b9f5586ffd821da79941",
        "createdAt": "2022-05-29T18:22:45.929Z",
        "updatedAt": "2022-05-29T18:22:45.929Z",
        "__v": 0
      }
      

#### Create a client

```http
  POST /api/clients
```

| Body   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | Client name (Required)|
| `sex` | `string` | Client sex (Required)|
| `birthday` | `string` | Client birthday (Required)|
| `age` | `string` | Client age (Required)|
| `city` | `string` | Client cityID (Required)|

+ Request (application/json)

      {
          "name": "Carlos Thomio",
          "sex": "Masculino",
          "age": 21,
          "birthday": "15/09/2000",
          "city": "6293839eb5db1a944dfe2fda"
      }

+ Response 200 (application/json)

      {
        "name": "Carlos Thomio",
        "sex": "Masculino",
        "birthday": "15/09/2000",
        "age": 21,
        "city": "6293839eb5db1a944dfe3fda",
        "_id": "6293b9f5586ffd821da79941",
        "createdAt": "2022-05-29T18:22:45.929Z",
        "updatedAt": "2022-05-29T18:22:45.929Z",
        "__v": 0
      }

#### Update name of client

```http
  POST /api/clients/:id
```
| Params   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | Client id (Required)|

| Body   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | Client name (Required)|

+ Request (application/json)

      {
          "name": "Carlos da Silva",
      }

+ Response 200 (application/json)

      "O nome do cliente id 6293b9f5586ffd821da79941 foi alterado!"

#### Delete client

```http
  DELETE /api/clients/:id
```
| Params   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | Client id (Required)|

+ Response 200 (application/json)

      "Cliente id 6293bbe9b36974c49288dcc8 excluído!"
      
