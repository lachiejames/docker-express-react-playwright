FROM node:16.15

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

EXPOSE 5000

# Use node directly instead of yarn to avoid signal handling issues
CMD ["node", "dist/index.js"]
