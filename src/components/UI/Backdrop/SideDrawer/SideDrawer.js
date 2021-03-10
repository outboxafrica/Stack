import React from 'react';
import './SideDrawer.css';
import { Link } from 'react-router-dom';

import {RiLoginBoxLine} from "react-icons/ri"
import {GiPostStamp} from "react-icons/gi"
import {FcAbout, FcComments} from "react-icons/fc"
import {CgCommunity, CgProfile} from "react-icons/cg"
import {SiGnuprivacyguard} from "react-icons/si"
import {FiUsers} from "react-icons/fi"
import Sidebar from '../../../../Sidebar';

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
				<Link style={navStyle} to="/posts">
					<li><GiPostStamp />&nbsp; {props.posts}</li>
				</Link>
				<Link style={navStyle} to="/lookbook">
					<li><FiUsers />&nbsp; {props.user}</li>
				</Link>
				<Link style={navStyle} to="/">
					<li><FcAbout />&nbsp; {props.about}</li>
				</Link>
				<Link style={navStyle} to="postComments">
					<li><FcComments />&nbsp;{props.comments}</li>
				</Link>
				<Link style={navStyle} to="/posts">
					<li><CgCommunity />{props.viewPosts}</li>
				</Link>
				<Link style={navStyle} to="/login">
					<li><RiLoginBoxLine />{props.log}</li>
				</Link>
				<Link style={navStyle} to="/signup">
					<li><SiGnuprivacyguard />&nbsp; {props.sign}</li>
				</Link>
				<Link style={navStyle} to="/userPage">
					<li><CgProfile />&nbsp; {props.prof}</li>
				</Link>
			</ul>
		</nav>
	);
}

export default SideDrawer;
