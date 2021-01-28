const Contract = artifacts.require("Migrations");

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

     // Deploy the contract with the specified info
     deployer.deploy(Contract, options);

};

