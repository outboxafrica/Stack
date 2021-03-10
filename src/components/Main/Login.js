import React, {useState} from 'react'
import Toolbar from '../Toolbar/Toolbar'
import Backdrop from '../Backdrop/Backdrop'
import SideDrawer from '../SideDrawer/SideDrawer'
import LoginForm from '../UI/LoginForm/loginForm'
import './login.css'

function Login(props) {

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
        <div id="login">
            <Toolbar
                   about="About"
				   main="Posts"
				   signup="Signup" 
				   drawerClickHandler={drawerToggleClickHandler} 
				 />
				

            <SideDrawer
                   about="About"
				   sign="Signup"
				   posts="Posts"
				   show={SideDrawerOpen} 
				 />
				{backdrop}
            <main className="main">
            <div className="content">
            <h1>Login</h1>
			<LoginForm />
            </div>
            </main>
        </div>
    )
}

export default Login
