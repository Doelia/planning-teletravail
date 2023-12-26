FROM node:20

EXPOSE 3000

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

RUN mkdir var

COPY public public
COPY app.js app.js

CMD [ "node", "app.js" ]
