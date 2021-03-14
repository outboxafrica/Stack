import React, { useState, useEffect } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Sidebar from './Sidebar';

import './AskQuestion.css';
import ImageUpload from '../ImageUpload';
import { auth } from '../firebase';

function AskQuestion({props}) {
	const [ SideDrawerOpen, setSideDrawerOpen ] = useState(false);
	const [ username, setUsername ] = useState('');
	const [ user, setUser ] = useState(null);

	useEffect(
		() => {
			const unsubscribe = auth.onAuthStateChanged((authUser) => {
				if (authUser) {
					//user has logged in ...
					console.log(authUser);
					setUser(authUser);

					if (authUser.displayName) {
						//dont update username
					} else {
						//if we just created someone...
						return authUser.updateProfile({
							displayName: username
						});
					}
				} else {
					// user has logged out ...
					setUser(null);
				}
			});

			return () => {
				//perform some cleanup actions
				unsubscribe();
			};
		},
		[ user, username ]
	);


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
		<div>
			<Toolbar post="Ask question" drawerClickHandler={drawerToggleClickHandler} />

			<SideDrawer
				about="About"
				log="Login"
				sign="Signup"
				user="Users"
				posts="Posts"
				prof="My Profile"
				show={SideDrawerOpen}
			/>
			{backdrop}

			<div className="main">
				<div className="hidden">
					<Sidebar />
				</div>

			<div className="upload__question">
				<div className="quesion-image"></div>
				{user?.displayName || user?.email ? (
               <ImageUpload username={user.displayName} />
			    ):(
				<h3>Sorry you need to login to Upload</h3>
			    )}
				</div>



				</div>
				</div>
			    
				
		  
		    
	);
}

export default AskQuestion;
