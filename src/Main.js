import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './components/main/Signup/Signup';
import LandingPage from './components/main/LandingPage/LandingPage';
import Login from './components/main/Login/Login';
import createProfile from './components/main/Profle/Profile'
import Lookbook from './components/Main/Lookbook';
import PostComments from './components/Main/PostComments';
import Posts from './components/Main/Posts';
import UserPage from './components/Main/UserPage';
import Sidebar from './Sidebar';

import './App.css';
function App(props) {
	
	return (
		<Router>
			<div style={{ height: '100%' }}>
				
				<main className="main">
					<div className="hidden">
						<Sidebar />
					</div>

					<div className="content">
						<Switch>
							<Route path="/" exact component={LandingPage} />
							<Route path="/signup" exact component={Signup} />
							<Route path="/login" exact component={Login} />
							<Route path="/profile" exact component={createProfile} />
							<Route path="/lookbook" exact component={Lookbook} />
							<Route path="/postComments" exact component={PostComments} />
							<Route path="/posts" exact component={Posts} />
							<Route path="/userPage" exact component={UserPage} />
						</Switch>
					</div>
				</main>
			</div>
		</Router>
	);
}

export default App;
