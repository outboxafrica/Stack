import React from 'react'
import Main from './Main';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<div>
				<Switch>
                    <Main />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
