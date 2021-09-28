import * as dotenv from 'dotenv'
import { RippleAPI, TransactionJSON } from 'ripple-lib'

dotenv.config()

const host = process.env.XRPL_HOST
const port = process.env.XRPL_PORT
const senderAddress = process.env.SENDER_ADDRESS
const senderSecret = process.env.SENDER_SECRET
const recipient = process.env.XRP_ADDRESS
const api = new RippleAPI({ server: `ws://${host}:${port}/` })

// Guard against initialization failures.
if (!api) throw Error('Is your XRPL server running? Its config incorrect?')
if (!senderAddress) throw Error('SENDER_ADDRESS env variable must be set.')
if (!senderSecret) throw Error('SENDER_SECRET env variable must be set.')
if (!recipient) throw Error('XRP_ADDRESS env variable must be set.')

interface PaymentPayload {
  Account: string
  TransactionType: string
  Amount: {
    value: string
    issuer?: string
    currency?: string
  }
  Destination: string
}

const payload = {
  Account: senderAddress,
  TransactionType: 'Payment',
  Amount: { value: '10' },
  Destination: recipient
}

const signTransaction = async (payload: PaymentPayload): Promise<any> => {
  // Construct a signing request that includes the payload.
  const request = `{
    "id": "trigger-hook-signing-request",
    "command": "sign",
    "tx_json": {
      "Account": "${senderAddress}",
      "TransactionType": "Payment",
      "Amount": "10",
      "Destination": "${recipient}"
    },
    "secret": "${senderSecret}"
  }`

  console.log(request)

  console.log('Signing payment request.')
  const result = await api.sign(request)
  console.log(`Locally Signed Transaction Payload: `)
  console.log(result) // Uncomment to see the signing response.

  return result
}

const main = async (): Promise<void> => {
  // Get the payload signed by the XRPL.
  const signedTransaction = await signTransaction(payload)

  /*
  // Construct new request that includes the signed payload.
  const request = {
    id: 'trigger-hook-submission',
    command: 'submit',
    tx_blob: signedTransaction.tx_blob
  }

  console.log('Triggering the hook.')
  const result = await client.send(request)
  console.log(`Payment submission result returned from XRPL: `)
  console.log(result) // Uncomment to see the deployment response.
  */
  process.exit(1)
}

main()
