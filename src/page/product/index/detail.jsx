import React from 'react';

import PageTitle from 'component/page-title/index.jsx';
import CategorySelect from './category-select.jsx';
import MMUtile from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm   = new MMUtile();
const _product = new Product();

import './save.scss';

class ProductDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.pid,
            name: '',
            subtitle: '',
            detail: '',
            categoryId: 0,
            parentCategoryId: 0,
            subImages: [],
            price: '',
            stock: '',
            detail: '',
            status: 1 // 1为商品在售状态
        }
    }
    componentDidMount(){
        this.loadProduct();
    }
    loadProduct(){
        if(this.state.id){
            _product.getProduct(this.state.id).then( (res) => {
                let images = res.subImages.split(',');
                res.subImages = images.map((imgUri) => {
                    return {
                        uri: imgUri,
                        url: res.imageHost+imgUri
                    }
                });
                res.defaultDetail = res.detail;
                res.detail = res.defaultDetail;
                let that = this;
                this.setState(res);
            }, errMsg => {
                _mm.errorTips(errMsg);
            })
        }
    }
	render(){
		return(
            <div id="page-wrapper">
                <PageTitle pageTitle={'商品管理 -- 商品详情'}/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-2 control-label">商品名称</label>
                                <div className="col-md-5">
                                    <input type="text" 
                                        className="form-control"
                                        name="name"
                                        id="name"
                                        readOnly
                                        value={this.state.name}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">商品描述</label>
                                <div className="col-md-5">
                                    <input type="text"
                                        className="form-control"
                                        name="subtitle"
                                        id="subtitle"
                                        readOnly
                                        value={this.state.subtitle}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-2 control-label">所属分类</label>
                                <CategorySelect
                                    readOnly
                                    categoryId={this.state.categoryId}
                                    parentCategoryId={this.state.parentCategoryId}
                                    onCategoryChange={
                                        (categoryId, parentCategoryId) => this.onCategoryChange(categoryId, parentCategoryId)
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price" className="col-md-2 control-label">商品价格</label>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <input type="number" 
                                            className="form-control" 
                                            id="price" 
                                            readOnly
                                            name="price"
                                            value={this.state.price}
                                        />
                                        <div className="input-group-addon">元</div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock" className="col-md-2 control-label">商品库存</label>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <input type="number" 
                                            className="form-control" 
                                            id="stock" 
                                            name="stock"
                                            readOnly
                                            value={this.state.stock}
                                        />
                                        <div className="input-group-addon">件</div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail3" className="col-md-2 control-label">商品图片</label>
                                <div className="img-con col-md-10">
                                    {
                                        this.state.subImages.length ? this.state.subImages.map((image, index) => {
                                            return (
                                                <div className="sub-img" key={index}>
                                                    <img className="img" src={image.url}/>
                                                </div>
                                            );
                                        }) : <div className="notice">暂无图片</div>
                                    }
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail3" className="col-md-2 control-label">商品详情</label>
                                <div className="col-md-10"
                                    dangerouslySetInnerHTML={{__html: this.state.detail}}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		)
	}
}

export default ProductDetail;