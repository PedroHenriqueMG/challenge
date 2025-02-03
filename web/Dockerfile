FROM node:20.18.2-alpine as build-stage

WORKDIR /web

COPY package*.json /web/

RUN npm install -g npm@11.1.0

RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build-stage /web/dist .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]