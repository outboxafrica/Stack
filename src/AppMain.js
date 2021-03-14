import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './Main/Signup';
import LandingPage from './Main/LandingPage';
import Login from './Main/Login';
import Guideline from './Main/Guideline';

import Lookbook from './Main/Lookbook';
import AskQuestion from './Main/AskQuestion';
import AppMajor from './App';

import './App.css';

function AppMain(props) {
	return (
		<Router>
			<div style={{ height: '100%' }}>
				<Switch>
					<Route path="/" exact component={LandingPage} />
					<Route path="/signup" exact component={Signup} />
					<Route path="/login" exact component={Login} />
					<Route path="/posts" exact component={AppMajor} />
					<Route path="/guidelines" exact component={Guideline} />
					<Route path="/askQuestion" exact component={AskQuestion} />
					<Route path="/lookbook" exact component={Lookbook} />
				</Switch>
			</div>
		</Router>
	);
}

export default AppMain;
