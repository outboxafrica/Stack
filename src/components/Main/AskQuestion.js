import React, { useState, useEffect } from 'react';
import { Spring } from 'react-spring';
import Backdrop from '../Backdrop/Backdrop';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Sidebar from './Sidebar';

import './AskQuestion.css';

function AskQuestion(props) {
	const [ SideDrawerOpen, setSideDrawerOpen ] = useState(false);

	useEffect(() => {
		fetchApi();
	}, []);

	const [ loading, setLoading ] = useState(true);
	const [ person, setPerson ] = useState([]);

	const fetchApi = async () => {
		const url = 'https://git.heroku.com/outboxedugroup3-api.git';
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
				posts="Posts"
				prof="My Profile"
				show={SideDrawerOpen}
			/>
			{backdrop}

			<main className="main">
				<div className="hidden">
					<Sidebar />
				</div>
							<div className="question-wrapper">
								<div className="main-wrapper">
									<div className="quesion-image" />
									<h1>Post A Question</h1>
									<textarea className="textarea" placeholder="Add question" />
									<button type="submit">Post Question</button>
								</div>
							</div>
			</main>
		</div>
	);
}

export default AskQuestion;
