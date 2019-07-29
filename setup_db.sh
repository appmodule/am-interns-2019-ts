#!/bin/bash
#psql -Uappmodule -lqt | cut -d \| -f 1  | grep timeshift
#if [[ $? != 0 ]]; then
sequelize db:create
#fi
sequelize db:migrate