import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Backdrop from '../Backdrop/Backdrop';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Sidebar from './Sidebar';
import image from '../images/sccot.jpg';
import { GrSend } from 'react-icons/gr';

import './Posts.css';

function Posts(props) {
	const [ SideDrawerOpen, setSideDrawerOpen ] = useState(false);

	useEffect(() => {
		fetchApi();
	}, []);

	const [ loading, setLoading ] = useState(true);
	const [ person, setPerson ] = useState([]);

	const fetchApi = async () => {
		const url = 'https://api.randomuser.me/?results=5';
		const response = await fetch(url);
		const data = await response.json();
		setLoading(false);
		setPerson(data.results);
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
				post="Ask Question"
			    posts="Posts"
				user="Users"
				prof="My Profile"
				show={SideDrawerOpen}
			/>
			{backdrop}
			<div className="main">
				<div className="hidden">
					<Sidebar />
				</div>

				<div className="postpage">
				{loading || !person ?   <div style={{width:"80%", textAlign:'center', fontSize:'2rem', fontWeight:'200'}}>Loading...<br />please wait</div> : 
					<ScrollView>
						<div className="background">
						{person.map((user) => (
							<div key={user.login.uuid} className="post-wrapper">
								<hr />
								<div className="userQuestion">
									<div className="post">
										<img src={user.picture.large} alt="" />&nbsp;
										<span>{user.name.title}</span> &nbsp;
										<span>{user.name.first}</span>&nbsp;
										<span>{user.name.last}</span>
									</div>
									<div className="prof-P-img">
										<img src={user.picture.large} alt="" height="100%" width="100%" />
									</div>
									<div className="prof-P-message">
										<p>
											Lorem Ipsum is simply dummy text of the printing and typesetting industry.
											Lorem Ipsum has been the industry's standard dummy text ever since the
											1500s, when an unknown printer took a galley
										</p>
									</div>
									<div className="input-wrapper">
										<input className="input" type="text" placeholder="Answer" />
										<div className="post-icon">
											<GrSend size="2em" />
										</div>
									</div>
									<Link to={`/posts/${user.login.uuid}`}>
										<h3>View comments</h3>
									</Link>
								</div>
								<hr />
							</div>
						
						))}
						</div>
					</ScrollView>
						}
				</div>
			</div>
		</div>
	);
}

export default Posts;
