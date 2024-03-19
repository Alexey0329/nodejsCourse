import { MyEventEmitter } from "../task1/myEventEmitter.js";

class WithTime extends MyEventEmitter {
  execute(asyncFunc, ...args) {
    this.emit('begin');
    console.time('execute');
    asyncFunc(...args, (data) => {
      this.emit('data', data);
      console.timeEnd('execute');
      this.emit('end');
    });
  }
}

const fetchFromUrl = (url, cb) => {
  fetch(url)
    .then(response => response.json())
    .then(json => cb(json));
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners("end"));