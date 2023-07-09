# Specifies the base image from Docker Hub. We're using the official Node.js image at version 16.15.
FROM node:16.15

# Sets the working directory in the container to /app. All following instructions operate within this directory.
WORKDIR /app

# Copies package.json and yarn.lock from your current directory (host machine) to the present location (inside the container) to manage dependencies.
COPY package.json yarn.lock ./

# Installs all the dependencies as specified by the lock file. The `--frozen-lockfile` option ensures that Yarn throws an error if the yarn.lock file is not up to date with the package.json file.
RUN yarn install --frozen-lockfile

# Copies the rest of your application code from the current directory (host machine) to the present location inside the container.
COPY . .

# Compiles the application.
RUN yarn build

# Exposes port 5000 from the container to the Docker host. This is the port that our express app will run on.
EXPOSE 5000

# Specifies the command to start the express app. We're running the built application using Node.js directly instead of using Yarn or Nodemon to avoid issues with signal handling.
CMD ["node", "dist/index.js"]
