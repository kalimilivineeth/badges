'use-strict'
const config = require('config');
const moment = require('moment');

var getTimestamp = function () {
    return moment.utc().format(config.dateFormat);
}

var getYesterdayTimestamp = function () {
    return moment().subtract(1, "days").utc().format(config.dateFormat);
}

exports.getTimestamp = getTimestamp

exports.getYesterdayTimestamp = getYesterdayTimestamp
