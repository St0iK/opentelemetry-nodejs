FROM node:16-alpine as builder

ARG NPM_AUTH_TOKEN

WORKDIR /source

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

RUN rm -rf node_modules
RUN npm ci

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /source/package.json /app/package.json
COPY --from=builder /source/node_modules /app/node_modules
COPY --from=builder /source/dist /app/dist

ARG HTTP_PORT=5000
ENV HTTP_PORT=$HTTP_PORT

EXPOSE $HTTP_PORT

CMD ["npm", "start"]
