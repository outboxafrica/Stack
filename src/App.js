import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './components/Main/Signup';
import LandingPage from './components/Main/LandingPage';
import Login from './components/Main/Login';
import createProfile from './components/Main/Profile';
import Lookbook from './components/Main/Lookbook';
import AskQuestion from './components/Main/AskQuestion';
import PostComments from './components/Main/PostComments';
import Posts from './components/Main/Posts';
import UserPage from './components/Main/UserPage';

import './App.css';

function App(props) {
	return (
		<Router>
			<div style={{ height: '100%' }}>
				<Switch>
					<Route path="/" exact component={LandingPage} />
					<Route path="/signup" exact component={Signup} />
					<Route path="/login" exact component={Login} />
					<Route path="/profile" exact component={createProfile} />

					<Route path="/askQuestion" exact component={AskQuestion} />
					<Route path="/lookbook" exact component={Lookbook} />
					<Route path="/posts/:id" exact component={PostComments} />
					<Route path="/posts" exact component={Posts} />
					<Route path="/userPage" exact component={UserPage} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
