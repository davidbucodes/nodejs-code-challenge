# NodeJS Code Challenge

## Introduction

This project implements a wish sending system.

A wish could be sent if the user is registered and at the allowed age.

The users' data source is the `https://raw.githubusercontent.com/alj-devops/santa-data/master` website.

## Code Frameworks

### API management and views rendering

- `NestJS`: This project utilizes the NestJS framework to define the API routes and used modules.
- `Handlebars`: The UI views are rendered using the Handlebars package.

### Testing frameworks

- `Jest`: Testing framework that manages the tests lifecycle. Tests code coverage is available at the `./coverage/lcov-report/index.html` file after running the coverage tests.

### Code standard frameworks

- `Eslint`: Framework used to various apply code standards.
- `Prettier`: Framework used to apply readability related code standards.

## NPM scripts

- Launching the app: `npm run start`
- Building the app: `npm run build`
- Launching the app (development mode): `npm run start:dev`
- Launching the Storybook app: `npm run storybook`
- Building the Storybook app: `npm run build-storybook`
- Running the tests: `npm run test`
- Running the tests in watch mode: `npm run test:watch`
- Running the tests and collect tests coverage: `npm run test:cov`
- Running the E2E tests: `npm run test:e2e`
- Modifying the code with the Prettier framework: `npm run format`
- Modifying the code with the Eslint framework: `npm run lint`
