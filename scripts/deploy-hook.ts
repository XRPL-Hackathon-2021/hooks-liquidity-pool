/*
  This is a placeholder Javascript file. 
  It's purpose is to use RippleLib to install hooks on the testnet.

  This file should use a .env file that you setup during the README.md.
*/
import * as dotenv from 'dotenv'
import { RippleAPI, TransactionJSON } from 'ripple-lib'
import * as fs from 'fs'

dotenv.config()

const host = process.env.XRPL_HOST
const port = process.env.XRPL_PORT
const api = new RippleAPI({ server: `ws://${host}:${port}/` })
const address = process.env.XRP_ADDRESS
const secret = process.env.XRP_SECRET

// Guard against initialization failures.
if (!api) throw Error('Is your XRPL server running? Or its config incorrect.')
if (!address) throw Error('XRP_ACCOUNT environment variable must be set.')
if (!secret) throw Error('XRP_SECRET environment variable must be set.')

api.on('error', (errorCode, errorMessage) => {
  console.log(errorCode + ': ' + errorMessage)
})
api.on('connected', () => {
  console.log('Connected to XRPLD Server.\n')
})
api.on('disconnected', (code) => {
  console.log('disconnected, code:', code)
})
api
  .connect()
  .then(() => {
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

    console.log(`Transaction Paylaod: ${JSON.stringify(payload)} \n`)

    api.prepareTransaction(payload).then((transaction) => {
      console.log('Prepared Transaction: ')
      console.log(transaction)

      console.log('Signing Prepared Transaction: \n')

      // TODO: Something is failing here.
      const result = api.sign(transaction.txJSON, secret)
      console.log('DEBUG: Did we get a result that is signed? \n')

      const signedTransaction = result.signedTransaction

      console.log(`Signed Transaction: ${signedTransaction}`)

      api
        .submit(signedTransaction)
        .then((response) => {
          console.log(`Response from XRPLD:`)
          console.log(response.resultCode, response.resultMessage)
          process.exit(0)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  })
  .then(() => {})
  .catch(console.error)
