import React, { useEffect, useState } from 'react';
import { Link,  } from 'react-router-dom';
import {GiPostStamp} from "react-icons/gi"
import {FcAbout} from "react-icons/fc"
import {CgCommunity,} from "react-icons/cg"
import {FiUsers} from "react-icons/fi"

import './Sidebar.css'
import { auth } from '../firebase';
import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import { AiFillInfoCircle } from 'react-icons/ai';


function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

const useStyle = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	}
}));

function Sidebar() {

	const classes = useStyle();
	const [ modalStyle ] = useState(getModalStyle);

	const [ open, setOpen ] = useState(false);
	const [ openSignIn, setOpenSignIn ] = useState(false);
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ user, setUser ] = useState(null);
       
		// Signup
		useEffect(
			() => {
				const unsubscribe = auth.onAuthStateChanged((authUser) => {
					if (authUser) {
						//user has logged in ...
						console.log(authUser);
						setUser(authUser);
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

		const signUp = (event) => {
			event.preventDefault();
	
			auth
		.createUserWithEmailAndPassword(email, password)
		.then((authUser) => {
			return authUser.user.updateProfile({
				 displayName: username
			 })
		  })
		.catch((error) => alert(error.message));
	
		setOpen(false);
		};

	  const signIn = (event) => {
			event.preventDefault();
	
			auth
		.signInWithEmailAndPassword(email, password)
		.catch((error) => alert(error.message));
	
		setOpenSignIn(false);
		};
	return (
		// Links to sidebar on pc, displays non on mobile
			<nav className="sidebar hidden">
              	<Modal open={open} onClose={() => setOpen(false)}>
				<div style={modalStyle} className={classes.paper}>
					<form className="app__signup">
						<h2>Signup</h2>

						<Input
							placeholder="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>

						<Input
							placeholder="email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<Input
							placeholder="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<Button type="submit" onClick={signUp}>
							Sign Up
						</Button>
					</form>
				</div>
			</Modal>

			<Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
				<div style={modalStyle} className={classes.paper}>
					<form className="app__signup">
						<h2>Login</h2>

						<Input
							placeholder="email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<Input
							placeholder="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<Button type="submit" onClick={signIn}>
						Login
						</Button>
					</form>
				</div>
			</Modal>
				
				<ul>
				   <Link   to="/" >
						<li  className="sidebarlinks"><FcAbout  color="white" size="2em" />&nbsp; About</li>
					</Link>
                   
					<Link   to="/posts">
						<li className="sidebarlinks" ><GiPostStamp  color="white" size="2em" />&nbsp; Posts</li>
					</Link>

					<Link   to="/askQuestion">
						<li className="sidebarlinks" ><CgCommunity  color="white" size="2em" />&nbsp; Ask Question</li>
					</Link>
                   
					<Link   to="/lookbook">
						<li className="sidebarlinks"><FiUsers  color="white" size="2em" />&nbsp;Lookbook</li>
					</Link>
                   
					<Link   to="/askQuestion">
						<li className="sidebarlinks" ><CgCommunity  color="white" size="2em" />&nbsp; Ask Question</li>
					</Link>
					<Link   to="/Guidelines">
						<li className="sidebarlinks" ><AiFillInfoCircle  color="white" size="2em" />&nbsp; Guidelines</li>
					</Link>
                   
					{user ? (
				<button onClick={() => auth.signOut()}>Logout</button>
			) : (
				<div className="app__loginContainer">
					<Button style={{color:'white',}}  onClick={() => setOpenSignIn(true)}>Login</Button>
					<Button style={{color:'white',}} onClick={() => setOpen(true)}>Signup</Button>
				</div>
			)}
                   
				</ul>
				
			</nav>
           
		
	);
}

export default Sidebar;
