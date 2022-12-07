# warehouse backend service

---

## Getting Started

Warehouse Backend service consists of

- Backend service that is a GRAPHQL node js API

- It controlls all the backend management on warehouse platform.

## System Dependencies

- Mongo

- Node js version v16.13.0

## How to set up and run locally

- Install all system dependencies locally or remotely

- Clone and cd this repo

- Install application dependencies with : npm install

- Start application: npm start

- to make js build: npm run build-ts

## Configuration

### All configuration

- Configuration file is located config/index.js

- Configuration file contains different configuration blocks for different environments.

### All api documentation.

- all functions are in app/v1/modules/user/graphql_schema.graphql
- urls for all routes: {BASE_URL}/api/v1/deadend
- the request will be always POST

- user_signup: for signing up new users
  - parameters: phone_number,password,name
  - body: {query:`mutation{user_signup(userInput:{phone_number:"1234567890",password:"warehouse123",name:"test"}){success status message}}`}
  - this returns: {success:boolean value,status:status code,message:"some message"}
