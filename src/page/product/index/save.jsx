import React from 'react';

import PageTitle from 'component/page-title/index.jsx';
import CategorySelect from './category-select.jsx';
import FileUploader from 'util/file-uploader/index.jsx';
import MMUtile from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import RichEditor from 'util/rich-editor/index.jsx';

const _mm   = new MMUtile();
const _product = new Product();

import './save.scss';

class ProductSave extends React.Component{
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
    // 品类选择
    onCategoryChange(categoryId, parentCategoryId){
        this.setState({
            categoryId,
            parentCategoryId,
        });
    }
    // 上传成功
    onUploadSuccess(res){
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState({
            subImages
        })
    }
    // 上传失败
    onUploadError(errMsg){
        _mm.errorTips( errMsg );
    }
    // 删除图片
    onDeleteImage(e){
        let index = parseInt(e.target.getAttribute('index'));
        let subImages = this.state.subImages;
        subImages.splice( index, 1 );
        this.setState({ subImages });
    }
    // 富文本
    onRichValueChange(value){
        this.setState({ detail: value });
    }
    // 普通文本的提交
    onValueChange(e){
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        })
    }
    // 图片格式修正
    getSubImagesString(){
        return this.state.subImages.map(item => item.uri).join(',');
    }
    // 提交
    onSubmit(){
        let product = {
            categoryId: parseInt(this.state.categoryId),
            name: this.state.name,
            subtitle: this.state.subtitle,
            subImages: this.getSubImagesString(),
            detail: this.state.detail,
            price: parseFloat(this.state.price),
            stock: parseInt(this.state.stock),
            status: this.state.status || 1 // 状态为正常
        },
        productCheckResult = _product.checkProduct(product);
        if(productCheckResult.status){
            _product.saveProduct( product ).then( res => {
                _mm.successTips(res);
                this.props.history.push('/product/index');
            }, errMsg => {
                _mm.errorTips(errMsg);
            })
        } else {
            _mm.errorTips(productCheckResult.msg);
        }
    }
	render(){
		return(
            <div id="page-wrapper">
                <PageTitle pageTitle={'商品管理 -- ' + (this.state.id ? '修改商品' : '添加商品')}/>
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
                                        placeholder="请输入商品名称"
                                        value={this.state.name}
                                        onChange={(e) => this.onValueChange(e)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">商品描述</label>
                                <div className="col-md-5">
                                    <input type="text"
                                        className="form-control"
                                        name="subtitle"
                                        id="subtitle"
                                        placeholder="请输入商品描述"
                                        value={this.state.subtitle}
                                        onChange={(e) => this.onValueChange(e)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-2 control-label">所属分类</label>
                                <CategorySelect
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
                                            placeholder="价格"
                                            name="price"
                                            value={this.state.price}
                                            onChange={(e) => this.onValueChange(e)}/>
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
                                            placeholder="库存" 
                                            value={this.state.stock}
                                            onChange={(e) => this.onValueChange(e)}/>
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
                                                    <i className="fa fa-close fa-fw" 
                                                        index={index} 
                                                        onClick={(e) => this.onDeleteImage(e)}
                                                    ></i>
                                                </div>
                                            );
                                        }) : <div className="notice">请上传图片</div>
                                    }
                                </div>
                                <div className="col-md-offset-2 col-md-10">
                                    <FileUploader 
                                        onSuccess={(res) => this.onUploadSuccess(res)} 
                                        onError={(errMsg) => this.onUploadError(errMsg)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail3" className="col-md-2 control-label">商品详情</label>
                                <div className="col-md-10">
                                    <RichEditor 
                                        ref="rich-editor" 
                                        detail={this.state.detail}
                                        defaultDetail={this.state.defaultDetail}
                                        onValueChange={(value) => this.onRichValueChange(value)} 
                                        placeholder="商品详细信息"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="btn" className="btn btn-xl btn-primary" onClick={(e) => this.onSubmit(e)}>提交</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		)
	}
}

export default ProductSave;