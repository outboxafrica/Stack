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

import './PostComments.css';

function PostComments({ props, match }) {
	const [ SideDrawerOpen, setSideDrawerOpen ] = useState(false);

	useEffect(() => {
		fetchApi();
    console.log(match)
	}, []);

	const [ loading, setLoading ] = useState(true);
	const [ person, setPerson ] = useState();

	const fetchApi = async () => {
		const url = `https://api.randomuser.me/?results=${match.params.id}`;
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
									<img src={image} alt="" />&nbsp;
									<span>Mr</span> &nbsp;
									<span>First</span>&nbsp;
									<span>Last</span>
								</div>
								<div className="prof-P-img">
									<img src={image} alt="" height="100%" width="100%" />
								</div>
								<div className="prof-P-message">
									<p>
										Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
										Ipsum has been the industry's standard dummy text ever since the 1500s, when an
										unknown printer took a galley
									</p>
								</div>
								<hr />
								<div className="ans-container">
									<div className="ans-wrapper">
										<div className="ansl">
											<img src={image} alt="" />&nbsp;
											<span>Mr</span> &nbsp;
											<span>First</span>&nbsp;
											<span>Last</span>
										</div>
										<p>
											{' '}
											Lorem Ipsum is simply dummy text of the printing and typesetting industry.
										</p>
									</div>
									<div className="ans-wrapper">
										<div className="ansl">
											<img src={image} alt="" />&nbsp;
											<span>Mr</span> &nbsp;
											<span>First</span>&nbsp;
											<span>Last</span>
										</div>
										<p>
											{' '}
											Lorem Ipsum is simply dummy text of the printing and typesetting industry.
										</p>
									</div>
									<div className="ans-wrapper">
										<div className="ansl">
											<img src={image} alt="" />&nbsp;
											<span>Mr</span> &nbsp;
											<span>First</span>&nbsp;
											<span>Last</span>
										</div>
										<p>
											{' '}
											Lorem Ipsum is simply dummy text of the printing and typesetting industry.
										</p>
									</div>
									<div className="ans-wrapper">
										<div className="ansl">
											<img src={image} alt="" />&nbsp;
											<span>Mr</span> &nbsp;
											<span>First</span>&nbsp;
											<span>Last</span>
										</div>
										<p>
											{' '}
											Lorem Ipsum is simply dummy text of the printing and typesetting industry.
										</p>
									</div>
									<div className="ans-wrapper">
										<div className="ansl">
											<img src={image} alt="" />&nbsp;
											<span>Mr</span> &nbsp;
											<span>First</span>&nbsp;
											<span>Last</span>
										</div>
										<p>
											{' '}
											Lorem Ipsum is simply dummy text of the printing and typesetting industry.
										</p>
									</div>
									<div className="ans-wrapper">
										<div className="ansl">
											<img src={image} alt="" />&nbsp;
											<span>Mr</span> &nbsp;
											<span>First</span>&nbsp;
											<span>Last</span>
										</div>
										<p>
											{' '}
											Lorem Ipsum is simply dummy text of the printing and typesetting industry.
										</p>
									</div>
									<div className="ans-wrapper">
										<div className="ansl">
											<img className="img" src={image} alt="" />&nbsp;
											<span>Mr</span> &nbsp;
											<span>First</span>&nbsp;
											<span>Last</span>
										</div>
										<p>
											Lorem Ipsum is simply dummy text of the printing and typesetting industry.
										</p>
									</div>
								</div>
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
