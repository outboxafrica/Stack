import React, { useState, useEffect } from 'react';
import logo from '../images/whiteLogo.png';
import DrawerToggleButtonMain from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';
import { auth } from '../firebase';
import { Button, Input, makeStyles, Modal } from '@material-ui/core';

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

function Toolbar(props) {
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
				});
			})
			.catch((error) => alert(error.message));

		setOpen(false);
	};
	const signIn = (event) => {
		event.preventDefault();

		auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error.message));

		setOpenSignIn(false);
	};

	// responsive nav
	return (
		<header className="toolbar">
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
			<nav className="toolbar_navigation">
				<div className="toolbar_logo toolbar__toggle-button">
					{/* Toggle function */}
					<DrawerToggleButtonMain click={props.drawerClickHandler} />
				</div>
				<div className="toolbar_logol">
					<a href="/">
						<img src={logo} alt="logo" />
					</a>
				</div>
				<div className="spacer" />
				<div className="toolbar_navigation-items">
					<ul>
						{user ? (
							<button onClick={() => auth.signOut()}>Logout</button>
						) : (
							<div className="app__loginContainer">
								<Button style={{ color: 'white' }} onClick={() => setOpenSignIn(true)}>
									Login
								</Button>
								<Button style={{ color: 'white' }} onClick={() => setOpen(true)}>
									Signup
								</Button>
							</div>
						)}
					</ul>
				</div>
			</nav>
		</header>
	);
}

export default Toolbar;
