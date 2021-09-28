import * as dotenv from 'dotenv'
import { XrplClient, AnyJson } from 'xrpl-client'
import * as fs from 'fs'

dotenv.config()

const host = process.env.XRPL_HOST
const port = process.env.XRPL_PORT
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

/*
  Caution here: You would never send your secret to an XRPL serer in production.
  This is only needed for the hackathon. The current versions of the 
  XRPL client libs don't support a SetHook transaction type. 
  */
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
  console.log(`Signed transaction returned from XRPL: `)
  console.log(result) // Uncomment to see the signing response.

  return result
}

const main = async (): Promise<void> => {
  // Get the payload signed by the XRPL.
  const signedTransaction = await signTransaction(payload)

  // Construct new request that includes the signed payload.
  const request = {
    id: 'hackathon',
    command: 'submit',
    tx_blob: signedTransaction.tx_blob
  }

  console.log('Deploying hook to the XRPL.')
  const result = await client.send(request)
  console.log(`Deployment submission result returned from XRPL: `)
  console.log(result) // Uncomment to see the deployment response.

  process.exit(1)
}

main()
