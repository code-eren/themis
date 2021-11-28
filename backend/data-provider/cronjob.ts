var CronJob = require('cron').CronJob;
require('dotenv').config();
import { querySchedule } from './request';

var count = 0;
const RUN_TIME = 1;

// in actual production env, probably pull every week for the schedule in next week
var job = new CronJob(
  '* * * * * *',
  async () => {
    count++;
    if (count == RUN_TIME) {
      job.stop();
    }
    var date = new Date();
    date.setUTCDate(date.getUTCDate() - 5);
    await querySchedule(getFormattedDate(date));
    console.log('You will see this message every second');
  },
  null,
  true,
  'America/New_York'
);

/**
 * @param {Date} d - date object
 * @return {string} formattedDate - in format of xxxx-xx-xx year-month-day
 */
function getFormattedDate(d) {
  return (
    d.getFullYear() +
    '-' +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + d.getDate()).slice(-2)
  );
}

job.start();
