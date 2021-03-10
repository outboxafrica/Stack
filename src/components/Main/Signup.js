import React, {useState} from 'react'
import Toolbar from '../Toolbar/Toolbar'
import Backdrop from '../Backdrop/Backdrop'
import SideDrawer from '../SideDrawer/SideDrawer'
import {SiGnuprivacyguard} from "react-icons/si"
import {RiLoginBoxLine} from "react-icons/ri"
import SignupForm from '../UI/SignupForm/signupForm'
import './Signup.css'

function Signup(props) {

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
        <div id="signup" >
            <Toolbar
                   about="About"
				   main="Posts"
				   login="Login" 
				   drawerClickHandler={drawerToggleClickHandler} 
				 />
				

            <SideDrawer
			       about="About"
				   posts="Posts"
				   log="Login" 
				   show={SideDrawerOpen} 
				 />
				{backdrop}
            <main className="main">
            <div className="content">
            <h1>Signup</h1>
			<SignupForm />
            </div>
            </main>
        </div>
    )
}

export default Signup
