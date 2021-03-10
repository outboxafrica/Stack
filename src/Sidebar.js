import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import {RiLoginBoxLine} from "react-icons/ri"
import {GiPostStamp} from "react-icons/gi"
import {FcAbout, FcComments} from "react-icons/fc"
import {CgCommunity, CgProfile} from "react-icons/cg"
import {SiGnuprivacyguard} from "react-icons/si"
import {FiUsers} from "react-icons/fi"
import sccot from "./components/images/sccot.jpg"



import './App.css';

function Sidebar() {
	return (
		// Links to sidebar on pc, displays non on mobile
			<nav className="sidebar hidden">
               
				<ul>
                   
					<Link   to="/posts">
						<li className="sidebarlinks" ><GiPostStamp  color="white" size="2em" />&nbsp; Posts</li>
					</Link>
                   
					<Link   to="/lookbook">
						<li className="sidebarlinks"><FiUsers  color="white" size="2em" />&nbsp;Users</li>
					</Link>
                   
					<Link   to="/" >
						<li  className="sidebarlinks"><FcAbout  color="white" size="2em" />&nbsp; About</li>
					</Link>
                    
					<Link to="postComments">
						<li  className="sidebarlinks" ><FcComments  color="white" size="2em" />&nbsp; Comments</li>
					</Link>
                   
					<Link   to="/login">
					   	<li className="sidebarlinks"><RiLoginBoxLine  color="white" size="2em" />&nbsp;Login</li>
					</Link>
                   
					<Link   to="signup">
						<li className="sidebarlinks"><SiGnuprivacyguard  color="white" size="2em" />&nbsp;Sign up</li>
					</Link>
                   
					<Link  to="userPage">
						<li  className="sidebarlinks"><CgProfile  color="white" size="2em" />&nbsp;My Profile</li>
					</Link>
					<Link  to="profile">
						<li  className="sidebarlinks"><CgProfile  color="white" size="2em" />&nbsp;Profile</li>
					</Link>
                   
				</ul>
			</nav>
           
		
	);
}

export default Sidebar;
