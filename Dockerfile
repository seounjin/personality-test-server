FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY tsconfig.json ./

RUN npm ci

COPY ./ ./

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]
