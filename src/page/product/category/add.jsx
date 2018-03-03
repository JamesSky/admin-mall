import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import MMUtile from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm   = new MMUtile();
const _product = new Product();

class CategoryAdd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            parendId: '',
            categoryName: ''
        };
    }
    componentDidMount(){
        this.loadCategoryList();
    }
    loadCategoryList(){
        _product.getCategoryList().then(res => {
            this.setState({categoryList: res});
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    onValueChange(e){
        let name   = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    }
    onSubmit(e){
        if(!this.state.categoryName){
            _mm.errorTips('请输入品类名称');
            return;
        }
        // 请求接口
        _product.saveCategory({
            parentId: this.state.parentId,
            categoryName: this.state.categoryName
        }).then(res => {
            _mm.successTips('商品添加成功');
            this.props.history.push('/product-category/index');
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    render(){
        return(
            <div id="page-wrapper">
                <PageTitle pageTitle="添加品类"/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <div className="form-horizontal" >
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属品类</label>
                                <div className="col-md-10">
                                    <select className="form-control cate-select" name="parentId" onChange={(e) => this.onValueChange(e)}>
                                        <option value="0">/所有</option>
                                        {
                                            this.state.categoryList.map(function(category, index) {
                                                return (
                                                    <option value={category.id} key={index}>/所有/{category.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="category-name" className="col-md-2 control-label">添加品类名称</label>
                                <div className="col-md-3">
                                    <input type="text" 
                                        className="form-control" 
                                        id="category-name" 
                                        name="categoryName"
                                        placeholder="请输入品类名称"
                                        onChange={(e) => this.onValueChange(e)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button 
                                        onClick={(e) => this.onSubmit(e)} 
                                        type="submit" 
                                        className="btn btn-xl btn-primary"
                                    >提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CategoryAdd;