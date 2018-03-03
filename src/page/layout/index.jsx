import React from 'react';
import Topnav from 'component/top-nav/index.jsx';
import Sidenav from 'component/side-nav/index.jsx';
import './theme.css';
import './index.scss';
class Layout extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div id="wrapper">
                <Topnav />
                <Sidenav />
                {this.props.children}
            </div>
        )
    }
}

export default Layout;