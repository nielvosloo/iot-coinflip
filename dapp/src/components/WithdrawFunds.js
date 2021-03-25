import Web3 from 'web3'
import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

     margin: {
          margin: theme.spacing(1),
     },

}));

export default function WithdrawFunds(props) {
     const classes = useStyles();
     const [value, setValue] = React.useState(props.config.slider.default);
     const disabled = (!props.web3.is_owner || props.web3.contract.balance.eth < 1);

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
                    <Typography variant="h6">Owner    : {props.web3.player.balance.eth} ETH</Typography>
                    <Box pt={7} pb={1}>
                         <Slider
                              valueLabelDisplay="on"
                              aria-labelledby="discrete-slider"
                              marks step={1} min={props.config.slider.minimum} max={props.config.slider.maximum}
                              value={value} onChange={handleChange}
                              disabled={disabled}
                         />
                         <Typography id="discrete-slider" align="left" variant="subtitle2" color="textSecondary">Amount of ETH to withdraw</Typography>
                    </Box>
               </CardContent>

               <CardActions>
                    <Button variant="contained" fullWidth onClick={() => { props.config.function(value) }} disabled={disabled} color="primary">Withdraw Funds</Button>
               </CardActions>
          </Box>
     );

}
