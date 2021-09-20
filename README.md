# Hooks based Liquidity Pool and AMM

This is an XRPL Hooks project that contains liquidity pool and automated market making hooks.

**_Please Note:_** We're still writing this document so if it's not correct feel
free to branch this and submit a PR.

This documentation assumes we'll be using <a href="https://www.assemblyscript.org/" target="_blank">AssemblyScript</a> for our smart contract.

## Developer Setup:

To get setup be sure you have docker installed.

**_Note:_** If these instructions are not enough submit an issue to this repo for more clarification also links to additional documentation is at the bottom of this README.

1. <a href="https://docs.docker.com/get-docker/" target="_blank">Install docker</a> and confirm it's running.
1. Pull the docker image that has XRPL Hooks setup within it.

   ```
   docker pull xrpllabsofficial/xrpld-hooks-testnet
   ```

1. Start the container.

   ```
   docker run -p 127.0.0.1:6005:6005/tcp -p 127.0.0.1:5005:5005/tcp -d --name xrpld-hooks xrpllabsofficial/xrpld-hooks-testnet
   ```

1. Open a shell on the container to execute commands on.

   ```
   docker exec -it xrpld-hooks /bin/bash
   ```

1. Open another shell on the container to see the log output.

   ```
   docker exec -it xrpld-hooks tail -f log
   ```

1. Get an account and tokens from the "Get Some" button at the <a href="https://hooks-testnet.xrpl-labs.com/" target="_blank">XRPL-Labs Instance of the TestNet</a>.
1. Setup a .env to work from locally. This file is in the .gitignore file so it won't get uploaded on a push.

   ```
   # For now this is just a place to keep these keys but in the future
   #   this might be pulled in by the env module of AssemblyScript
   #   or used during deployment of the hook.
   XRP_ADDRESS=rKnZEHRiT8k4CXERshnvSSrq9xLjxUcRuE
   XRP_SECRET=shLFAePb8kjyVAPdnjssDv69E4pcD
   XRPL_HOST=localhost
   XRPL_PORT=6005
   ```

1. Develop your hook.
1. Run `npm run asbuild` to compile your hook.
1. Unit test your hook.
1. Run `npm run deploy` to deploy the hook to the XRPL Labs Testnet.
1. Integration test your hook.
1. Enjoy.

## Updating Deployment Script

1. Update `deploy-hooks.ts`.
1. Run from inside the bin directory `tsc deploy-hooks.ts`.

## Building Hook

1. TBD: Still working out the details of this.

## Build Output

Build output from the compiling the hook is the `build` directory that is created when you compile the hook.

## Unit Testing

1. TBD: Still working out the details of this.

## Deploying Hook

This script depends on the build directory existing and a compiled hook existing.

1. Run `node deploy-hooks.js`.

## Integration Testing.

1. TBD: Still working out the details of this.

## Additional Setup Details:

- https://dev.to/wietse/hooked-3-tech-preview-release-play-with-smart-contracts-on-the-xrp-ledger-2076
- https://github.com/XRPL-Labs/xrpld-hooks
