const Contract = artifacts.require("CoinFlip");

module.exports = function(deployer, network, accounts) {
     let options = {};

     // development network deployment settings
     if (network == "development") {

          // Specify the contract owner address & password and unlock the account before deploying the contract
          let _address = '0xdb52cc2086e6837E94cBCB2a1E144C2C986d1ad1';

          options = {
               from: _address,
               value: 10000000000000000000,
          };

     }

     // Deploy the contract with the specified info
     deployer.deploy(Contract, options);

};
