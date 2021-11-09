const {getSchedule} = require("./request.js");
var CronJob = require('cron').CronJob;
var count = 0;
const RUN_TIME = 1;
var job = new CronJob('* * * * * *', function() {
  count++;
  if (count == RUN_TIME) {
    job.stop();
  }
  var date = new Date();
  date.setUTCDate(date.getUTCDate() + 1);
  console.log(date.toDateString());
  // getSchedule("")
  console.log('You will see this message every second');
}, null, true, 'America/New_York');

job.start();