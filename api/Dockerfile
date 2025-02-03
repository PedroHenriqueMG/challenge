FROM node:20.18.2-alpine

WORKDIR /api

RUN apk add --no-cache openssl

COPY package*.json /api/

RUN npm install -g npm@11.1.0

COPY . .

RUN npm install

EXPOSE 3333

ENTRYPOINT ["sh", "-c", "npx prisma db push && npm run dev"]