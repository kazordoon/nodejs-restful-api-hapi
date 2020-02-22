
# nodejs-restful-api-hapi

RESTful API made with Node.js where a user can list, create, update and delete products that are stored in a database. You will need a token, which will be received when you log in, so that it can handle the products.

## Getting Started

### Prerequisites

- MongoDB
- Node.js
- NPM / Yarn

### Installing

- Clone the repository: `https://github.com/kazordoon/nodejs-restful-api-hapi.git`
- Get in the project directory: `cd nodejs-restful-api-hapi.git`
- Install the dependencies:
	- NPM: `npm i` | Remove the file `yarn.lock` before installing with NPM
	- Yarn: `yarn`

### Setting environment variables

Copy the `.env.example` file to the` .env`, then you will need to set the variable values ​​according to your environment.

### Running the server

* NPM: `npm run dev`
* Yarn: `yarn dev`

## Built With

* [Node.js](https://nodejs.org) - JavaScript runtime environment that executes JavaScript code server-side
* [MongoDB](https://www.mongodb.com/) - NoSQL Database
* [mongoose](https://mongoosejs.com) - MongoDB object modeling tool
* [@hapi/hapi](https://hapi.dev) - HTTP server framework
* [@hapi/boom](https://hapi.dev/family/boom) - HTTP-friendly error objects
* [@hapi/joi](https://hapi.dev/family/joi/) - Data validator for JavaScript
* [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - A library to help you hash passwords
* [dotenv-safe](https://github.com/rolodato/dotenv-safe) - Load environment variables into .env file
* [hapi-auth-jwt2](https://github.com/dwyl/hapi-auth-jwt2) - Authentication scheme/plugin for Hapi.js apps using JSON Web Tokens
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - An implementation of JSON Web Tokens

## Versioning

For the versions available, see the [tags on this repository](https://github.com/kazordoon/nodejs-restful-api-hapi/tags). 

## Authors

* **Felipe Barros** - *Initial work* - [kazordoon](https://github.com/kazordoon)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
