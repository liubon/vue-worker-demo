import SimpleWebWorker from 'simple-web-worker';
export default class WorkerQueue {
  constructor() {
    try {
      this.hardwareConcurrency = window.navigator.hardwareConcurrency;
    } catch (error) {
      console.log(
        'Set 4 Concurrency,because can`t get your hardwareConcurrency.'
      );
      this.concurrency = 4;
    }
    this.concurrency = 4;
    this._worker = SimpleWebWorker;
    this.workerCont = 0;
    this.queue = [];
  }
  push(fn, callback, ...args) {
    this.queue.push({ fn, callback, args });
    this.run();
  }
  run() {
    while (this.queue.length && this.concurrency > this.workerCont) {
      this.workerCont++;
      const { fn, callback, args } = this.queue.shift();
      this._worker
        .run(fn, args)
        .then((res) => {
          callback(res);
          this.workerCont--;
          this.run();
        })
        .catch((e) => {
          //   this.workerCont--;
          //   this.run();
          throw e;
        });
    }
  }
}
