import React from 'react';

import './MenuBar.css';

class MenuBar extends React.Component {

     render() {

          return (

               <ul id="menu-bar">
                    {this.props.items}
               </ul>

          );

     }

}

export default MenuBar;
