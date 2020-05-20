FROM node:12-alpine
WORKDIR '.'
COPY package.json .
# RUN apk add python-dev build-base gcc make
RUN npm install
# RUN apk del python-dev build-base gcc make
COPY . .
CMD ["npm", "run", "start"]

