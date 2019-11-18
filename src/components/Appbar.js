import React from 'react';
import {Icon} from "semantic-ui-react";

function Appbar () {
    const appbarStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '5vh',
        backgroundColor: '#1b1c1d',
        fontSize: '1.5rem',
        color: '#fff'
    };
  return (

    <div className="Appbar">

      <h1 style={appbarStyles}>
          <Icon name="paper plane outline"/>
          WAY.TO
      </h1>
    </div>);
};

export default Appbar;