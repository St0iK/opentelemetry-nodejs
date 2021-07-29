FROM node:14-alpine as builder

ARG NPM_AUTH_TOKEN

WORKDIR /source

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

RUN rm -rf node_modules
RUN npm ci --only=production

FROM node:14-alpine

WORKDIR /app

COPY --from=builder /source/package.json /app/package.json
COPY --from=builder /source/node_modules /app/node_modules
COPY --from=builder /source/dist /app/dist

EXPOSE 3000

CMD ["npm", "start"]
