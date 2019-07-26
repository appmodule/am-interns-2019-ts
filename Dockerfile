# Create image based on the latest LTS (long term support) version
FROM node:dubnium

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY TimeShift/package*.json ./TimeShift/
COPY StreamDownloader/package*.json ./StreamDownloader/


RUN npm i -g sequelize-cli

WORKDIR /usr/src/app/StreamDownloader
RUN npm install --only=production

WORKDIR /usr/src/app/TimeShift
RUN npm install --only=production

# If you are building your code for production
# RUN npm install --only=production
RUN apt update && apt install -y postgresql-client
# Bundle app source

WORKDIR /usr/src/app
COPY . .

CMD ["./run.sh"]
