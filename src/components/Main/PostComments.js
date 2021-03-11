import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Backdrop from '../Backdrop/Backdrop';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Sidebar from './Sidebar';
import Avotor from '../images/avotor.png'
import { GrSend } from 'react-icons/gr';

import './PostComments.css';

function PostComments({ props, match }) {
	const [ SideDrawerOpen, setSideDrawerOpen ] = useState(false);

	useEffect(() => {
		fetchApi();
		console.log(match)
	}, []);

	const [ loading, setLoading ] = useState(true);
	const [ person, setPerson ] = useState([]);

	const fetchApi = async () => {
		const url = `https://outboxedugroup3-api.herokuapp.com/api/v1/${match.params.id}`;
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
			<Toolbar post="Ask question" drawerClickHandler={drawerToggleClickHandler} />

			<SideDrawer
				about="About"
				log="Login"
				sign="Signup"
				user="Users"
        post="Ask Question" 
        posts="Posts"
				prof="My Profile"
				show={SideDrawerOpen}
			/>
			{backdrop}
			<div className="main">
				<div className="hidden">
					<Sidebar />
				</div>

				<div className="postpage">
					<ScrollView>
						<input type="text" />
						<div className="post-wrapper">
							<hr />
							<div className="userQuestion">
								<div className="post">
									<img src={Avotor} alt="" />
									<span>{person.name}</span>
								</div>
								<div className="prof-P-img">
									<img src={Avotor} alt="" height="100%" width="100%" />
								</div>
								<div className="prof-P-message">
									<p>
										{person.question}
									</p>
								</div>
								<hr />
							
							</div>
							<hr />
						</div>
					</ScrollView>
				</div>
			</div>
		</div>
	);
}

export default PostComments;
