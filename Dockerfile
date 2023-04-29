FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

# Start the server
CMD [ "node", "server.js" ]