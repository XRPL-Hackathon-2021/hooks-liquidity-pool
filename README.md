# Hooks based Liquidity Pool and AMM

This is an XRPL Hooks project that contains liquidity pool and automated market making hooks.

**_Please Note:_** We're still writing this document so if it's not correct feel
free to branch this and submit a PR.

This documentation assumes we'll be using <a href="https://www.assemblyscript.org/" target="_blank">AssemblyScript</a> for our smart contract.

## Developer Setup:

To get setup be sure you have docker installed.

1. <a href="https://docs.docker.com/get-docker/" target="_blank">Install docker</a> and confirm it's running.
1. Pull the docker image that has XRPL Hooks setup within it.

   ```
   docker pull xrpllabsofficial/xrpld-hooks-testnet
   ```

1. Open a shell on the container to execute commands on.

   ```
   docker exec -it xrpld-hooks /bin/bash
   ```

1. Open anoterh shell on the container to see the log output.
   ```
   docker exec -it xrpld-hooks tail -f log
   ```
   If the instructions are not enough submit an issue to this repo for more clarification.
1. Get an account and tokens from the "Get Some" button at the <a href="https://hooks-testnet.xrpl-labs.com/" target="_blank">XRPL TestNet</a>.
1. Setup a .env (this file is in the .gitignore file so it won't get uploaded) to work from locally.

   ```
   # For now this is just a place to keep these keys but in the future
   #   this might be pulled in by the env module of AssemblyScript
   #   or used during deployment of the hook.

   address: rJFbDorCYPpL6Xn9MMpNShLcXaDghrNQPE
   secret: sntFyFH7NhHPjVY1E3T3wGJgTQPVt
   ```

1. Develop your hook.
1. Unit test your hook.
1. Run `bin/deploy-hooks.js` to deploy the hook to the XRPL Labs Testnet.
1. Integration test your hook.
1. Enjoy.

## Additional Setup Details:

- https://dev.to/wietse/hooked-3-tech-preview-release-play-with-smart-contracts-on-the-xrp-ledger-2076
- https://github.com/XRPL-Labs/xrpld-hooks
