# Entities and Functionality

This document is making some assumptions about hook functionality for planning purposes. This is all likely to change.

## Issuer

The issuer is the issuer on the XRPL. In the case of XRP the Issuer.data.account can be null.

The issuer list structure can be modeled after XummCommunitie's API endpoint output. (https://xrpldata.com/api/v1/tokens).

```
Issuer: {
    data: {
        resolvedBy: "Bithomp",
        account: "rhotcWYdfn6qxhVMbPKGDF3XCKqwXar5J4",
        username: "GateHub",
        verified: true
    },
    tokens: [
        {
            currency: "USD",
            amount: 0.1305458135813303,
            trustlines: 10,
            offers: 3
        }
    ]
},
```

## Token

The token is a child of an issuer as it is defined on the XRPL.

```
Token: {
    currency: "USD",
    amount: 0.1305458135813303,
    trustlines: 10,
    offers: 3
}
```

## Asset

An asset along with its issuer as they are defined in the hook.

```
Asset: {
  symbol: String
  issuer: String
}
```

Examples:

Could use a simple factory to construct this but this is a simple example.

```
  XRP = {
    symbol: "XRP",
    issuer: null
  }

  USD = {
    symbol: "USD",
    issuer: "rhotcWYdfn6qxhVMbPKGDF3XCKqwXar5J4"
  }
```

## Pool

### Get Pool State.

Description: The pool state returns the current status of the pool. It answers questions like these.

1. What pairs are in the pool?
1. What is the current amount of each pair?
1. What is the ratio of base to cross?

Usage: `pool.state()`

Takes no arguments.

Returns data conforming to a PoolState interface.

```
PoolState: {
  Pairs: [
    XRPUSD: {
      base: {
        asset: XRP.symbol,
        issuer: Issuer.data.account,
        balance: number
      },
      cross: {
        asset: USD.symbol,
        issuer: Issuer.data.account,
        balance: number
      },
      ratio: number
    }
  ]
}
```

## User Facing Functions

### Create Pool

Usage: `pool.create()`

When a user wants to create an arbitrary pool between 2 assets this is needed.

### Add Funds

Usage: `pool.add()`

A sender sends funds to the pool and a hook intercepts the funds to accept or reject inclusion of the funds to the pool.

### Withdraw Funds

Usage: `pool.withdraw()`

A sender would like to withdraw funds they have in the pool.

## Trade Functions

### Handle Bid

Usage: `pool.handleBid()`

Someone wanting to trade with the bot submits a limit order on the XRPL DEX and (somehow - not even sure hooks can do this) we execute against the order book.

### Handle Ask

Usage: `pool.handleAsk()`

Someone wanting to trade with the bot submits a limit order on the XRPL DEX and the hook executes against the order.
