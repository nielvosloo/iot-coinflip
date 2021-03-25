import Web3 from 'web3'
import React from 'react';

import CoinFlipDApp from './CoinFlipDApp';

import Loading from './components/Loading';
import MenuBar from './components/MenuBar';
import MenuLabel from './components/MenuLabel';
import Panel from './components/Panel';

import CoinFlipContract from './abis/CoinFlip.json'

class DApps extends React.Component {

     constructor(props) {
          super(props);

          this.state = {
               wallet: 0,
               account: '',

               contract: {
                    account: '',
                    balance: {
                         wei: '0',
                         eth: '0',
                    },
               },

               player: {
                    account: '',
                    balance: {
                         wei: '0',
                         eth: '0',
                    },
               },

               is_owner: false,

               onFlipCoin: this.placeBetClick,
               onDepositFunds: this.depositFundsClick,
               onWithdrawFunds: this.withdrawFundsClick,

               coinflip: {},

               loading: true,
          }

     }

     async componentWillMount() {

          //window.ethereum.autoRefreshOnNetworkChange = false

          // Try and connect a wallet
          await this.loadWeb3()

          // Check if the wallet is connected
          if (this.state.wallet === 1) {
               await this.loadBlockchainData()
          }

     }

     async loadWeb3() {
          var code = 0;

          if (window.ethereum) {
               window.web3 = new Web3(window.ethereum)

               await window.ethereum.enable()
               .then(function(result) {
                    code = 1
               })
               .catch(function(e) {
                    code = 2
               })

          }
          else if (window.web3) {
               window.web3 = new Web3(window.web3.currentProvider)
          }
          else {
               window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
          }

          this.setState({ wallet: code })
     }

     async loadBlockchainData() {
          const web3 = window.web3









          // Load all of the connected wallet accounts
          const accounts = await web3.eth.getAccounts()
          this.setState({ account: accounts[0] })

          // Get the current WEI & ETH balance for the player account
          const player_wei = await web3.eth.getBalance(this.state.account)
          const player_eth = parseInt(await web3.utils.fromWei(player_wei, "ether")).toString()

          const player = {
               account: accounts[0],
               balance: {
                    wei: player_wei,
                    eth: player_eth,
               },
          }
          this.setState({ player: player })













          // Get the current connect network id number
          const network_id = await web3.eth.net.getId()

          // Load the CoinFlip contract information from the network
          const contract_data = CoinFlipContract.networks[network_id]
          if (contract_data) {
               const contract_interface = new web3.eth.Contract(CoinFlipContract.abi, contract_data.address)
               this.setState({ coinflip: contract_interface })

               // Get the current WEI & ETH balance for the contract account
               const contract_wei = await web3.eth.getBalance(contract_data.address)
               const contract_eth = parseInt(await web3.utils.fromWei(contract_wei, "ether")).toString()

               const contract = {
                    account: contract_data.address,
                    balance: {
                         wei: contract_wei,
                         eth: contract_eth,
                    },
               }
               this.setState({ contract: contract })

               const owner = await this.state.coinflip.methods.contractOwner().call()
               if (owner === this.state.player.account) {
                    this.setState({ is_owner: true })
               }

          } else {
               window.alert('CoinFlip contract not deployed to detected network.')
          }

          this.setState({ loading: false })
     }

     async placeBet(type, value) {
          let bet = Math.floor(Math.random() * 255)
          const wei = window.web3.utils.toWei(value.toString(), "ether")
          //this.setState({ loading: true })

          switch (type) {
               case 1:
                    bet = 255;
                    break;

               case 2:
                    bet = 0;
                    break;
          }

          await this.state.coinflip.methods.flipCoin(bet)
          .send({ from: this.state.player.account, value: wei })
          //.on('transactionHash', function(hash){
          //     alert('transactionHash : ' + hash);
          //})
          .on('receipt', function(receipt){
               //alert('receipt : ' + receipt);
          })
          .on('confirmation', function(confirmationNumber, receipt){
               //alert('confirmation : ' + confirmationNumber + ' - ' + receipt);
          })
          .catch(function(error) {

               if (error.message.includes("User denied transaction signature")) {
                    alert('Transaction Rejected by User');
               } else {
                    alert('place-bet::error : ' + error.message);
               }

          });

          await this.loadBlockchainData()
          //this.setState({ loading: false })
     };

     placeBetClick = (type, value) => {
          this.placeBet(type, value);
     }










     async depositFunds(value) {
          const wei = window.web3.utils.toWei(value.toString(), "ether")
          //this.setState({ loading: true })

          await this.state.coinflip.methods.deposit()
          .send({ from: this.state.player.account, value: wei })
          //.on('transactionHash', function(hash){
          //     alert('transactionHash : ' + hash);
          //})
          .on('receipt', function(receipt){
               //alert('receipt : ' + receipt);
          })
          .on('confirmation', function(confirmationNumber, receipt){
               //alert('confirmation : ' + confirmationNumber + ' - ' + receipt);
          })
          .catch(function(error) {

               if (error.message.includes("User denied transaction signature")) {
                    alert('Transaction Rejected by User');
               } else {
                    alert('place-bet::error : ' + error.message);
               }

          });

          await this.loadBlockchainData()
          //this.setState({ loading: false })
     };

     depositFundsClick = (value) => {
          this.depositFunds(value);
     }



     async withdrawFunds(value) {
          const wei = window.web3.utils.toWei(value.toString(), "ether")
          //this.setState({ loading: true })

          await this.state.coinflip.methods.withdraw(wei)
          .send({ from: this.state.player.account })
          //.on('transactionHash', function(hash){
          //     alert('transactionHash : ' + hash);
          //})
          .on('receipt', function(receipt){
               //alert('receipt : ' + receipt);
          })
          .on('confirmation', function(confirmationNumber, receipt){
               //alert('confirmation : ' + confirmationNumber + ' - ' + receipt);
          })
          .catch(function(error) {

               if (error.message.includes("User denied transaction signature")) {
                    alert('Transaction Rejected by User');
               } else {
                    alert('place-bet::error : ' + error.message);
               }

          });

          await this.loadBlockchainData()
          //this.setState({ loading: false })
     };

     withdrawFundsClick = (value) => {
          this.withdrawFunds(value);
     }



     menuItems() {
          let address
          let type

          if (this.state.wallet === 1) {

               address = this.state.player.account
               if (this.state.is_owner) {
                    type = 'Owner'
               } else {
                    type = 'Player'
               }

          } else {
               type = 'Unknown'
               address = 'wallet-not-connected'
          }

          return (

               <div>
                    <MenuLabel align="left" label="Account: " value={address} />
                    <MenuLabel align="left" label="Balance: " value={this.state.player.balance.eth + ' ETH'} />
                    <MenuLabel align="right" label={type} />
               </div>

          );

     }

     render() {
          let loading

          // Show only the loading screen
          if (this.state.loading) {

               // Use the relevant loading screen based on wallet status
               if (this.state.wallet === 0) {
                    loading = <Loading type="active" />
               } else if (this.state.wallet === 2) {
                    loading = <Loading type="alert" />
               } else {
                    loading = <Loading type="default" />
               }

          }

          return (

               <div>
                    <MenuBar items={this.menuItems()} />

                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>

                    <CoinFlipDApp web3={this.state} />

                    {loading}
               </div>

          );

     }

}

export default DApps;
