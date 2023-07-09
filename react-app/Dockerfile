# Specifies the base image from Docker Hub. We're using the official Node.js image at version 16.15.
FROM node:16.15

# Sets the working directory in the container to /app.
WORKDIR /app

# Copies package.json and yarn.lock from your current directory (host machine) to the present location (inside the container) to manage dependencies.
COPY package.json yarn.lock ./

# Installs all the dependencies as specified by the lock file.
RUN yarn install --frozen-lockfile

# Copies the rest of your application code from your current directory (host machine) to the present location inside the container.
COPY . .

# Compiles the application.
RUN yarn build

# Specifies the command to start the React app using 'yarn start', which starts a development server with features such as live reloading, suitable for the testing environment.
CMD ["yarn", "start"]
