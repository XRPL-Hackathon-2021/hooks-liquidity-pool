/*
  This is a placeholder Javascript file. 
  It's purpose is to use RippleLib to install hooks on the testnet.

  This file should use a .env file that you setup during the README.md.
*/
import * as dotenv from 'dotenv'
// import { RippleAPI, TransactionJSON } from 'ripple-lib'
import { XrplClient, AnyJson } from 'xrpl-client'
import * as fs from 'fs'

dotenv.config()

const host = process.env.XRPL_HOST
const port = process.env.XRPL_PORT
// const api = new RippleAPI({ server: `ws://${host}:${port}/` })
const address = process.env.XRP_ADDRESS
const secret = process.env.XRP_SECRET
const client = new XrplClient([`ws://${host}:${port}/`])

// Guard against initialization failures.
if (!client) throw Error('Is your XRPL server running? Its config incorrect?')
if (!address) throw Error('XRP_ACCOUNT environment variable must be set.')
if (!secret) throw Error('XRP_SECRET environment variable must be set.')

const binary = fs
  .readFileSync('./build/optimized.wasm')
  .toString('hex')
  .toUpperCase()

const payload = {
  Account: address,
  TransactionType: 'SetHook',
  CreateCode: binary,
  HookOn: '0000000000000000'
}

const signTransaction = async (payload: AnyJson): Promise<AnyJson> => {
  // Construct a signing request that includes the payload.
  const request = {
    id: 'hackathon',
    command: 'sign',
    tx_json: payload,
    secret: secret
  }

  console.log('Signing hook deployment request.')
  const result = await client.send(request)
  console.log(result) // Uncomment to see the signing response.

  return result
}

const main = async (): Promise<void> => {
  // Get the payload signed by the XRPL.
  const signedTransaction = await signTransaction(payload)

  // Construct new request that includes the signed payload.
  const request = {
    id: 'hackathon',
    command: 'tx',
    transaction: signedTransaction,
    binary: false
  }

  console.log('Deploying hook to the XRPL.')
  const result = await client.send(request)
  console.log(result) // Uncomment to see the deployment response.

  process.exit(1)
}

main()
