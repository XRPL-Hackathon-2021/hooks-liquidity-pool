import * as dotenv from 'dotenv'
import { XrplClient, AnyJson } from 'xrpl-client'

dotenv.config()

const host = process.env.XRPL_HOST
const port = process.env.XRPL_PORT
const senderAddress = process.env.SENDER_ADDRESS
const senderSecret = process.env.SENDER_SECRET
const recipient = process.env.XRP_ADDRESS
const client = new XrplClient([`ws://${host}:${port}/`])

// Guard against initialization failures.
if (!client) throw Error('Is your XRPL server running? Its config incorrect?')
if (!senderAddress) throw Error('SENDER_ADDRESS env variable must be set.')
if (!senderSecret) throw Error('SENDER_SECRET env variable must be set.')
if (!recipient) throw Error('XRP_ADDRESS env variable must be set.')

const payload = {
  TransactionType: 'Payment',
  Account: senderAddress,
  Destination: recipient,
  Amount: '1'
}

/*
  Caution here: You would never send your secret to an XRPL server in production.
  This is only needed for the hackathon. The current versions of the 
  XRPL client libs don't support a SetHook transaction type. 
  */
const signTransaction = async (payload: AnyJson): Promise<AnyJson> => {
  // Construct a signing request that includes the payload.
  const request = {
    id: 'hackathon-payment',
    command: 'sign',
    tx_json: payload,
    secret: senderSecret
  }

  console.log('Signing payment request.')
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
    id: 'hackathon-payment',
    command: 'submit',
    tx_blob: signedTransaction.tx_blob
  }

  console.log('Sending payment to the XRPL.')
  const result = await client.send(request)
  console.log(`Payment submission result returned from XRPL: `)
  console.log(result) // Uncomment to see the deployment response.

  process.exit(1)
}

main()
