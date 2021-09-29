// The entry file of your WebAssembly module.

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
@external('env', 'util_raddr')
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
@external('env', 'util_accid')
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
@external('env', 'util_verify')
declare function util_verify(dread_ptr: i32, dread_len: i32, sread_ptr: i32, sread_len: i32, kread_ptr: i32, kread_len: i32): i64

/**
 * Compute the first half of a SHA512 checksum.
 * @param write_ptr The buffer to write the checksum into. Must be at least 32 bytes.
 * @param write_len The length of the buffer.
 * @param read_ptr  The buffer to read data for digest from.
 * @param read_len  The amount of data to read from the buffer.
 * @return The number of bytes written to write_ptr or a negative integer on error.
 */
@external('env', 'util_sha512h')
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
@external('env', 'sto_subfield')
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
@external('env', 'sto_subarray')
declare function sto_subarray(read_ptr: i32,  read_len: i32, array_id: i32): i64

@external('env', 'sto_validate')
declare function sto_validate(read_ptr: i32,  read_len: i32): i64

@external('env', 'sto_emplace')
declare function sto_emplace(write_ptr: i32, write_len: i32, sread_ptr: i32, sread_len: i32, fread_ptr: i32, fread_len: i32, field_id: i32): i64

@external('env', 'sto_erase')
declare function sto_erase(write_ptr: i32,  write_len: i32, read_ptr: i32, read_len: i32, field_id: i32): i64

@external('env', 'util_keylet')
declare function util_keylet(write_ptr: i32, write_len: i32, keylet_type: i32, a: i32, b: i32, c: i32, d: i32, e: i32, f: i32): i64

/**
 * Compute burden for an emitted transaction.
 * @return the burden a theoretically emitted transaction would have.
 */
@external('env', 'etxn_burden')
declare function etxn_burden(): void

/**
 * Write a full emit_details stobject into the buffer specified.
 * @param write_ptr A sufficiently large buffer to write into.
 * @param write_len The length of that buffer.
 * @return The number of bytes written or a negative integer indicating an error.
 */
@external('env', 'etxn_details')
declare function etxn_details(write_ptr: i32, write_len: i32): i64

/**
 * Compute the minimum fee required to be paid by a hypothetically emitted transaction based on its size in bytes.
 * @param The size of the emitted transaction in bytes
 * @return The minimum fee in drops this transaction should pay to succeed
 */
@external('env', 'etxn_fee_base')
declare function etxn_fee_base(tx_byte_count: i32): i64

/**
 * Inform xrpld that you will be emitting at most @count@ transactions during the course of this hook execution.
 * @param count The number of transactions you intend to emit from this  hook.
 * @return If a negaitve integer an error has occured
 */
@external('env', 'etxn_reserve')
declare function etxn_reserve(count: i32): i64

/**
 * Compute the generation of an emitted transaction. If this hook was invoked by a transaction emitted by a previous
 * hook then the generation counter will be 1+ the previous generation counter otherwise it will be 1.
 * @return The generation of a hypothetically emitted transaction.
 */
@external('env', 'etxn_generation')
declare function etxn_generation(): void

/**
 * Emit a transaction from this hook.
 * @param read_ptr Memory location of a buffer containing the fully formed binary transaction to emit.
 * @param read_len The length of the transaction.
 * @return A negative integer if the emission failed.
 */
 @external('env', 'emit')
declare function emit(write_ptr: i32, write_len: i32, read_ptr: i32, read_len: i32): i64

/**
 * Retrieve the account the hook is running on.
 * @param write_ptr A buffer of at least 20 bytes to write into.
 * @param write_len The length of that buffer
 * @return The number of bytes written into the buffer of a negative integer if an error occured.
 */
@external('env', 'hook_account')
declare function hook_account(write_ptr: i32, write_len: i32): i64

/**
 * Retrieve the hash of the currently executing hook.
 * @param write_ptr A buffer of at least 32 bytes to write into.
 * @param write_len The length of that buffer
 * @return The number of bytes written into the buffer of a negative integer if an error occured.
 */
@external('env', 'emhook_hashit')
declare function hook_hash(write_ptr: i32, write_len: i32): i64

