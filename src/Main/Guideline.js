import React, { useState, useEffect } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Sidebar from './Sidebar';

import './Guidline.css';
import { ScrollView } from 'react-native';
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';

function AskQuestion({ props }) {
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
		<div>
			<Toolbar post="Ask question" drawerClickHandler={drawerToggleClickHandler} />

			<SideDrawer post="Ask question" posts="Posts" user="Lookbook" show={SideDrawerOpen} />
			{backdrop}

			<div className="main">
				<div className="hidden">
					<Sidebar />
				</div>

				<div className="text-container">
					<ScrollView style={{width:'100%', height:'100%'}}>
						<div className="about__content">
							<h2>Welcome to EDU online Platform</h2>
							<p>
								Hello there, here are some guidelines to help you use our app
								with easy and give you a better experience with on errors.
							</p>
							<ul>
								<li>
									All users are expected to signin or login to upload/ask question and comment on
									posts
								</li>
								<li>
									In PCs signin and login are found in the navition at the top right of the screen,
									and in mobile, click the top left button on the navition.{' '}
								</li>
								<li>
									Signin with two user names E.g <u>Firstname</u> <u>Lastname</u> and use both names
									for email E.g <u>firstnamelastname</u>@gmail.com{' '}
								</li>
								<li>Login with same email and password you signed in with</li>
								<li>
									In the Ask question page, users are expected to type in their question and add and
									image as a thumbnail or in relation to their question
								</li>
							</ul>

							<h5>
								For any inquires or report, use the social media icons/links below,to reach the
								developers
							</h5>

							<div className="icons">
								<AiFillFacebook color="white" size="2em" />
								<AiFillInstagram color="#fc5185" size="2em" />
								<AiFillLinkedin color="#387f6b" size="2em" />
							</div>
						</div>
					</ScrollView>
				</div>
			</div>
		</div>
	);
}

export default AskQuestion;
