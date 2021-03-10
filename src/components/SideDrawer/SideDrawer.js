import React from 'react';
import './SideDrawer.css';
import { Link } from 'react-router-dom';



import {GiPostStamp} from "react-icons/gi"
import {FcAbout, FcComments} from "react-icons/fc"
import {CgCommunity, CgProfile} from "react-icons/cg"

import {FiUsers} from "react-icons/fi"
import Sidebar from '../Main/Sidebar';

function SideDrawer(props) {
	let drawerClasses = 'side-drawer';
	if (props.show) {
		drawerClasses = 'side-drawer open';
	}

	const navStyle = {
		textDecoration: 'none',
		listStyle: 'none'
	};
	return (
		// toggle Sidebar, visible on mobile only after a toggle
		<nav className={drawerClasses}>
			<ul>
			    <Link style={navStyle} to="/">
					<li> {props.about}</li>
				</Link>
			    <Link style={navStyle} to="/askQuestion">
					<li> {props.post}</li>
				</Link>
				<Link style={navStyle} to="/posts">
					<li> {props.posts}</li>
				</Link>
				<Link style={navStyle} to="/lookbook">
					<li>{props.user}</li>
				</Link>
				
				<Link style={navStyle} to="/login">
					<li>{props.log}</li>
				</Link>
				<Link style={navStyle} to="/signup">
					<li>{props.sign}</li>
				</Link>
				<Link style={navStyle} to="/userPage">
					<li>{props.prof}</li>
				</Link>
				<Link style={navStyle} to="">
					<li> {props.logout}</li>
				</Link>
			</ul>
		</nav>
	);
}

export default SideDrawer;
