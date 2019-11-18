# base image
FROM node:12.2.0

RUN apt-get update

RUN apt-get install -y wget && \
    apt-get install -y curl && \
    apt-get install -y nano

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install

RUN npm install -g nodemon

# add app
COPY . /app

EXPOSE 8080

# start app
#CMD [ "npm","start" ]

CMD nodemon -L watch servidor/server.js