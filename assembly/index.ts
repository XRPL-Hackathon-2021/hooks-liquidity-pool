// The entry file of your WebAssembly module.

export function cback(reserved: u32): i64 {
  return 0
}

@external('_g')
declare function _g(id: i32, maxiter: i32): void

export function hook(reserved: u32): i64 {
  return 42
}
