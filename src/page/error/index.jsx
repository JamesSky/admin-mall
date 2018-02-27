import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';

class ErrorPage extends React.Component{
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="出错啦~"/>
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <span>找不到该路径，</span>
                        <Link to="/">点我返回首页</Link>
                    </div>
                </div>
            </div>
        );
    }
};

export default ErrorPage;