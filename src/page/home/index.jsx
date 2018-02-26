import React from 'react';
import PageTitle from 'component/page-title/index.jsx';

class Home extends React.Component{
    render(){
        return(
            <div id="page-wrapper">
                <PageTitle pageTitle="首页" />
            </div>
        )
    }
}

export default Home;