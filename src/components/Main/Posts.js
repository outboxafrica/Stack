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

import './Posts.css';

function Posts(props) {
	const [ SideDrawerOpen, setSideDrawerOpen ] = useState(false);
	const [ loading, setLoading ] = useState(true);
	const [ person, setPerson ] = useState([]);
	const [ answer, setAnswer ] = useState({
		answer:''
	});

	useEffect(() => {
		fetchApi();
	}, []);


	

   function changeHandler (e)  {
	   setAnswer({answer: e.target.value});
   };


	function submitHandler(e) {
        e.preventDefault()
		      console.log(answer)

		axios.post(`https://outboxedugroup3-api.herokuapp.com/api/v1/answer/5fc566dedf67dd0004e966b3/comment`, answer)
		 .then(response => {
		console.log(response);
		})
  .catch(error => {
   console.log(error)
  })
	}

const {Answer} = answer

	

	const fetchApi = async () => {
		const url = 'https://outboxedugroup3-api.herokuapp.com/api/v1/answer/comments';
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
							<div key={user.answer.user.id} className="post-wrapper">
								<hr />
								<div className="userQuestion">
									<div className="post">
										<img src={Avotor} alt="" />&nbsp;
										<span>{user.user.name}</span>
									</div>
									<div className="prof-P-message">
										<p>
									    {user.answer.question.question}
										</p>
									</div>
									<div onSubmit={submitHandler} className="input-wrapper">
										<input className="input" type="text" placeholder="Answer" value={Answer} onChange={changeHandler}/>
										<div className="post-icon">
											<button style={{background:'grey', border:'none'}} type="submit"><GrSend size="2em" /></button> 
										</div>
									</div>
									<hr />
									<div className="ans-container">
									<div className="ans-wrapper">
										<div className="ansl">
											<img src={Avotor} alt="" />&nbsp;
											<span>Last</span>
										</div>
										<p>
										{user.answer.answer}
										</p>
									</div>
									
								
								
								
									
								</div>
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
