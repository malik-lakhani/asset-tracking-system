FROM node:6-alpine

ADD ./ /app/
ADD ./package.json /app/package.json
ADD ./ /app/npm-debug.log

WORKDIR /app

# Expose the application on port 8080
EXPOSE 8080

RUN npm install

CMD [ "npm", "start" ]
