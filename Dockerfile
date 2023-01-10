FROM node:16-alpine
WORKDIR /usr/app

COPY . .
RUN yarn --frozen-lockfile
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]