import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import MMUtile from 'util/mm.jsx';
import Order from 'service/order-service.jsx';
import ListSearch from './order-list-search.jsx';
import TableList from 'util/table-list/index.jsx';

const _mm = new MMUtile();
const _order = new Order();

class OrderList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            listType: 'list', // list / search
            orderNumber: '',
            pageNum: 1,
            pages: 0
        };
    }
    componentDidMount(){
       this.loadOrderList();
    }
    // 加载产品列表
    loadOrderList(){
        let listParam= {};
        listParam.listType= this.state.listType;
        listParam.pageNum= this.state.pageNum;
        // 按商品名搜索
        if(this.state.listType ==='search'){
            listParam.orderNo = this.state.orderNumber;
        }
        // 查询
        console.log(listParam)
        _order.getOrderList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    // 搜索
    onSearch(orderNumber){
        console.log(orderNumber)
        if(orderNumber){
            this.setState({
                listType: 'search',
                pageNum: 1,
                orderNumber,
            }, () => {
                this.loadOrderList();
            });
        }else{
            this.setState({
                listType: 'list',
                pageNum: 1
            }, () => {
                this.loadOrderList();
            });
        }
            
    }
    // 页数变化
    onPageNumChange(pageNum){
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadOrderList();
        });
    }
    render() {
        let tableHeads = [
            '订单号',    
            '收件人',    
            '订单状态',    
            '订单总价',    
            '创建时间',    
            '操作',    
        ];
        return(
            <div id="page-wrapper">
                <div className="row">
                    <PageTitle pageTitle="订单管理" />
                    <ListSearch 
                        onSearch={
                            (orderNumber) => {
                                this.onSearch(orderNumber); 
                            }
                        }
                    />
                    <TableList tableHeads={ tableHeads }>
                        {
                            this.state.list.map((order, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Link className="opear" to={ '/order/detail/' + order.orderNo}>{order.orderNo}</Link>
                                        </td>  
                                        <td>{order.receiverName}</td>   
                                        <td>{order.statusDesc}</td>     
                                        <td>￥{order.payment}</td>
                                        <td>{order.createTime}</td>
                                        <td>
                                            <Link className="opear" to={ `/order/detail/${order.orderNo}`}>查看</Link>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </TableList>
                    {
                    this.state.pages > 1 ? <Pagination onChange={(pageNum) => {this.onPageNumChange(pageNum)}} 
                        current={this.state.pageNum} 
                        total={this.state.total} 
                        showLessItems/>: null
                    }
                </div>
            </div>
        );
    }
};

export default OrderList;