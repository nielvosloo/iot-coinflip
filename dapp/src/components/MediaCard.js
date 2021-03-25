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

export default function MediaCard(props) {
     const classes = useStyles();
     const disabled = (props.web3.is_owner || props.web3.player.balance.eth < 1);

     return (
          <Card variant="outlined" className={classes.root}>

               <CardHeader
                    title={props.config.title}
                    titleTypographyProps={{ variant: 'h6' }}
                    subheader={props.config.subtitle}

                    avatar={
                         <Avatar alt={props.config.title} src={props.config.media.logo} />
                    }

                    action={
                         <PopupState variant="popper" popupId="info-popup-popper">
                              {(popupState) => (
                                   <div>
                                        <IconButton color="primary" aria-label="information" {...bindToggle(popupState)}>
                                             <InfoIcon fontSize="large" />
                                        </IconButton>
                                        <Popper {...bindPopper(popupState)} placement={'bottom-end'} transition>
                                             {({ TransitionProps }) => (
                                                  <Fade {...TransitionProps} timeout={600}>
                                                       <Paper variant="outlined" elevation={3} className={classes.popper}>
                                                            <Box px={1.5} py={1}>
                                                                 <Typography variant="subtitle1">Information</Typography>
                                                                 <Typography variant="subtitle2" color="textSecondary">

                                                                      Information

                                                                 </Typography>
                                                            </Box>
                                                       </Paper>
                                                  </Fade>
                                             )}
                                        </Popper>
                                   </div>
                              )}
                         </PopupState>
                    }
               />

               <CardMedia title={props.config.title} image={props.config.media.image} className={classes.media} />

               {props.content}

          </Card>
     );

}
