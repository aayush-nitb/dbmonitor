import * as express from 'express'

let request = require('superagent');
let CronJob = require('cron').CronJob;
let _ = require('underscore');

export abstract class Api_Module {
    static serve() {
        new CronJob(
            '0 * * * * *',
            () => {
                let now = new Date();
                console.log("Current Time: " + now.getHours() + ":" + now.getMinutes());
                if (now.getHours() > 5 && now.getHours() < 14) {
                    console.log("Ping dbcron");
                    request.get("https://dbcron.herokuapp.com").end((err, result) => {
                        if (err) console.log(err);
                        else console.log("Ping dbcron: " + result);
                    });
                }
            }, () => {
                console.log("Monitor Ended!!");
            },
            true,
            'Asia/Kolkata',
            null,
            true
        );
        let port = process.env.PORT || 3002;
        let app: express.Application = express();
        app.get('/', (req, res) => {
            console.log("Monitor Job is up!");
            res.send('Monitor Job is up!');
        });
        app.listen(port, function() {
            console.log('Monitor started on ' + port);
        });
    }
}