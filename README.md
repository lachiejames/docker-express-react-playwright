# Docker Express React End-to-End Testing with GitHub Actions

This repository contains a sample Express and React application setup using Docker and Docker Compose, with end-to-end tests using Playwright and a Continuous Integration pipeline using GitHub Actions.

## Overview

The repository demonstrates the following:

- Dockerizing Express and React applications
- Building a local environment with Docker Compose
- Implementing end-to-end tests using Playwright
- Building a GitHub Actions pipeline for automated CI testing

## Repository Structure

The repository is structured as follows:

- `/express-app`: Contains the Express backend application and its Dockerfile.
- `/react-app`: Contains the React frontend application and its Dockerfile.
- `/e2e`: Contains the Playwright end-to-end tests and its Dockerfile.
- `docker-compose.yml`: Docker Compose file for setting up the local environment.
- `.github/workflows/e2e-tests.yml`: GitHub Actions workflow for executing the end-to-end tests.

## Usage

To run the local environment, use the following command:

```bash
docker compose up
```

To build the end-to-end tests image:

```bash
docker build -t playwright_tests ./e2e
```

To run the end-to-end tests:

```bash
docker run --name playwright_tests --network=host playwright_tests yarn e2etest:ci
```

## Further Reading

For a detailed guide on how this setup works and how to integrate it into your own projects, check my blog post [Elevate Your CI/CD: Dockerized E2E Tests with GitHub Actions](https://lachiejames.com/elevate-your-ci-cd-dockerized-e2e-tests-with-github-actions/?preview_id=2048&preview_nonce=3477eacf8a&preview=true&_thumbnail_id=2072). The post explains each step of the process and provides additional context and explanation.
