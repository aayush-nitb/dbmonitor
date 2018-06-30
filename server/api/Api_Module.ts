import * as express from 'express'

let request = require('superagent');
let CronJob = require('cron').CronJob;
let _ = require('underscore');

export abstract class Api_Module {
    static triggerService(name: string, result, days: number): boolean {
        let service = _.findWhere(result.body, { reference: name });
        if (!service) {
            console.log("Could not fetch service: " + name);
            return false;
        }
        if (!service.lastTriggered) service.lastTriggered = 0;
        let diff = Date.now() - service.lastTriggered;
        console.log(name + " service was last triggered " + diff + " ms ago");
        if (diff < days * 86400000) return false;
        console.log("Triggering service: " + name);
        request.post("https://dbstorestage.herokuapp.com/api/v1/" + name).end((err, result) => {});
        return true;
    }
    static serve() {
        new CronJob(
            '0 */10 * * * *',
            () => {
                request.get("https://dbstorestage.herokuapp.com/api/v1/tasks").end((err, result) => {
                    if (err || !result || !result.body) {
                        console.log("Could not fetch tasks");
                        return;
                    }
                    let running = _.findWhere(result.body, { isComplete: false });
                    if (running) return;
                    request.get("https://dbstorestage.herokuapp.com/api/v1/services").end((err1, result1) => {
                        if (err1 || !result1 || !result1.body) {
                            console.log("Could not fetch services");
                            return;
                        }
                        this.triggerService('offers', result1, 1)
                        || this.triggerService('similarItems', result1, 3)
                        || this.triggerService('popularItems', result1, 3)
                        || this.triggerService('galleryItems', result1, 3);                    
                    });
                });
            }, () => {
                console.log("Cron Ended!!");
            },
            true,
            'Asia/Kolkata',
            null,
            true
        );
        let port = process.env.PORT || 3001;
        let app: express.Application = express();
        app.listen(port, function() {
            console.log('Cron started on ' + port);
        });
    }
}