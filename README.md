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

### Project requirements

- an endpoint `http://localhost:8080/romannumeral?query={integer}`
- `query` parameter type integer between 1 and 255
- `romannumeral` should return text with roman numeral value or send an error

#### Project extension

Extension 1:

- ability to expand the `query` parameter limits to 3999

Extension 2:

- Vinculum addition using UTF-8
- expand the `query` parameter limits to *2,200,000,000*

Valid character set:

```text
    I V X L C D M
    I̅ V̅ X̅ L̅ C̅ D̅ M̅ vinculum x 1,000,000
    I̿ V̿ X̿ L̿ C̿ D̿ M̿ vinculum double x 1,000,000
```

### Examples

```text
GET 'http://localhost:8080/romannumeral?query=58' // LVIII
GET 'http://localhost:8080/romannumeral?query=3999&extension=1' // MMMCMXCIX
GET 'http://localhost:8080/romannumeral?query=4000000&extension=2' // I̿V̿
```

### Testing methodology

Integration Test:

- Server should run on port `8080`
- Server should have an `/romannumeral` endpoint for `GET` method
- Server should return http erros `404` for every other endpoint
- Server should return http status `200` or `400` on `/romannumeral`

Unit testing:

- Converter should be able to transform integer to roman numeral with limit values

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

Web server is defined on entry point `src/index.js`

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
