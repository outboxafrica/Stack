import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import Toolbar from '../Toolbar/Toolbar';
import Backdrop from '../Backdrop/Backdrop';
import SideDrawer from '../SideDrawer/SideDrawer';
import Sidebar from './Sidebar';
import Avotor from '../images/avotor.png'
import './Lookbook.css';

function Lookbook(props) {
	const [ SideDrawerOpen, setSideDrawerOpen ] = useState(false);

	useEffect(() => {
		fetchApi();
	}, []);

	const [ loading, setLoading ] = useState(true);
	const [ person, setPerson ] = useState([]);

	const fetchApi = async () => {
		const url = 'https://outboxedugroup3-api.herokuapp.com/api/v1/questions';
		const response = await fetch(url);
		const data = await response.json();
		setLoading(false);
		setPerson(data);
		console.log(data);
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
			<Toolbar login="Login" signup="Signup" drawerClickHandler={drawerToggleClickHandler} />

			<SideDrawer
				about="About"
				logout="Logout"
				post="Ask Question" 
				posts="Posts"
				prof="My Profile"
				show={SideDrawerOpen}
			/>
			{backdrop}
			<div className="lookbook-body">
				<main className="main">
					<div className="hidden">
						<Sidebar />
					</div>
					<div className="lookbook">
						{loading || !person ? (
							<div className="loading">Loading...</div>
						) : (
							<ScrollView>
								<div className="users">
									{person.map((user) => (
										<div key={person.id} class="card" style={{ width: '18rem' }}>
											<img src={Avotor} class="card-img-top" alt="..." />
											<div class="card-body">
												<h5 class="card-title">
													<span>{user.user.name}</span>
													<h5>Email:{user.user.email}</h5>
												</h5>
											</div>
										</div>
									))}
								</div>
							</ScrollView>
						)}
					</div>
				</main>
			</div>
		</div>
	);
}

export default Lookbook;
