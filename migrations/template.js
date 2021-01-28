const Contract = artifacts.require("Template");

module.exports = function(deployer, network, accounts) {
     let options = {};

     // development network deployment settings
     if (network == "development") {

          // Specify the contract owner address & password and unlock the account before deploying the contract
          let _address = '0x...';

          options = {
               from: _address,
               value: 0,
          };

     }

     // Deploy the different contracts as defined
     deployer.deploy(Contract, options);

};

