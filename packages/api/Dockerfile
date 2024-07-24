FROM node:20.15.1-alpine3.20
LABEL maintainer="leon.machens@gmail.com"

EXPOSE 5000

RUN npm install -g yarn
COPY package.json package.json
RUN yarn install

COPY dist dist

CMD ["node", "dist/server.js"]