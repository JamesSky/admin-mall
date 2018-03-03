import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import TableList from 'util/table-list/index.jsx';
import MMUtile from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm   = new MMUtile();
const _user = new User();

class UserList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            pages: 0
        };
    }
    componentDidMount(){
        this.loadUserList();
    }
    loadUserList(){
        _user.getUserList(this.state.pageNum).then(res => {
            this.setState(res);
        }, errMsg => {
            this.setState({
                list: []
            })
            _mm.errorTips(errMsg);
        });
    }
    onPageNumChange(pageNum){
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadUserList();
        });
    }
    render(){
        let listMap = this.state.list.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                   
                </tr>
            );
        }); 
        return(
            <div id="page-wrapper">
                <div className="row">
                    <PageTitle pageTitle="用户管理"/>
                    <TableList tableHeads={['ID', '用户名', '邮箱', '电话', '注册时间']} >
                        { listMap } 
                    </TableList>
                    {
                    this.state.pages > 1 ? <Pagination onChange={(pageNum) => {this.onPageNumChange(pageNum)}} 
                        current={this.state.pageNum} 
                        total={this.state.total} 
                        showLessItems/>: null
                    }
                </div>
            </div>
        )
    }
}

export default UserList;