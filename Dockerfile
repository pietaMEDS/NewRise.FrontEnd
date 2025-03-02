FROM node

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

EXPOSE 1234

ENTRYPOINT [ "npm", "run", "dev" ]