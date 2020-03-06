
# Examples

The URI that will be used as an example is http://localhost:3333

## Curl

### Users

#### Create user
`curl http://localhost:3333/register -H "Content-Type: application/json" -X POST -d "{ \"username\": \"johndoe\", \"password\": \"DKEtR7mcG9YAuEPe\" }"`

Output: 
```JSON
{"success":true,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNTZhMzA4N2EyMDRhMTQ1NDllNTcwMCIsInVzZXJuYW1lIjoiam9obmRvZSIsImlhdCI6MTU4MjczNjEzNiwiZXhwIjoxNTgyNzM5NzM2fQ.IS61091doS1n4H3jFXrxS1PuFlTArD7Jv7cA00Pr4Sk"}
```

#### Login into an account
`curl http://localhost:3333/login -H "Content-Type: application/json" -X POST -d "{ \"username\": \"johndoe\", \"password\": \"DKEtR7mcG9YAuEPe\" }"`

```JSON
{"success":true,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNTZhMzA4N2EyMDRhMTQ1NDllNTcwMCIsInVzZXJuYW1lIjoiam9obmRvZSIsImlhdCI6MTU4MjczNjM0NSwiZXhwIjoxNTgyNzM5OTQ1fQ.2MfHmzH9GPBMNjUaGS3q3KAeRjH68hxkPvWyQ9QJOPw"}
```

### Products

#### Create a new product
`curl http://localhost:3333/products -H "Content-Type: application/json" -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNTZhMzA4N2EyMDRhMTQ1NDllNTcwMCIsInVzZXJuYW1lIjoiam9obmRvZSIsImlhdCI6MTU4MjczNjM0NSwiZXhwIjoxNTgyNzM5OTQ1fQ.2MfHmzH9GPBMNjUaGS3q3KAeRjH68hxkPvWyQ9QJOPw" -X POST -d "{ \"name\": \"Product name\", \"description\": \"A description for the product\", \"price\": \"0.99\" }"`

Output:
```JSON
{"data":{"type":"products","id":"5e56a58d7a204a14549e5701","attributes":{"name":"Product name","description":"A description for the product","price":0.99},"links":{"self":"/products/5e56a58d7a204a14549e5701"}}}
```

#### Update a product
`curl http://localhost:3333/products/5e56a58d7a204a14549e5701 -H "Content-Type: application/json" -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNTZhMzA4N2EyMDRhMTQ1NDllNTcwMCIsInVzZXJuYW1lIjoiam9obmRvZSIsImlhdCI6MTU4MjczNjM0NSwiZXhwIjoxNTgyNzM5OTQ1fQ.2MfHmzH9GPBMNjUaGS3q3KAeRjH68hxkPvWyQ9QJOPw" -X PATCH -d "{ \"name\": \"A new name for the product\" }"`

Output:
```JSON
{"data":{"type":"products","id":"5e56a58d7a204a14549e5701","attributes":{"name":"A new name for the product","description":"A description for the product","price":0.99},"links":{"self":"/products/5e56a58d7a204a14549e5701"}}}
```

#### List all products
`curl http://localhost:3333/products`

Output:
```JSON
{"data":[{"type":"products","id":"5e56a58d7a204a14549e5701","attributes":{"name":"A new name for the product","description":"A description for the product","price":0.99},"links":{"self":"/products/5e56a58d7a204a14549e5701"}}]}
```

#### List a product
`curl http://localhost:3333/products/5e56a58d7a204a14549e5701`

Output:
```JSON
{"data":{"type":"products","id":"5e56a58d7a204a14549e5701","attributes":{"name":"A new name for the product","description":"A description for the product","price":0.99},"links":{"self":"/products/5e56a58d7a204a14549e5701"}}}
```

#### Delete a product
`curl http://localhost:3333/products/5e56a58d7a204a14549e5701 -H "Content-Type: application/json" -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNTZhMzA4N2EyMDRhMTQ1NDllNTcwMCIsInVzZXJuYW1lIjoiam9obmRvZSIsImlhdCI6MTU4MjczNjM0NSwiZXhwIjoxNTgyNzM5OTQ1fQ.2MfHmzH9GPBMNjUaGS3q3KAeRjH68hxkPvWyQ9QJOPw" -X DELETE`

There's not any output
