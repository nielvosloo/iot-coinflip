import Web3 from 'web3'
import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import InfoIcon from '@material-ui/icons/Info';

import { makeStyles } from '@material-ui/core/styles';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';

const useStyles = makeStyles((theme) => ({

     root: {
          width: 360,
     },

     media: {
          height: 0,
          paddingTop: '56.25%',
     },

     slider: {
          width: 330,
     },

     popper: {
          width: 342,
          height: 330,
     },

}));

export default function PlaceBet(props) {
     const classes = useStyles();
     const [value, setValue] = React.useState(props.config.slider.default);
     const disabled = (props.web3.is_owner || props.web3.player.balance.eth < 1);

     const handleChange = (event, newValue) => {
          if (newValue > props.web3.player.balance.eth) {
               newValue = props.web3.player.balance.eth;
          }
          setValue(newValue);
     };

     return (
          <Box>
               <CardContent>
                    <Typography variant="h6">Available Balances</Typography>
                    <Typography variant="h6">Contract : {props.web3.contract.balance.eth} ETH</Typography>
                    <Typography variant="h6">Player   : {props.web3.player.balance.eth} ETH</Typography>
                    <Box pt={7} pb={1}>
                         <Slider
                              valueLabelDisplay="on"
                              aria-labelledby="discrete-slider"
                              marks step={1} min={props.config.slider.minimum} max={props.config.slider.maximum}
                              value={value} onChange={handleChange}
                              disabled={disabled}
                         />
                         <Typography id="discrete-slider" align="left" variant="subtitle2" color="textSecondary">Betting Amount</Typography>
                    </Box>
               </CardContent>

               <CardActions>
                    <Button variant="contained" fullWidth onClick={() => { props.config.function(1, value) }} disabled={disabled} color="primary">Heads</Button>
                    <Button variant="contained" fullWidth onClick={() => { props.config.function(0, value) }} disabled={disabled} color="default">Random</Button>
                    <Button variant="contained" fullWidth onClick={() => { props.config.function(2, value) }} disabled={disabled} color="secondary">Tails</Button>
               </CardActions>
          </Box>
     );

}
