FROM node:lts-alpine AS builder

WORKDIR /opt/app
COPY . /opt/app

RUN npm install

RUN npm run build

FROM nginx:stable-alpine AS prod

COPY --from=builder /opt/app/build /usr/share/nginx/html

FROM node:lts AS dev

WORKDIR /opt/app
COPY --from=builder /opt/app /opt/app

CMD npm run start