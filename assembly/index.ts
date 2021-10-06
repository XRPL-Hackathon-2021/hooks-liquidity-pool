// The entry file of your WebAssembly module.

import {
  _g as GUARD,
  trace as TRACE,
  accept as ACCEPT,
  hook_account as HOOK_ACCOUNT,
  rollback as ROLLBACK
} from '../node_modules/xrpl-hooks-api-assembly-script/dist'

export function cbak(reserved: i64): i64 {
  return 0
}

export function hook(reserved: i64): i64 {
  // Setup a trace to make this easier to find in the logs.
  const startingMessage = 'Forwarding Address Called!'
  TRACE('', 0, startingMessage, startingMessage.length * 2, 0)

  // Get the account_id that the hook is running on.
  let accountId: Uint8Array // Raw pointer to start of Account ID in memory contained at accountId.dataStart.
  const rollbackMessage = 'Failed to get the account ID of this hook account.'
  const accountIDReceiver = load<u8>(accountId.dataStart, 20) // Receives the accountID value from HOOK_ACCOUNT

  const traceMessage = 'Populating accountID.'
  TRACE('', 0, traceMessage, traceMessage.length * 2, 0)
  if (HOOK_ACCOUNT(accountIDReceiver, 20) < 0)
    ROLLBACK(rollbackMessage, traceMessage.length * 2, 404) // Account number not found.

  const accountIdMessage = accountIDReceiver.toString()
  TRACE('', 0, accountIdMessage, accountIdMessage.length * 2, 0)

  // Accept for now.
  const acceptMessage = 'Successfully read Account ID.'
  ACCEPT(acceptMessage, acceptMessage.length * 2, 200)
  GUARD(1, 1)
  return reserved
}
