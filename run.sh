#!/bin/bash

sequelize db:migrate
cd TimeShift
node app.js &
cd ../StreamDownloader
node index.js 