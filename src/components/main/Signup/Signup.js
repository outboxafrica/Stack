import React, {useState} from 'react'
import Toolbar from '../../UI/Toolbar/Toolbar'
import Backdrop from '../../UI/Backdrop/Backdrop'
import SideDrawer from '../../UI/Backdrop/SideDrawer/SideDrawer'
import '../Login/login.css'
import SignupForm from '../../UI/SignupForm/signupForm'

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
				   login="Login" 
				   drawerClickHandler={drawerToggleClickHandler} 
				 />
				

            <SideDrawer
                   about="About"
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
