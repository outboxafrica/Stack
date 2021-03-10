import React, {useState} from 'react'
import Toolbar from '../../UI/Toolbar/Toolbar'
import Backdrop from '../../UI/Backdrop/Backdrop'
import SideDrawer from '../../UI/Backdrop/SideDrawer/SideDrawer'
import './login.css'
import LoginForm from '../../UI/LoginForm/loginForm'

function Login() {

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
				   signup="Signup" 
				   drawerClickHandler={drawerToggleClickHandler} 
				 />
				

            <SideDrawer
                   about="About"
				   sign="Signup"
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
