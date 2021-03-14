import React, {useState} from 'react'
import Toolbar from '../Toolbar/Toolbar'
import Backdrop from '../Backdrop/Backdrop'
import SideDrawer from '../SideDrawer/SideDrawer'
import './Signup.css'
import {Link} from 'react-router-dom'
import { Button, Input} from '@material-ui/core'
import { auth } from '../firebase'

function Signup(props) {

    const [ SideDrawerOpen, setSideDrawerOpen ] = useState(false);
	const [ open, setOpen ] = useState(false);
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	

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

	const signUp = (event) => {
		event.preventDefault();

		auth
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));

    setOpen(false);
	};

    return (
        <div id="signup" >
            <Toolbar
				   drawerClickHandler={drawerToggleClickHandler} 
				 />
				

            <SideDrawer
			       post="Ask question" posts="PostS" user="Lookbook"
				   show={SideDrawerOpen} 
				 />
				{backdrop}
            <main className="main">
            <div className="content">
				
					<form className="app__signup">
						<h2>Signup</h2>

						<Input
						   style={{ color: 'white'}}
							placeholder="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>

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
                       <Link to="/posts">
						<Button type="submit" onClick={signUp}>
							Sign Up
						</Button>
						</Link>
					</form>

            </div>
            </main>
        </div>
    )
}

export default Signup
