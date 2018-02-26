import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';

import Layout from 'page/layout/index.jsx';
import Home from 'page/home/index.jsx';

class App extends React.Component{
	render(){
		return(
			<Router>
				<Layout>
					<Switch>
					 	<Route path="/" exact component={Home}/>
						{/* <Route exact path="/product" component={Home} />
						<Route exact path="/product-category" component={Home} /> */}
					</Switch>
				</Layout>	
			</Router>
		)
	}
}

ReactDOM.render(
	<App />,
  	document.getElementById('app')
);