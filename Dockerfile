FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm ci

COPY . .

# Start the server
CMD [ "node", "dist/main" ]