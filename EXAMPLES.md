# Examples

The URI that will be used as an example is http://localhost:3333

## Curl

### Users

#### Register account

```bash
curl localhost:3333/register \
-H 'Content-Type: application/json' \
-d '{ "username": "johndoe", "password": "foobar1234" }'
```

Output:

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDU4YWM5OWI4MjU1MzNiZDE3ZWY0NSIsInVzZXJuYW1lIjoiam9obmRvZSIsImlhdCI6MTU5ODM5MzAzNCwiZXhwIjoxNTk4Mzk2NjM0fQ.qJ8EcBIyTsw2wRE0eCFuw8203IPFINgIqFo8n8W6Jeo"
}
```

#### Login into an account

```bash
curl http://localhost:3333/login \
-H 'Content-Type: application/json' \
-d '{ "username": "johndoe", "password": "foobar1234" }'
```

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDU4YWM5OWI4MjU1MzNiZDE3ZWY0NSIsInVzZXJuYW1lIjoiam9obmRvZSIsImlhdCI6MTU5ODM5MzAzNCwiZXhwIjoxNTk4Mzk2NjM0fQ.qJ8EcBIyTsw2wRE0eCFuw8203IPFINgIqFo8n8W6Jeo"
}
```

### Products

#### Create a new product

```bash
curl http://localhost:3333/products \
-H 'Content-Type: application/json' \
-H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDU4YWM5OWI4MjU1MzNiZDE3ZWY0NSIsInVzZXJuYW1lIjoiam9obmRvZSIsImlhdCI6MTU5ODM5MzA2NCwiZXhwIjoxNTk4Mzk2NjY0fQ.6PV4vsmeqwBdr9Asa5yuKquarfMsa2A6tEozqQB0QgQ' \
-d '{ "name": "Product name", "description": "A description for the product", "price": "0.99" }'
```

Output:

```json
{
  "data": {
    "type": "products",
    "id": "5f458b089b825533bd17ef46",
    "attributes": {
      "_id": "5f458b089b825533bd17ef46",
      "name": "Product name",
      "description": "A description for the product",
      "price": 0.99,
      "__v": 0
    }
  },
  "links": {
    "self": "/products/5f458b089b825533bd17ef46"
  }
}
```

#### Update a product

```bash
curl http://localhost:3333/products/5f458b089b825533bd17ef46 \
-H 'Content-Type: application/json' \
-H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDU4YWM5OWI4MjU1MzNiZDE3ZWY0NSIsInVzZXJuYW1lIjoiam9obmRvZSIsImlhdCI6MTU5ODM5MzA2NCwiZXhwIjoxNTk4Mzk2NjY0fQ.6PV4vsmeqwBdr9Asa5yuKquarfMsa2A6tEozqQB0QgQ' \
-X PATCH \
-d '{ "name": "A new name for the product" }'
```

Output:

```json
{
  "data": {
    "type": "producs",
    "attributes": {
      "name": "A new name for the product"
    }
  },
  "links": {
    "self": "/products/5f458b089b825533bd17ef46"
  }
}
```

#### List products

```bash
curl http://localhost:3333/products
```

Output:

```json
{
  "data": [
    {
      "type": "products",
      "id": "5f458b089b825533bd17ef46",
      "attributes": {
        "_id": "5f458b089b825533bd17ef46",
        "name": "A new name for the product",
        "description": "A description for the product",
        "price": 0.99,
        "__v": 0
      }
    }
  ],
  "links": {
    "self": "/products",
    "first": 1,
    "prev": null,
    "next": null,
    "last": 1
  }
}
```

#### List a specific product

```bash
curl http://localhost:3333/products/5f458b089b825533bd17ef46
```

Output:

```json
{
  "data": {
    "type": "products",
    "id": "5f458b089b825533bd17ef46",
    "attributes": {
      "_id": "5f458b089b825533bd17ef46",
      "name": "A new name for the product",
      "description": "A description for the product",
      "price": 0.99,
      "__v": 0
    }
  },
  "links": {
    "self": "/products/5f458b089b825533bd17ef46"
  }
}
```

#### Delete a product

```bash
curl http://localhost:3333/products/5f458b089b825533bd17ef46 \
-H 'Content-Type: application/json' \
-H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDU4YWM5OWI4MjU1MzNiZDE3ZWY0NSIsInVzZXJuYW1lIjoiam9obmRvZSIsImlhdCI6MTU5ODM5MzA2NCwiZXhwIjoxNTk4Mzk2NjY0fQ.6PV4vsmeqwBdr9Asa5yuKquarfMsa2A6tEozqQB0QgQ' \
-X DELETE
```

There's not any output
