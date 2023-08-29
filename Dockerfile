FROM node:18-slim

WORKDIR /parser
COPY ./ /parser

RUN npm i
CMD npm run start 