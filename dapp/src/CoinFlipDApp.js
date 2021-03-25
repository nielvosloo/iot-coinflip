import Web3 from 'web3'
import React from 'react';

import Grid from '@material-ui/core/Grid';

import CardLogo from './logo.png';
import CardImage from './image.png';

import MediaCard from './components/MediaCard'
import DepositFunds from './components/DepositFunds'
import PlaceBet from './components/PlaceBet'
import WithdrawFunds from './components/WithdrawFunds'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

     root: {
          flexGrow: 1,
     },

     control: {
          padding: theme.spacing(2),
     },

}));

export default function CoinFlipDApp(props) {
     const classes = useStyles();

     const config = {

          betting: {

               title: 'Betting (Player)',
               subtitle: 'Try your luck by flipping coins',

               media: {
                    logo: CardLogo,
                    image: CardImage,
               },

               slider: {
                    default: 5,
                    minimum: 1,
                    maximum: 10,
               },

               function: props.web3.onFlipCoin,

          },

          deposit: {

               title: 'Deposit (Owner)',
               subtitle: 'Deposit funds to contract',

               media: {
                    logo: CardLogo,
                    image: CardImage,
               },

               slider: {
                    default: 5,
                    minimum: 1,
                    maximum: props.web3.player.balance.eth,
               },

               textfield: {
                    default: 1,
               },

               function: props.web3.onDepositFunds,

          },

          withdraw: {

               title: 'Withdraw (Owner)',
               subtitle: 'Withdraw funds from contract',

               media: {
                    logo: CardLogo,
                    image: CardImage,
               },

               slider: {
                    default: 5,
                    minimum: 1,
                    maximum: props.web3.contract.balance.eth,
               },

               textfield: {
                    default: 1,
               },

               function: props.web3.onWithdrawFunds,

          },

     }

     let grid_content = (
          <Grid container justify="center" spacing={3}>

               <Grid key={0} item>
                    <MediaCard
                         web3={props.web3}
                         config={config.betting}
                         content={<PlaceBet web3={props.web3} config={config.betting} />}
                    />
               </Grid>

          </Grid>
     )

     if (props.web3.is_owner) {

          grid_content = (
               <Grid container justify="center" spacing={3}>

                    <Grid key={0} item>
                         <MediaCard
                              web3={props.web3}
                              config={config.deposit}
                              content={<DepositFunds web3={props.web3} config={config.deposit} />}
                         />
                    </Grid>

                    <Grid key={1} item>
                         <MediaCard
                              web3={props.web3}
                              config={config.withdraw}
                              content={<WithdrawFunds web3={props.web3} config={config.withdraw} />}
                         />
                    </Grid>

               </Grid>
          )

     }

     return (

          <Grid container className={classes.root} spacing={3}>
               <Grid item xs={12}>
                    {grid_content}
               </Grid>
          </Grid>

     );

}
