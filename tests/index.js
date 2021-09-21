const assert = require('assert')
const myModule = require('..')

assert.strictEqual(myModule.cback(42), 0n)
assert.strictEqual(myModule.hook(1), 42n)

console.log('ok')
