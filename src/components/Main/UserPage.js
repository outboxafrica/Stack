import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native';
import {Link} from 'react-router-dom'
import {GrSend} from 'react-icons/gr'
import Toolbar from '../Toolbar/Toolbar';
import Backdrop from '../Backdrop/Backdrop';
import SideDrawer from '../SideDrawer/SideDrawer';
import Sidebar from './Sidebar';
import image from '../images/sccot.jpg';

import './UserPage.css';

function UserPage(props) {
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
	//    function to toggle the button
	function drawerToggleClickHandler() {
		setSideDrawerOpen((prevState) => {
			return { SideDrawerOpen: !prevState.SideDrawerOpen };
		});
	}
	//    function to drop the sidebar in mobile
	function backdropClickHandler() {
		setSideDrawerOpen(false);
	}

	let backdrop;

	if (SideDrawerOpen) {
		backdrop = <Backdrop click={backdropClickHandler} />;
	}
	return (
		<div>
			<Toolbar post="Ask Question" drawerClickHandler={drawerToggleClickHandler} />

			<SideDrawer about="About"  logout="Logout" user="Users" post="Ask Question" posts="Posts" show={SideDrawerOpen} />
			{backdrop}
			<div className="main">
				<div className="hidden">
					<Sidebar />
				</div>

				<div className="userpage">
					<div className="card">
						<div className="upper-container">
							<div className="image-container">
								<img src={image} alt="" height="100px" width="100px" />
							</div>
						</div>
						<div className="lower-container">
							<span>Mr</span> &nbsp;
							<span>Lemi</span>&nbsp;
							<span>Agrey</span>
						</div>
					</div>
					<hr />
					<ScrollView>
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
					</ScrollView>
				</div>
			</div>
		</div>
	);
}

export default UserPage;