/**
 * Retrive the currently recommended minimum fee for a transaction to succeed.
 */
@external('env', 'fee_base')
declare function fee_base(): void

/**
 * Retrieve the current ledger sequence number
 */
@external('env', 'ledger_seq')
declare function ledger_seq(): void

@external('env', 'ledger_last_hash')
declare function ledger_last_hash(write_ptr: i32, write_len: i32): i64

/**
 * Retrieve a nonce for use in an emitted transaction (or another task). Can be called repeatedly for multiple nonces.
 * @param write_ptr A buffer of at least 32 bytes to write into.
 * @param write_len The length of that buffer
 * @return The number of bytes written into the buffer of a negative integer if an error occured.
 */
@external('env', 'nonce')
declare function nonce(write_ptr: i32, write_len: i32): i64


/**
 * Slot functions have not been implemented yet and the api for them is subject to change
 */
@external('env', 'slot')
declare function slot(write_ptr: i32, write_len: i32, slot: i32): i64

@external('env', 'slot_clear')
declare function slot_clear(slot: i32): i64

@external('env', 'slot_count')
declare function slot_count(slot: i32): i64

@external('env', 'slot_id')
declare function slot_id(slot: i32): i64

@external('env', 'slot_set')
declare function slot_set(read_ptr: i32, read_len: i32, slot: i32): i64

@external('env', 'slot_size')
declare function slot_size(slot: i32): i64

@external('env', 'slot_subarray')
declare function slot_subarray(parent_slot: i32, array_id: i32, new_slot: i32): i64

@external('env', 'slot_subfield')
declare function slot_subfield(parent_slot: i32, field_id: i32, new_slot: i32): i64

@external('env', 'slot_type')
declare function slot_type(slot: i32, flags: i32): i64

@external('env', 'slot_float')
declare function slot_float(slot: i32): i64

@external('env', 'trace_slot')
declare function trace_slot(mread_ptr: i32, mread_len: i32, slot: i32): i64

@external('env', 'otxn_slot')
declare function otxn_slot(slot: i32): i64


/**
 * In the hook's state key-value map, set the value for the key pointed at by kread_ptr.
 * @param read_ptr A buffer containing the data to store
 * @param read_len The length of the data
 * @param kread_ptr A buffer containing the key
 * @param kread_len The length of the key
 * @return The number of bytes stored or a negative integer if an error occured
 */
@external('env', 'state_set')
declare function state_set(read_ptr: i32, read_len: i32, kread_ptr: i32, kread_len: i32): i64

/**
 * Retrieve a value from the hook's key-value map.
 * @param write_ptr A buffer to write the state value into
 * @param write_len The length of that buffer
 * @param kread_ptr A buffer to read the state key from
 * @param kread_len The length of that key
 * @return The number of bytes written or a negative integer if an error occured.
 */
@external('env', 'state')
declare function state(write_ptr: i32, write_len: i32, kread_ptr: i32, kread_len: i32): i64

/**
 * Retrieve a value from another hook's key-value map.
 * @param write_ptr A buffer to write the state value into
 * @param write_len The length of that buffer
 * @param kread_ptr A buffer to read the state key from
 * @param kread_len The length of that key
 * @param aread_ptr A buffer containing an account-id of another account containing a hook whose state we are reading
 * @param aread_len The length of the account-id (should always be 20).
 * @return The number of bytes written or a negative integer if an error occured.
 */
@external('env', 'state_foreign')
declare function state_foreign(write_ptr: i32, write_len: i32, kread_ptr: i32, kread_len: i32, aread_ptr: i32,  aread_len: i32): i64

/**
 * Print some output to the trace log on xrpld. Any xrpld instance set to "trace" log level will see this.
 * @param read_ptr A buffer containing either data or text (in either utf8, or utf16le)
 * @param read_len The byte length of the data/text to send to the trace log
 * @param as_hex If 0 treat the read_ptr as pointing at a string of text, otherwise treat it as data and print hex
 * @return The number of bytes output or a negative integer if an error occured.
 */
@external('env', 'trace')
declare function trace(mread_ptr: string, mread_len: i32, dread_ptr: string, dread_len: i32, as_hex: i32): i64

