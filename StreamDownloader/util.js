'use strict';
const fs = require('fs')

function ensureExistsDir(path) {
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
}

module.exports = { ensureExistsDir }