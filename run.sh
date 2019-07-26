#!/bin/bash

cd StreamDownloader
sequelize db:migrate
node index.js &
cd ../TimeShift
node app.js 