import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Backdrop from '../Backdrop/Backdrop';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Sidebar from './Sidebar';

import './AskQuestion.css';


function AskQuestion(props) {
	const [ SideDrawerOpen, setSideDrawerOpen ] = useState(false);

	

	const [ loading, setLoading ] = useState(true);
	const [ question, setQuestion ] = useState({
		question:''
	});

   function changeHandler (e)  {
	   setQuestion({question: e.target.value});
   };


	function submitHandler(e) {
        e.preventDefault()
		      console.log(question)

		axios.post(`https://outboxedugroup3-api.herokuapp.com/api/v1/questions`, question)
		 .then(response => {
		console.log(response);
		})
  .catch(error => {
   console.log(error)
  })
	}

const {Question} = question

	

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
								<form onSubmit={submitHandler} className="main-wrapper">
									<div className="quesion-image" />
									<h1>Post A Question</h1>
									<textarea className="textarea" placeholder="Add question" value={Question} onChange={changeHandler}/>
									<button type="submit">Post Question</button> 
								</form>
							</div>
			</main>
		</div>
	);
}

export default AskQuestion;
