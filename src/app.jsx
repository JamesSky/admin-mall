import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';

import Layout from 'page/layout/index.jsx';
import Home from 'page/home/index.jsx';
import ProductRouter from 'page/product/router.jsx';
import Login from 'page/login/index.jsx';
import ErrorPage from 'page/error/index.jsx';
import UserList from 'page/user/index.jsx';

class App extends React.Component{
	constructor(props){
		super(props);
	}
	layoutRoute(){
		return (
			<Layout>
				<Switch>
					<Route path="/" exact component={Home}/>
					<Route path="/product" component={ProductRouter} />
					<Route path="/product-category" component={Home} />
					<Route path="/user/index" component={UserList} />
					<Redirect exact from="/user" to="/user/index" />
					<Route component={ErrorPage} />
				</Switch>
			</Layout>
		)
	}

	render(){
		return(
			<Router>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/" render={ props => this.layoutRoute() } />
				</Switch>
			</Router>
		)
	}
}

ReactDOM.render(
	<App />,
  	document.getElementById('app')
);