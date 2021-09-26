// The entry file of your WebAssembly module.

import {
  _g as GUARD,
  trace as TRACE
} from '../node_modules/xrpl-hooks-api-assembly-script/dist'

export function cbak(reserved: i64): i64 {
  return 0
}

export function hook(reserved: i64): i64 {
  const message = 'Test Message'
  TRACE(message, message.length * 2, message, message.length * 2, 0)
  GUARD(1, 1)
  return 42
}
