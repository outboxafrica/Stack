import React from 'react'

import "./DrawerToggleButton.css"

function DrawerToggleButton(props) {
    return (
      // making toggle button in mobile
     <button className="toggle-button" onClick={props.click}>
        <div className="toggle-button__line" />
        <div className="toggle-button__line" />
        <div className="toggle-button__line" />
      </button>
    )
}

export default DrawerToggleButton
