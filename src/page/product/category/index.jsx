import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
import MMUtile from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm   = new MMUtile();
const _product = new Product();

import './index.scss';

class CategoryList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            parentCategoryId: this.props.match.params.categoryId || 0
        };
    }
    componentDidMount(){
        this.loadCategoryList();
    }
    componentDidUpdate(prevProps){
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId   = this.props.match.params.categoryId || 0;
        if(oldPath !== newPath){
            this.setState({
                parentCategoryId: newId
            }, () => {
                this.loadCategoryList();
            })
        }   
    }
    loadCategoryList(){
        _product.getCategoryList(this.state.parentCategoryId).then(res => {
            this.setState({list: res});
        }, errMsg => {
            this.setState({
                list: []
            })
            _mm.errorTips(errMsg);
        });
    }
    onUpdateName( categoryId, categoryName ){
        let newName = window.prompt("请输入新的品类名称", categoryName); 
        if(newName){
            // 更新
            _product.updateCategoryName({
                categoryId : categoryId,
                categoryName : newName
            }).then(res => {
                _mm.successTips(res);
                this.loadCategoryList(this.state.parentCategoryId);
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }
    }
    render(){
        let listMap = this.state.list.map((category, index) => {
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <a className="opera" onClick={ () => this.onUpdateName(category.id, category.name)}>修改名称</a>
                        {category.parentId == 0 ? 
                            <Link to={`/product-category/index/${category.id}`} className="opera">查看其子品类</Link>
                            : null
                        }
                    </td>
                </tr>
            );
        }); 
        return(
            <div id="page-wrapper">
                <div className="row">
                <PageTitle pageTitle="品类列表">
                    <div className="page-header-right">
                        <Link className="btn btn-primary" to="/product-category/add">
                            <i className="fa fa-plus fa-fw"></i>
                            <span>添加品类</span>
                        </Link>
                    </div>
                </PageTitle>
                    <div className="row">
                        <div className="col-md-12">
                            <p>父品类ID：{this.state.parentCategoryId}</p>
                        </div>
                    </div>
                    <TableList tableHeads={['品类ID', '品类名称', '操作']} >
                        { listMap } 
                    </TableList>
                </div>
            </div>
        )
    }
}

export default CategoryList;