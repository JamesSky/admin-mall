import React from 'react';
import { Link } from 'react-router';
import MMUtile from 'util/mm.jsx';
import PageTitle from 'component/page-title/index.jsx';
import Order from 'service/order-service.jsx';
import TableList from 'util/table-list/index.jsx';

import './detail.scss';

const _mm = new MMUtile();
const _order = new Order();

class OrderDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            orderNumber: props.match.params.orderNumber,
            orderInfo : {}
        };
    }
    componentDidMount(){
        // 初始化产品
        this.loadOrderDetail();
    }
    // 加载detail信息
    loadOrderDetail(){
        _order.getOrderDetail(this.state.orderNumber).then(res => {
            this.setState({
                orderInfo: res
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    onSendGoods(){
        if(confirm('是否确认该订单已发货？')){
            _order.sendGoods(this.state.orderNumber).then(res => {
                this.loadOrderDetail();
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }
    }
    render() {
        let productList     = this.state.orderInfo.orderItemVoList  || [],
            receiverInfo    = this.state.orderInfo.shippingVo       || {};

        let tableHeads = [
            {'name': '商品图片', 'width': '15%'},
            {'name': '商品信息', 'width': '40%'},
            {'name': '单价', 'width': '15%'},
            {'name': '数量', 'width': '15%'},
            {'name': '合计', 'width': '15%'},
        ];
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="订单详情"/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-2 control-label">订单号：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.orderInfo.orderNo}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">创建时间：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.orderInfo.createTime}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">收件人：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">
                                        {this.state.orderInfo.receiverName}，
                                        {receiverInfo.receiverProvince} 
                                        {receiverInfo.receiverCity}，
                                        {receiverInfo.receiverAddress}，
                                        {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
                                    </p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">订单状态：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">
                                        {this.state.orderInfo.statusDesc}
                                        {
                                            this.state.orderInfo.status == 20 
                                                ? <a className="btn btn-sm btn-default btn-send-goods" onClick={() => {this.onSendGoods()}}>立即发货</a>
                                                : null
                                        }   
                                        
                                    </p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">支付方式：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">订单金额：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">￥{this.state.orderInfo.payment}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">商品列表：</label>
                                <div className="col-md-10">
                                <TableList tableHeads={ tableHeads }>
                                {
                                    productList.map((product, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <img className="p-img" src={this.state.orderInfo.imageHost + product.productImage} alt={product.productName}/>
                                                </td>
                                                <td>{product.productName}</td>
                                                <td>￥{product.currentUnitPrice}</td>
                                                <td>{product.quantity}</td>
                                                <td>￥{product.totalPrice}</td>
                                            </tr>
                                        );
                                    })
                                }
                                </TableList>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default OrderDetail;