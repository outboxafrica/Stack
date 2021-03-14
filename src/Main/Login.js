import React, {useState, useEffect} from 'react'
import Toolbar from '../Toolbar/Toolbar'
import Backdrop from '../Backdrop/Backdrop'
import SideDrawer from '../SideDrawer/SideDrawer'
import './login.css'
import { Button, Input, Link } from '@material-ui/core'
import { auth } from '../firebase'

function Login(props) {

    const [ SideDrawerOpen, setSideDrawerOpen ] = useState(false);
	const [ open, setOpen ] = useState(false);
	const [ openSignIn, setOpenSignIn ] = useState(false);
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ user, setUser ] = useState(null);

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

	const signIn = (event) => {
		event.preventDefault();

		auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false);
	};
    return (
        <div id="login">
            <Toolbar
                   about="About"
				   main="Posts"
				   signup="Signup" 
				   drawerClickHandler={drawerToggleClickHandler} 
				 />
				

            <SideDrawer
                  post="Ask question" posts="Post" user="Lookbook"
				   show={SideDrawerOpen} 
				 />
				{backdrop}
            <main className="main">
            <div className="content">
			
				
					<form className="app__signup" open={openSignIn} onClose={() => setOpenSignIn(false)}>
						<h2>Login</h2>

						<Input
						    style={{ color: 'white'}}
							placeholder="email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<Input
						   style={{ color: 'white'}}
							placeholder="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
                        <Link to='/posts'>
						<Button type="submit" onClick={signIn}>
						Login
						</Button>
						</Link>
					</form>
				</div>
            </main>
        </div>
    )
}

export default Login
