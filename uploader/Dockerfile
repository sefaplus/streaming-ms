FROM node:18

WORKDIR /app

RUN mkdir /packed

COPY ./packed/. /packed/.

COPY ./uploader/package.json /app/.

RUN yarn cache clean shared

RUN yarn

RUN yarn start:dev