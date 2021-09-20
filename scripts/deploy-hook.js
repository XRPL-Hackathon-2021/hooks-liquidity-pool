"use strict";
exports.__esModule = true;
/*
  This is a placeholder Javascript file.
  It's purpose is to use RippleLib to install hooks on the testnet.

  This file should use a .env file that you setup during the README.md.
*/
var dotenv = require("dotenv");
var ripple_lib_1 = require("ripple-lib");
var fs = require("fs");
dotenv.config();
var host = process.env.XRPL_HOST;
var port = process.env.XRPL_PORT;
var api = new ripple_lib_1.RippleAPI({ server: "ws://" + host + ":" + port + "/" });
var address = process.env.XRP_ADDRESS;
var secret = process.env.XRP_SECRET;
// Guard against all the possible failures before we do anything.
if (!api)
    throw Error('Is your XRPL server running? Or its config incorrect.');
if (!address)
    throw Error('XRP_ACCOUNT environment variable must be set.');
if (!secret)
    throw Error('XRP_SECRET environment variable must be set.');
api.on('error', function (errorCode, errorMessage) {
    console.log(errorCode + ': ' + errorMessage);
});
api.on('connected', function () {
    console.log('Connected to XRPLD Server.\n');
});
api.on('disconnected', function (code) {
    console.log('disconnected, code:', code);
});
api
    .connect()
    .then(function () {
    var binary = fs
        .readFileSync('./build/optimized.wasm')
        .toString('hex')
        .toUpperCase();
    var payload = {
        Account: address,
        TransactionType: 'SetHook',
        CreateCode: binary,
        HookOn: '0000000000000000'
    };
    console.log("Raw Paylaod: " + JSON.stringify(payload) + " \n");
    api.prepareTransaction(payload).then(function (preparedTransaction) {
        console.log('Prepared Transaction: ');
        console.log(preparedTransaction);
        console.log('Signing Prepared Transaction: \n');
        var result = api.sign(preparedTransaction.txJSON, secret);
        console.log('Did we get a result that is signed? \n');
        var signedTransaction = result.signedTransaction;
        console.log("Signed Transaction: " + signedTransaction);
        api
            .submit(signedTransaction)
            .then(function (response) {
            console.log("Response from XRPLD:");
            console.log(response.resultCode, response.resultMessage);
            process.exit(0);
        })["catch"](function (error) {
            console.log(error);
        });
    });
})
    .then(function () { })["catch"](console.error);
