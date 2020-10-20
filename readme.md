# Project Description
this is a gateway server where the authorization header is verified

## Get started

### Clone the repo

```shell
git clone
cd gateway
```

### Install npm packages

Install the `npm` packages described in the `package.json` and verify that it works:

```shell
npm install
npm start
```


# Getting started

1. Go to project folder and install dependencies:
 ```bash
 npm install
 ```
 
2. Launch development server, and open `localhost:` in your browser:
 ```bash
 ng serve
 ```
 ## Using Docker
 ```docker
 cd gway
 docker build
 docker run
 ```

# Project structure

```
dist/                        compiled version
docs/                        project docs and coding guides
e2e/                         end-to-end tests
src/                         project source code
|- app/                      app components
|  |- routes/
   |  |- login
      |- oauth
      |- signin
|  |- congig.js              contains the keys and secrets for the requests
|  |- serve.js               app root component
```

# Main tasks

Task automation is based on [NPM scripts](https://docs.npmjs.com/misc/scripts).

Tasks                         | Description
------------------------------|---------------------------------------------------------------------------------------
npm start                     | Run development server on `http://localhost:4200/`
npm run build [-- --env=prod] | Lint code and build app for production in `dist/` folder

When building the application, you can specify the target environment using the additional flag `--env <name>` (do not
forget to prepend `--` to pass arguments to npm scripts).

The default build environment is `prod`.
## routes

Routes          | Description
----------------|---------------------------------------------------------------------------------------
login           |  calls the auth server with route oauth2/authorize to authorize a user
signin          | calls the auth server with route registration to register and create a user
oauth           | this calls the token route to get the token after getting the acces key
user            | calls the auth server with route oauth2/userinfo to get user data

 
#### Technologies

- [Nodejs]()

#### Other documentation

- [Using a backend proxy for development](docs/backend-proxy.md)
