import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import MMUtile from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import TableList from 'util/table-list/index.jsx';

const _mm   = new MMUtile();
const _product = new Product();

import './index.scss';
import ListSearch from './index-list-search.jsx';

class ProductList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            pages: 0,
            listType: 'list'
        };
    }
    componentDidMount(){
       this.loadProductList();
    }
    loadProductList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        // 如果是搜索，需要添加类型和搜索词
        if(listParam.listType === 'search'){
            listParam.searchType = this.state.searchType;
            listParam.searchKeyWord = this.state.searchKeyWord;
        }
        _product.getProductList(listParam).then(res => {
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
            this.loadProductList();
        });
    }
    onSetProductStatus(e, productId, currentStatus){
        let newStatus = currentStatus === 1 ? 2 : 1;
        let confirmTips = currentStatus === 1 ? '确定要下架该商品？' : '确定要上架该商品？';

        if(window.confirm(confirmTips)){
            _product.setProductStatus({
                productId,
                status: newStatus
            }).then( res =>{
                _mm.successTips( res );
                this.loadProductList();
            }, error => {
                _mm.errorTips( error );
            })
        }
    }
    onSearch( searchType, searchKeyWord ){
        let listType = searchKeyWord === '' ? 'list' : 'search';
        this.setState({
            listType,
            searchType,
            searchKeyWord,
            pageNum: 1,
        }, () => {
            this.loadProductList();
        })
    }
    render(){
        let tableHeads = [
            {'name': '商品ID', 'width': '10%'},
            {'name': '商品信息', 'width': '50%'},
            {'name': '价格', 'width': '10%'},
            {'name': '状态', 'width': '15%'},
            {'name': '操作', 'width': '15%'},
        ];
        return(
            <div id="page-wrapper">
                <div className="row">
                    <PageTitle pageTitle="商品管理">
                        <div className="page-header-right">
                            <Link className="btn btn-primary" to="/product/save"><i className="fa fa-plus fa-fw"></i>添加商品</Link>
                        </div>
                    </PageTitle>
                    <ListSearch 
                        onSearch={
                            (searchType, searchKeyWord) => {
                                this.onSearch(searchType, searchKeyWord); 
                            }
                        }
                    />
                    <TableList tableHeads={ tableHeads }>
                        {
                            this.state.list.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{product.id}</td>   
                                        <td>
                                            <p>{product.name}</p>
                                            <p>{product.subtitle}</p>
                                        </td>
                                        <td>💰{product.price}</td>
                                        <td>
                                            <p>{product.status === 1 ? '在售' : '已下架'}</p>
                                            <button 
                                                onClick={(e) => this.onSetProductStatus(e, product.id, product.status)}
                                                className="btn btn-warning btn-xs"
                                            >
                                                {product.status === 1 ? '下架' : '上架'}
                                            </button>
                                        </td>
                                        <td>
                                            <Link className="opear" to={ `/product/detail/${product.id}` }>详情</Link>
                                            <Link className="opear" to={ `/product/save/${product.id}` }>编辑</Link>
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
        )
    }
}

export default ProductList;