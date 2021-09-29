// The entry file of your WebAssembly module.

// declare namespace console {
//   function log(s: string): void
// }


/**
 * Guard function. Each time a loop appears in your code a call to this must be the first branch instruction after the
 * beginning of the loop.
 * @param id The identifier of the guard (typically the line number).
 * @param maxiter The maximum number of times this loop will iterate across the life of the hook.
 * @return Can be ignored. If the guard is violated the hook will terminate.
 */
@external('env', '_g')
declare function _g(id: i32, maxiter: i32): i32

/**
 * Accept the originating transaction and commit all hook state changes and submit all emitted transactions.
 * @param read_ptr An optional string to use as a return comment. May be 0.
 * @param read_len The length of the string. May be 0.
 * @return Will never return, terminates the hook.
 */
@external('env', 'accept')
declare function accept(read_ptr: string, read_len: i32, error_code: i64): i64

/**
 * Rollback the originating transaction, discard all hook state changes and emitted transactions.
 * @param read_ptr An optional string to use as a return comment. May be 0.
 * @param read_len The length of the string. May be 0.
 * @return Will never return, terminates the hook.
 */
 @external('env', 'rollback')
declare function rollback(read_ptr: i32, read_len: i32, error_code: i64): i64

/**
 * Read a 20 byte account-id from the memory pointed to by read_ptr of length read_len and encode it to a base58-check
 * encoded r-address.
 * @param read_ptr The memory address of the account-id
 * @param read_len The byte length of the account-id (should always be 20)
 * @param write_ptr The memory address of a suitable buffer to write the encoded r-address into.
 * @param write_len The size of the write buffer.
 * @return On success the length of the r-address will be returned indicating the bytes written to the write buffer.
 *         On failure a negative integer is returned indicating what went wrong.
 */
declare function util_raddr(write_ptr: i32, write_len: i32, read_ptr: i32, read_len: i32): i64

/**
 * Read an r-address from the memory pointed to by read_ptr of length read_len and decode it to a 20 byte account id
 * and write to write_ptr
 * @param read_ptr The memory address of the r-address
 * @param read_len The byte length of the r-address
 * @param write_ptr The memory address of a suitable buffer to write the decoded account id into.
 * @param write_len The size of the write buffer.
 * @return On success 20 will be returned indicating the bytes written. On failure a negative integer is returned
 *         indicating what went wrong.
 */
declare function util_accid(write_ptr: i32, write_len: i32, read_ptr: i32,  read_len: i32): i64

/**
 * Verify a cryptographic signature either ED25519 of SECP256k1. Public key should be prefixed with 0xED for 25519.
 * @param dread_ptr The memory location of the data or payload to verify
 * @param dread_len The length of the data or payload to verify
 * @param sread_ptr The memory location of the signature
 * @param sread_len The length of the signature
 * @param kread_ptr The memory location of the public key
 * @param kread_len The length of the public key
 * @return True if and only if the signature was verified.
 */
declare function util_verify(dread_ptr: i32, dread_len: i32, sread_ptr: i32, sread_len: i32, kread_ptr: i32, kread_len: i32): i64

/**
 * Compute the first half of a SHA512 checksum.
 * @param write_ptr The buffer to write the checksum into. Must be at least 32 bytes.
 * @param write_len The length of the buffer.
 * @param read_ptr  The buffer to read data for digest from.
 * @param read_len  The amount of data to read from the buffer.
 * @return The number of bytes written to write_ptr or a negative integer on error.
 */
declare function util_sha512h(write_ptr: i32, write_len: i32, read_ptr: i32,  read_len: i32): i64

/**
 * Index into a xrpld serialized object and return the location and length of a subfield. Except for Array subtypes
 * the offset and length refer to the **payload** of the subfield not the entire subfield. Use SUB_OFFSET and
 * SUB_LENGTH macros to extract return value.
 * @param read_ptr The memory location of the stobject
 * @param read_len The length of the stobject
 * @param field_id The Field Code of the subfield
 * @return high-word (most significant 4 bytes excluding the most significant bit (MSB)) is the field offset relative
 *         to read_ptr and the low-word (least significant 4 bytes) is its length. MSB is sign bit, if set (negative)
 *         return value indicates error (typically error means could not find.)
 */
declare function sto_subfield(read_ptr: i32, read_len: i32, field_id: i32): i64


/**
 * Index into a xrpld serialized array and return the location and length of an index. Unlike sto_subfield this api
 * always returns the offset and length of the whole object at that index (not its payload.) Use SUB_OFFSET and
 * SUB_LENGTH macros to extract return value.
 * @param read_ptr The memory location of the stobject
 * @param read_len The length of the stobject
 * @param array_id The index requested
 * @return high-word (most significant 4 bytes excluding the most significant bit (MSB)) is the field offset relative
 *         to read_ptr and the low-word (least significant 4 bytes) is its length. MSB is sign bit, if set (negative)
 *         return value indicates error (typically error means could not find.)
 */
declare function sto_subarray(read_ptr: i32,  read_len: i32, array_id: i32): i64

declare function sto_validate(read_ptr: i32,  read_len: i32): i64

declare function sto_emplace(write_ptr: i32, write_len: i32, sread_ptr: i32, sread_len: i32, fread_ptr: i32, fread_len: i32, field_id: i32): i64

declare function sto_erase(write_ptr: i32,  write_len: i32, read_ptr: i32, read_len: i32, field_id: i32): i64

declare function util_keylet(write_ptr: i32, write_len: i32, keylet_type: i32, a: i32, b: i32, c: i32, d: i32, e: i32, f: i32): i64




@external('env', 'trace')
declare function trace(mread_ptr: string, mread_len: i32, dread_ptr: string, dread_len: i32, as_hex: i32): i64

@external('env', 'etxn_reserve')
declare function etxn_reserve(count: i32): i64


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