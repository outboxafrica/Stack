import React, {useState, useEffect} from 'react';
import './SideDrawer.css';
import { Link } from 'react-router-dom';
import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import { auth } from '../firebase';

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

function SideDrawer(props) {

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
	//toggling the sidedrawer
	let drawerClasses = 'side-drawer';
	if (props.show) {
		drawerClasses = 'side-drawer open';
	}

	const navStyle = {
		textDecoration: 'none',
		listStyle: 'none'
	};

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
		// toggle Sidebar, visible on mobile only after a toggle
		<nav className={drawerClasses}>
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
				<Link style={navStyle} to="/lookbook">
					<li>{props.user}</li>
				</Link>
			    
				<Link style={navStyle} to="/askQuestion">
					<li> {props.post}</li>
				</Link>
				<Link style={navStyle} to="/posts">
					<li> {props.posts}</li>
				</Link>
				<Link style={navStyle}   to="/Guidelines">
						<li> Guidelines</li>
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

export default SideDrawer;
