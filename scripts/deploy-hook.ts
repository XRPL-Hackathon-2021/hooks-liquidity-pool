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

// Guard against all the possible failures before we do anything.
if (!api) throw Error('Is your XRPL server running? Or its config incorrect.')
if (!address) throw Error('XRP_ACCOUNT environment variable must be set.')
if (!secret) throw Error('XRP_SECRET environment variable must be set.')

api.on('error', (errorCode, errorMessage) => {
  console.log(errorCode + ': ' + errorMessage)
})
api.on('connected', () => {
  console.log('connected')
})
api.on('disconnected', (code) => {
  console.log('disconnected, code:', code)
})
api
  .connect()
  .then(() => {
    const binary = fs
      .readFileSync('../build/optimized.wasm')
      .toString('hex')
      .toUpperCase()

    const payload: TransactionJSON = {
      Account: address,
      TransactionType: 'SetHook',
      CreateCode: binary,
      HookOn: '0000000000000000'
    }

    api.prepareTransaction(payload).then((preparedTransaction) => {
      const signedTransaction = api.sign(
        preparedTransaction.txJSON,
        secret
      ).signedTransaction

      api
        .submit(signedTransaction)
        .then((response) => {
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