/**
 * Print some output to the trace log on xrpld along with a decimal number. Any xrpld instance set to "trace" log
 * level will see this.
 * @param read_ptr A pointer to the string to output
 * @param read_len The length of the string to output
 * @param number Any integer you wish to display after the text
 * @return A negative value on error
 */
@external('env', 'trace_num')
declare function trace_num(read_ptr: i32, read_len: i32, number: i64): i64

/**
 * Retrieve the burden of the originating transaction (if any)
 * @return The burden of the originating transaction
 */
@external('env', 'otxn_burden')
declare function otxn_burden(): void

/**
 * Retrieve a field from the originating transaction as "full text" (The way it is displayed in JSON)
 * @param write_ptr A buffer to write the representation into
 * @param write_len The length of the buffer
 * @param field_id The field code of the field being requested
 * @return The number of bytes written to write_ptr or a negative integer if an error occured.
 */
@external('env', 'otxn_field_txt')
declare function otxn_field_txt(write_ptr: i32, write_len: i32, field_id: i32): i64

/**
 * Retrieve a field from the originating transaction in its raw serialized form.
 * @param write_ptr A buffer to output the field into
 * @param write_len The length of the buffer.
 * @param field_if The field code of the field being requested
 * @return The number of bytes written to write_ptr or a negative integer if an error occured.
 */
@external('env', 'otxn_field')
declare function otxn_field(write_ptr: i32, write_len: i32, field_id: i32): i64

/**
 * Retrieve the generation of the originating transaction (if any).
 * @return the generation of the originating transaction.
 */
@external('env', 'otxn_generation')
declare function otxn_generation(): void

/**
 * Retrieve the TXNID of the originating transaction.
 * @param write_ptr A buffer at least 32 bytes long
 * @param write_len The length of the buffer.
 * @return The number of bytes written into the buffer or a negative integer on failure.
 */
@external('env', 'otxn_id')
declare function otxn_id(write_ptr: i32, write_len: i32): i64

/**
 * Retrieve the Transaction Type (e.g. ttPayment = 0) of the originating transaction.
 * @return The Transaction Type (tt-code)
 */
@external('env', 'otxn_type')
declare function otxn_type(): i64

@external('env', 'float_set')
declare function float_set(exponent: i32, mantissa: i64): i64

@external('env', 'float_multiply')
declare function float_multiply(float1: i64, float2: i64): i64

@external('env', 'float_mulratio')
declare function float_mulratio(float1: i64, round_up: i32, numerator: i32, denominator: i32): i64

@external('env', 'float_negate')
declare function float_negate(float1: i64): i64

@external('env', 'float_compare')
declare function float_compare(float1: i64, float2: i64, mode: i32): i64

@external('env', 'float_sum')
declare function float_sum(float1: i64, float2: i64): i64

@external('env', 'float_sto')
declare function float_sto(write_ptr: i32, write_len: i32, cread_ptr: i32, cread_len: i32, iread_ptr: i32, iread_le: i32n, float1: i64, field_code: i32): i64

@external('env', 'float_sto_set')
declare function float_sto_set(read_ptr: i32, read_len: i32): i64

@external('env', 'float_invert')
declare function float_invert(float1: i64): i64

@external('env', 'float_divide')
declare function float_divide(float1: i64, float2: i64): i64

@external('env', 'float_one')
declare function float_one(): i64

@external('env', 'float_exponent')
declare function float_exponent(float1: i64): i64

@external('env', 'float_exponent_set')
declare function float_exponent_set(float1: i64, exponent: i32): i64

@external('env', 'float_mantissa')
declare function float_mantissa(float1: i64): i64

@external('env', 'float_mantissa_set')
declare function float_mantissa_set(float1: i64, mantissa: i64): i64

@external('env', 'float_sign')
declare function float_sign(float1: i64): i64

@external('env', 'float_sign_set')
declare function float_sign_set(float1: i64, negative: i32): i64

@external('env', 'float_int')
declare function float_int(float1: i64, decimal_places: i32, abs: i32): i64

@external('env', 'trace_float')
declare function trace_float(mread_ptr: i32, mread_len: i32, float1: i64): i64



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

