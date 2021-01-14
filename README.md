# Integer to Numeral endpoint

## Requirements

- [Node.JS](https://nodejs.org/en/) version 12.13 or greater
  - npm version 6.12

## How to build and run

Before first run make sure to install dependencies.

Server will always try to run on port `8080` if port is used won't launch.

Install project dependencies

```Shell
npm install
```

Run project

```Shell
npm start
```

### Development

Run project with live reload

```Shell
npm run development
```

Run tests, there are integration test and unit test, each one can be run separate or together with the first command

```Shell
npm run test
npm run integration-test
npm run unit-test
```

## Engineering and Testing

Project is based on multitier architecture to split logic on responsabilities

- Logic Tier: `src/controller.js`
- Data tier: `src/models`

Testing methodology used unit testing and integration testing

Web server is defined on entry point `src/index.js`

## Packaging layout

Monolithic package with the following directory structure:

```text
.
│   .gitignore
│   package-lock.json
│   package.json
│   README.md
│           
└───src
    │   controller.js
    │   index.js
    │   
    ├───models
    │       roman.js
    │       
    └───tests
        ├───integration
        │       serverRun.js
        │       
        └───unit
                controller.js
                roman.js
                
```

## Dependencies

[Express](https://expressjs.com/)
: Minimalist web framework for Node.js

[http-errors](https://github.com/jshttp/http-errors)
: Create HTTP errors for Express

### Development Dependencies

[mocha](https://mochajs.org/)
: Feature-rich JavaScript test framework

[chai](https://www.chaijs.com/)
: Chai is a BDD / TDD assertion library for node

[chai-http](https://www.chaijs.com/plugins/chai-http/)
: HTTP integration testing with Chai assertions.

[sinon](https://sinonjs.org/)
: Standalone test spies, stubs and mocks for JavaScript
