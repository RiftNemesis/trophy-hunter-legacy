import GameSessions from '/imports/api/game-sessions/gameSessions';
import { Meteor } from 'meteor/meteor';
import os from 'os';
import Jobs from '/imports/api/jobs/jobs';

const hostname = os.hostname();

export const checkUser = () => {
  const user = Meteor.user();
  if (
    !user ||
    (user._id !== '68yz7FfLwgQJoY3c2' &&
      user._id !== 'ZLqcYvH4oyL2sC7jx' &&
      user.username !== 'EUW.24688273')
  ) {
    throw new Meteor.Error('not-authorized');
  }
};

Meteor.methods({
  hostname() {
    return hostname;
  },
  memoryUsage() {
    return process.memoryUsage();
  },
  forceShutdown() {
    this.unblock();
    checkUser();

    console.log('exit');
    process.exit(1);
  },
  reprocessFailed() {
    this.unblock();
    checkUser();
    GameSessions.find({ checkedStatus: 'failed' }, { limit: 100 }).forEach(gameSession => {
      console.log(gameSession._id);
      gameSession.restartJob();
    });
  },
  getConnection() {
    this.unblock();
    checkUser();

    return this.connection;
  },
  restartLottery() {
    Jobs.find({ type: 'drawLotteryWinners', status: 'failed' })
      .fetch()
      .forEach(job => {
        Jobs.getJob(job._id, (err, failedJob) => {
          failedJob.restart({}, () => {
            failedJob.refresh();
            failedJob.delay(0);
            failedJob.ready({
              force: false
            });
          });
        });
      });
  }
});
