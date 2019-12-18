import React from 'react';
import {Route, Switch} from 'react-router-dom';
import  Home from './core/Home'
import  Signup from './user/Signup'

const MainRouter = () => (
	<div>
		<Switch>
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/" component={Home} />
		</Switch>
	</div>
);

export default MainRouter;