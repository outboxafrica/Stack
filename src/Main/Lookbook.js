import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native';
import Toolbar from '../Toolbar/Toolbar';
import Backdrop from '../Backdrop/Backdrop';
import SideDrawer from '../SideDrawer/SideDrawer';
import Sidebar from './Sidebar';
import './Lookbook.css';
import firebase from 'firebase'
import { auth, db } from '../firebase';

function Lookbook(props) {
	const [ SideDrawerOpen, setSideDrawerOpen ] = useState(false);
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ users, setUsers ] = useState([]);


   
	useEffect(() => {
          auth.onAuthStateChanged((authUsers) => {
			setUsers(authUsers)
			console.log(authUsers)
		})
	}, []);

   
	
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
			<Toolbar  drawerClickHandler={drawerToggleClickHandler} />

			<SideDrawer
				post="Ask question" posts="Post" user="Lookbook"
				show={SideDrawerOpen}
			/>
			{backdrop}
			<div className="lookbook-body">
				<main className="main">
					<div className="hidden">
						<Sidebar />
					</div>
					<div className="lookbook">
					
						<div>
						 <h3>Page in development</h3>
						 <p>Sorry for the inconvinice</p>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default Lookbook;
