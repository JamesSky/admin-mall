import React from 'react';
import { Link } from 'react-router-dom';
import User from 'service/user-service.jsx';
import Mutil from 'util/mm.jsx';

const _user = new User();
const _mm = new Mutil();

class Topnav extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: _mm.getStorage('userInfo').username || ''
        }
    }
    onLogout(){
        _user.loginOut({}).then( res => {
            _mm.removeStorage('userInfo');
            window.location.href = '/login';
        }, errMsg => {
            _mm.errorTips( errMsg );
        });
    }
    render(){
        return(
            <nav className="navbar navbar-default top-navbar" role="navigation">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to="/"><b>HAPPY</b>MALL</Link>
                </div>
                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;" aria-expanded="false">
                            <i className="fa fa-user fa-fw"></i>
                            {   this.state.username
                                ?   <span>欢迎，{this.state.username}</span>
                                :   <span>欢迎您</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={()=>{this.onLogout()}}>
                                    <i className="fa fa-sign-out fa-fw"></i> 
                                    <span>Logout</span>   
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Topnav;