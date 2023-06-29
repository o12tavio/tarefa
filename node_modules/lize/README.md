# lize.js
```sample.js
const Lize = require('../src/Lize')

const Logger = {
  logcount: 0
}

Lize(Logger, 'Log', {
  message: String,
}, function ({ message }) {
  console.log('+1 Log:' + message)
  this.logcount++
})
```
