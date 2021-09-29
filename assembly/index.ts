// The entry file of your WebAssembly module.

// declare namespace console {
//   function log(s: string): void
// }

export function cbak(reserved: i64): i64 {
  return 0
}

@external('env', '_g')
declare function _g(id: i32, maxiter: i32): void

@external('env', 'accept')
declare function accept(read_ptr: string, read_len: i32, error_code: i64): i64

@external('env', 'trace')
declare function trace(mread_ptr: string, mread_len: i32, dread_ptr: string, dread_len: i32, as_hex: i32): i64

export function hook(reserved: i64): i64 {
  const t = 'test'

  _g(1,1)

  // for (let i = 0; _g(10, 10), i < 3; i++) {
  //   trace(t, t.length * 2, t, t.length * 2, 0)
  // }
  
  // accept(t, t.length * 2, 0)

  return 0
}


