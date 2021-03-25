import React from 'react';

import './MenuBar.css';

class MenuLabel extends React.Component {

     render() {

          return (

               <li id="menu-label" className={this.props.align}>
                    {this.props.label}{this.props.value}
               </li>

          );

     }

}

export default MenuLabel;
