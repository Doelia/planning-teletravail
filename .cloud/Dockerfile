FROM node:14

EXPOSE 3000

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

RUN mkdir var

COPY public public
COPY app.js app.js

CMD [ "node", "app.js" ]
