import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import {RiLoginBoxLine} from "react-icons/ri"
import {GiPostStamp} from "react-icons/gi"
import {FcAbout, FcComments} from "react-icons/fc"
import {CgCommunity, CgProfile} from "react-icons/cg"
import {SiGnuprivacyguard} from "react-icons/si"
import {FiUsers} from "react-icons/fi"

import './Sidebar.css'


function Sidebar() {
	return (
		// Links to sidebar on pc, displays non on mobile
			<nav className="sidebar hidden">
               
				<ul>
				   <Link   to="/" >
						<li  className="sidebarlinks"><FcAbout  color="white" size="2em" />&nbsp; About</li>
					</Link>
                   
					<Link   to="/posts">
						<li className="sidebarlinks" ><GiPostStamp  color="white" size="2em" />&nbsp; Posts</li>
					</Link>

					<Link   to="/askQuestion">
						<li className="sidebarlinks" ><CgCommunity  color="white" size="2em" />&nbsp; Ask Question</li>
					</Link>
                   
					<Link   to="/lookbook">
						<li className="sidebarlinks"><FiUsers  color="white" size="2em" />&nbsp;Lookbook</li>
					</Link>
                   
					<Link   to="/askQuestion">
						<li className="sidebarlinks" ><CgCommunity  color="white" size="2em" />&nbsp; Ask Question</li>
					</Link>
                   
					<Link   to="/login">
					   	<li className="sidebarlinks"><RiLoginBoxLine  color="white" size="2em" />&nbsp;Logout</li>
					</Link>
                   
					<Link  to="userPage">
						<li  className="sidebarlinks"><CgProfile  color="white" size="2em" />&nbsp;My Profile</li>
					</Link>
                   
				</ul>
			</nav>
           
		
	);
}

export default Sidebar;
