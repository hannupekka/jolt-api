FROM node:8.8

WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .

ENV FUM_API_URL ""
EXPOSE 8000
CMD [ "npm", "start" ]
