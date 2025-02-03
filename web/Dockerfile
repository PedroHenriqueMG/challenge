FROM node:20.18.2-alpine

WORKDIR /web

COPY package*.json /web/

RUN npm install -g npm@11.1.0

RUN npm install

COPY . .

EXPOSE 5173

ENTRYPOINT ["sh", "-c", "npm run dev"]