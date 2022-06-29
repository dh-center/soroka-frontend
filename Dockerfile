FROM node:lts-alpine AS builder

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL ${REACT_APP_API_URL}

WORKDIR /opt/app
COPY . /opt/app

RUN npm install

RUN npm run build

FROM nginx:stable-alpine AS prod

COPY --from=builder /opt/app/build /usr/share/nginx/html
COPY default.conf  /etc/nginx/conf.d/default.conf

FROM node:lts AS dev

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL $REACT_APP_API_URL

WORKDIR /opt/app
COPY --from=builder /opt/app /opt/app

CMD npm run start