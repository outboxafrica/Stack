import React, { useState } from 'react';
import Toolbar from '../Toolbar/Toolbar';
import Backdrop from '../Backdrop/Backdrop';
import SideDrawer from '../SideDrawer/SideDrawer';
import Sidebar from './Sidebar';
import './Profile';

function Profile(props) {
	const [ SideDrawerOpen, setSideDrawerOpen ] = useState(false);

	function drawerToggleClickHandler() {
		setSideDrawerOpen((prevState) => {
			return { SideDrawerOpen: !prevState.SideDrawerOpen };
		});
	}

	function backdropClickHandler() {
		setSideDrawerOpen(false);
	}

	let backdrop;

	if (SideDrawerOpen) {
		backdrop = <Backdrop click={backdropClickHandler} />;
	}
	return (
		<div id="signup">
			<Toolbar post="Ask question!" drawerClickHandler={drawerToggleClickHandler} />

			<SideDrawer about="About" log="Login" sign="Signup" prof="My Profile" show={SideDrawerOpen} />
			{backdrop}
			<div className="hidden">
				<Sidebar />
			</div>

			<div className="profile">
				<h1>Create a profile</h1>
			</div>
		</div>
	);
}

export default Profile;
