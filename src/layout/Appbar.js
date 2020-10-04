import React from 'react';
import {Icon} from "semantic-ui-react";

function Appbar () {
    const appbarStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60px',
        backgroundColor: '#1b1c1d',
        fontSize: '1.5rem',
        color: '#fff'
    };
  return (

    <header className="Appbar">

      <h1 style={appbarStyles}>
          <Icon name="paper plane outline"/>
          WAY.TO
      </h1>
    </header>);
}

export default Appbar;