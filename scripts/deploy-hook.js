"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var dotenv = require("dotenv");
var xrpl_client_1 = require("xrpl-client");
var fs = require("fs");
dotenv.config();
var host = process.env.XRPL_HOST;
var port = process.env.XRPL_PORT;
var address = process.env.XRP_ADDRESS;
var secret = process.env.XRP_SECRET;
var client = new xrpl_client_1.XrplClient(["ws://" + host + ":" + port + "/"]);
// Guard against initialization failures.
if (!client)
    throw Error('Is your XRPL server running? Its config incorrect?');
if (!address)
    throw Error('XRP_ACCOUNT environment variable must be set.');
if (!secret)
    throw Error('XRP_SECRET environment variable must be set.');
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
/*
  Caution here: You would never send your secret to an XRPL serer in production.
  This is only needed for the hackathon. The current versions of the
  XRPL client libs don't support a SetHook transaction type.
  */
var signTransaction = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var request, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                request = {
                    id: 'hackathon',
                    command: 'sign',
                    tx_json: payload,
                    secret: secret
                };
                console.log('Signing hook deployment request.');
                return [4 /*yield*/, client.send(request)];
            case 1:
                result = _a.sent();
                console.log("Signed transaction returned from XRPL: ");
                console.log(result); // Uncomment to see the signing response.
                return [2 /*return*/, result];
        }
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var signedTransaction, request, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, signTransaction(payload)
                // Construct new request that includes the signed payload.
            ];
            case 1:
                signedTransaction = _a.sent();
                request = {
                    id: 'hackathon',
                    command: 'submit',
                    tx_blob: signedTransaction.tx_blob
                };
                console.log('Deploying hook to the XRPL.');
                return [4 /*yield*/, client.send(request)];
            case 2:
                result = _a.sent();
                console.log("Deployment submission result returned from XRPL: ");
                console.log(result); // Uncomment to see the deployment response.
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); };
main();
