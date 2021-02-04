import React from 'react';

import Grid from '@material-ui/core/Grid';

import CardLogo from './logo.png';
import CardImage from './image.png';

import MediaCard from './components/MediaCard'

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

     const handleClick = (type, value) => {
          alert('ON_CLICK::EXCHANGE - TYPE:[' + type + '] VALUE:[' + value + ']');
     };

     const web3_info = {

          contract: {
               address: '0xdb52cc2086e6837E94cBCB2a1E144C2C986d1ad1',
               owner: '0xdb52cc2086e6837E94cBCB2a1E144C2C986d1ad1',
               balance: 100,
               tokens: 1000000,
          },

          player: {
               address: '0xdb52cc2086e6837E94cBCB2a1E144C2C986d1ad1',
               balance: 100,
               tokens: 15,
          },

          card: {

               betting: {

                    title: 'Betting',
                    subtitle: 'Try your luck by flipping a coin',

                    media: {
                         logo: CardLogo,
                         image: CardImage,
                    },

                    slider: {
                         default: 5,
                         minimum: 1,
                         maximum: 10,
                    },

                    function: {
                         placeBet: handleClick,
                    },

               },

               contract: {

                    title: 'Contract',
                    subtitle: 'SmartContract information',

                    media: {
                         logo: CardLogo,
                         image: CardImage,
                    },

                    slider: {
                         default: 5,
                         minimum: 1,
                         maximum: 10,
                    },

                    function: {
                         placeBet: handleClick,
                    },

               },

               exchange: {

                    title: 'Exchange',
                    subtitle: 'Buy & Sell CoinFlip tokens',

                    media: {
                         logo: CardLogo,
                         image: CardImage,
                    },

                    slider: {
                         default: 5,
                         minimum: 1,
                         maximum: 10,
                    },

                    function: {
                         placeBet: handleClick,
                    },

               },

               statistics: {

                    title: 'Statistics',
                    subtitle: 'Statistics relating to the player',

                    media: {
                         logo: CardLogo,
                         image: CardImage,
                    },

                    slider: {
                         default: 5,
                         minimum: 1,
                         maximum: 10,
                    },

                    function: {
                         placeBet: handleClick,
                    },

               },

          },

     }

     return (

          <Grid container className={classes.root} spacing={3}>
               <Grid item xs={12}>
                    <Grid container justify="center" spacing={3}>

                         <Grid key={0} item>
                              <MediaCard
                                   contract={web3_info.contract}
                                   player={web3_info.player}
                                   config={web3_info.card.betting}
                                   content={<div><p>This is the MediaCard tag's content for CardContent tag</p></div>}
                                   actions={<div><p>This is the MediaCard tag's content for CardActions tag</p></div>}
                              />
                         </Grid>

                         <Grid key={1} item>
                              <MediaCard
                                   contract={web3_info.contract}
                                   player={web3_info.player}
                                   config={web3_info.card.contract}
                                   content={<div><p>This is the MediaCard tag's content for CardContent tag</p></div>}
                                   actions={<div><p>This is the MediaCard tag's content for CardActions tag</p></div>}
                              />
                         </Grid>

                         <Grid key={2} item>
                              <MediaCard
                                   contract={web3_info.contract}
                                   player={web3_info.player}
                                   config={web3_info.card.exchange}
                                   content={<div><p>This is the MediaCard tag's content for CardContent tag</p></div>}
                                   actions={<div><p>This is the MediaCard tag's content for CardActions tag</p></div>}
                              />
                         </Grid>

                         <Grid key={3} item>
                              <MediaCard
                                   contract={web3_info.contract}
                                   player={web3_info.player}
                                   config={web3_info.card.statistics}
                                   content={<div><p>This is the MediaCard tag's content for CardContent tag</p></div>}
                                   actions={<div><p>This is the MediaCard tag's content for CardActions tag</p></div>}
                              />
                         </Grid>

                    </Grid>
               </Grid>
          </Grid>

     );

}
