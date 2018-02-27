import React from 'react';
import User from 'service/user-service.jsx';
import Mutil from 'util/mm.jsx';

const _user = new User();
const _mm = new Mutil();

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: _mm.getParam( 'redirect') || '/'
        }
    }
    componentWillMount(){
        document.title = `登录 - HAPPYMALL`;
    }
    onInputChange(e){
        let [inputValue, inputName]  = [e.target.value, e.target.name];
        this.setState({
            [inputName] : inputValue
        })
    }
    onInputKeyUp(e){
        if (e.keyCode === 13 ){
            this.onLogin();
        }   
    }
    onLogin(){
        let userInfo = {
            username: this.state.username,
            password: this.state.password
        };
        let checkResult = _user.checkLoginInfo( userInfo );
        if( checkResult.status ){
            _user.login( userInfo ).then((data) => {
                console.log(data);
                _mm.setStorage('userInfo', data);
                this.props.history.push( this.state.redirect );
            }, (errStatus) => {
                _mm.errorTips( errStatus );
            })
        } else {
            _mm.errorTips( checkResult.msg )
        }
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">欢迎登录 - MMALL管理系统</h3>
                        </div>
                        <div className="panel-body">
                            <div role="form" >
                                <div className="form-group">
                                    <input className="form-control" 
                                        placeholder="User Name" 
                                        name="username" 
                                        type="text" 
                                        autoComplete="off" 
                                        autoFocus
                                        onKeyUp={(e) => this.onInputKeyUp(e)} 
                                        onChange={(e) => this.onInputChange(e)}/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" 
                                        placeholder="Password" 
                                        name="password" 
                                        type="password" 
                                        onKeyUp={(e) => this.onInputKeyUp(e)} 
                                        onChange={(e) => this.onInputChange(e)}/>
                                </div>
                                <button  onClick={(e) => this.onLogin(e)} className="btn btn-lg btn-primary btn-block">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Login;