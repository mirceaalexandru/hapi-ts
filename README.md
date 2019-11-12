# Simple HapiJs project

https://travis-ci.org/mirceaalexandru/hapi-ts.svg?branch=master

Table of Contents
=================

   * [Simple HapiJs project](#simple-hapijs-project)
   * [Features](#features)
   * [Implementation details](#implementation-details)
      * [Configuration](#configuration)
         * [Environment variables](#environment-variables)
      * [Swagger documentation](#swagger-documentation)
      * [Endpoint validation](#endpoint-validation)
      * [Logging](#logging)
   * [Testing](#testing)

# Features

A RESTful in-memory discovery service.

The idea is simple: a number of different client applications will periodically send heartbeats to this service, 
and the service keeps track of them, periodically removing those that didn't send any heartbeats in some configured 
time frame.

*Background task*

The service should include a background task that will periodically remove expired instances. 
The "age" of the most recent heartbeat of an instance to be considered expired should be configurable with 
environment variable and have a sensible default value.

# Implementation details

## Configuration

 * Service Configuration is loaded from environment variables.
 * Support for loading from an `.env` file is provided. However the `dotenv` is added as dev dependency making sure that `.env` 
 is not loaded in production as this will be a bad practice.
 * Before service is started a strict schema validation is applied on configuration object. 
 This is required to make sure the application is started with a valid configuration, at least from structure point of view.
 * There is one single configuration defaults - for application data ttl. 
 This will enforce creating proper environment variables for all configuration parameters.
 
### Environment variables

| Variable  | Type      | Default value | Description |
|-----------|-----------|---------------|-------------|
| port      | integer   |               |             |
| host      | string    |               |             |
| env       | string    |               | Service environment |
| applicationTTL | number | 30000       | Application data TTL (ms) |
 
## Swagger documentation

 * Swagger documentation for implemented API is exposed automatically on `/documentation` endpoint.
 * This documentation is created automatically using the HapiJs endpoint validation schema and route details.
 * This documentation is exposed automatically *only* for `development` environments. 
 
## Endpoint validation

 * All endpoints have a strict validation implementing using JOI.
 * This implementation will be automatically described in the Swagger documentation.
 * Validation errors are not exposed in the HTTP response. The validation error reason is only exposed in log.
 
## Logging

 * Logging is done using 'hapi-pino', one of the most rapid logger available for HapiJs.
 * Logger uses a pretty logging style only in development environments.

# Testing

Service has both unit tests and integration tests. These tests cover:
 * Unit test - these tests covers the implementation for internal in-memory storage.
 * Integration tests - these tests covers the endpoint implementation.
 
