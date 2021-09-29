import { _g, trace, accept } from '../node_modules/xrpl-hooks-api-assembly-script/dist'

export function cbak(reserved: i64): i64 {
  return 0
}

export function hook(reserved: i64): i64 {
  const t = 'test'

  _g(1,1)

  for (let i = 0; _g(10, 10), i < 3; i++) {
    trace(t, t.length * 2, t, t.length * 2, 0)
  }
  
  accept(t, t.length * 2, 0)

  return 0
}