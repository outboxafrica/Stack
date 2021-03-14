import React, { useState, useEffect } from 'react';
import Post from './Post';
import './App.css';
import { auth, db } from './firebase';
import Modal from '@material-ui/core/Modal';
import { Button, makeStyles, Input } from '@material-ui/core';
import Nav from './Toolbar/Toolbar';
import { ScrollView } from 'react-native';
import Sidedrawer from './SideDrawer/SideDrawer';
import Backdrop from './Backdrop/Backdrop';
import Sidebar from './Sidebar/Sidebar';

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

function App() {
	const classes = useStyle();
	const [ modalStyle ] = useState(getModalStyle);

	const [ SideDrawerOpen, setSideDrawerOpen ] = useState(false);
	const [ posts, setPosts ] = useState([]);
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
 
					if (authUser.displayName) {
						//dont update username
					} else {
						//if we just created someone...
						return authUser.updateProfile({
							displayName: username,
						});
					}
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

	useEffect(() => {
		db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
			setPosts(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					post: doc.data()
				}))
			);
		});
	}, []);

	const signUp = (event) => {
		event.preventDefault();

		auth.createUserWithEmailAndPassword( email, password)
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

			
				<Nav drawerClickHandler={drawerToggleClickHandler} />
				<Sidedrawer post="Ask question" posts="Posts" user="Lookbook" show={SideDrawerOpen} />
        {backdrop}

				<div className="main">
					<div className="hidden">
						<Sidebar />
					</div>

					<div className="postpage">
						<ScrollView>
							<div className="background">
               
								{posts.map(({ id, post }) => (
                   <div className="post-wrapper">
									<Post
										key={id}
										postId={id}
										user={user}
										username={post.username}
										caption={post.caption}
										imageUrl={post.imageUrl}
									/>
                  </div>
								))}
                
							</div>
						</ScrollView>
					</div>
				</div>
		</div>
	);
}

export default App;
