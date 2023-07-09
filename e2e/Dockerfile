# Use the "node:16.15" and "mcr.microsoft.com/playwright:focal" images as base images.
FROM node:16.15
FROM mcr.microsoft.com/playwright:focal
 
# Set the working directory inside the container.
WORKDIR /app

# Copy "package.json" and "yarn.lock" from the current directory to the working directory inside the container.
COPY package.json yarn.lock ./

# Install the dependencies listed in "package.json" and "yarn.lock".
RUN yarn install --frozen-lockfile

# Install the system dependencies needed by Playwright.
RUN npx playwright install-deps

# Install the Playwright CLI.
RUN npx playwright install

# Copy everything from the current directory to the working directory inside the container.
COPY . .
