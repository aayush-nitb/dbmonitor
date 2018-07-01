"use strict";
var express = require('express');
var request = require('superagent');
var CronJob = require('cron').CronJob;
var _ = require('underscore');
var Api_Module = (function () {
    function Api_Module() {
    }
    Api_Module.serve = function () {
        new CronJob('0 */10 * * * *', function () {
            var now = new Date();
            console.log("Current Time: " + now.getHours() + ":" + now.getMinutes());
            if (now.getHours() > 10 && now.getHours() < 19) {
                console.log("Ping dbcron");
                request.get("https://dbcron.herokuapp.com").end(function (err, result) {
                    console.log(result);
                });
            }
        }, function () {
            console.log("Monitor Ended!!");
        }, true, 'Asia/Kolkata', null, true);
        var port = process.env.PORT || 3002;
        var app = express();
        app.get('/', function (req, res) { return res.send('Monitor Job is up!'); });
        app.listen(port, function () {
            console.log('Monitor started on ' + port);
        });
    };
    return Api_Module;
}());
exports.Api_Module = Api_Module;

//# sourceMappingURL=Api_Module.js.map
