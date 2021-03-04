import React from 'react';
import logo from '../images/whiteLogo.png';
import { Link } from 'react-router-dom';

import DrawerToggleButtonMain from '../SideDrawer/DrawerToggleButton';

import './Toolbar.css';

function Toolbar(props) {
	// responsive nav
	return (
		<header className="toolbar">
			<nav className="toolbar_navigation">
				
				<div className="toolbar_logo toolbar__toggle-button">
					{/* Toggle function */}
					<DrawerToggleButtonMain click={props.drawerClickHandler} />
				</div>
				<div className="toolbar_logol">
					<a href="/">
						<img src={logo} alt="logo" />
					</a>
				</div>
				<div className="spacer" />
				<div className="toolbar_navigation-items">
					<ul>
						<Link to="/">
							<li>{props.about}</li>
						</Link>
						<Link to="/userPage">
							<li>{props.main}</li>
						</Link>
						<Link to="/login">
							<li>{props.login}</li>
						</Link>
						<Link to="/signup">
							<li>{props.signup}</li>
						</Link>
					</ul>
				</div>
			</nav>
		</header>
	);
}

export default Toolbar;
