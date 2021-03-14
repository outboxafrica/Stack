import React, { useState } from 'react';
import {FlatList, ScrollView, } from 'react-native'
import {Link} from 'react-router-dom'
import Toolbar from '../Toolbar/Toolbar';
import Backdrop from '../Backdrop/Backdrop';
import SideDrawer from '../SideDrawer/SideDrawer';


import { AiFillFacebook, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';


import './LandingPage.css';

function LandingPage(props) {
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
			<Toolbar  main="Posts" login="Login" signup="Signup" drawerClickHandler={drawerToggleClickHandler} />

			<SideDrawer post="Ask question" posts="Post" user="Lookbook" show={SideDrawerOpen} />
			{backdrop}
      
			<main className="main">
     
				<div className="wrapper">
       
					<div className="text-container">
          <ScrollView>
						<div className="about">
							<h1>EDU Online Platform</h1>
							<p>
								Looking for a community to share your question with, well, today is your lacky day ,<br />Join
								thousands of students and Facitators from Outbox and get your questions answered
							</p>

							<button className="button"><Link to="/Guidelines" style={{color:"white"}} >Get Started</Link></button>
							<div className="icons">
								<AiFillFacebook color="#364f6b" size="2em" />
								<AiFillInstagram color="#fc5185" size="2em" />
								<AiFillLinkedin color="#387f6b" size="2em" />
							</div>
							<div className="image-div" />
						</div>
            </ScrollView>
					</div>
        
				</div>
      
			</main>
     
		</div>
	);
}

export default LandingPage;
