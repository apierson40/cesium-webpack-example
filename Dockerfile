FROM node:12-alpine

WORKDIR /app

# copy files and install dependencies
COPY . ./
RUN npm install
RUN npm build

EXPOSE 8080

CMD ["npm", "start"]
