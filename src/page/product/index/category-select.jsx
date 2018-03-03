import React from 'react';
import MMUtile from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm   = new MMUtile();
const _product = new Product();

class CategorySelect extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstCategoryList: [],
            firstCategoryId: 0,
            secondCategoryList: [],
            secondCategoryId: 0
        }
    }
    componentDidMount(){
        this.loadFirstCategory();
    }
    componentWillReceiveProps(nextProps){
        let categoryChange = this.props.categoryId !== nextProps.categoryId;
        let parentCategoryChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
        if( !categoryChange && !parentCategoryChange ){
            return;
        }
        if(nextProps.parentCategoryId === 0){
            this.setState({
                firstCategoryId: nextProps.categoryId,
                secondCategoryId: 0
            })
        } else {
            this.setState({
                firstCategoryId: nextProps.parentCategoryId,
                secondCategoryId: nextProps.categoryId
            }, () => {
                parentCategoryChange && this.loadSecondCategory();
            })
        }
    }
    loadFirstCategory(){
        _product.getCategoryList().then( res => {
            this.setState({ firstCategoryList: res });
        }, errMsg => {
            _mm.errorTips( errMsg );
        })
    }
    loadSecondCategory(){
        _product.getCategoryList( this.state.firstCategoryId ).then( res => {
            this.setState({ secondCategoryList: res });
        }, errMsg => {
            _mm.errorTips( errMsg );
        })
    }
    onFirstCategoryChange(e){
        if(this.props.readOnly){
            return false;
        }
        let newValue = e.target.value;
        this.setState({
            firstCategoryId: newValue,
            secondCategoryList: [],
            secondCategoryId: 0
        }, () => {
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        });
    }
    onSecondCategoryChange(e){
        if(this.props.readOnly){
            return false;
        }
        let newValue = e.target.value || 0;
        this.setState({
            secondCategoryId: newValue
        }, () => {
            this.onPropsCategoryChange();
        });
    }
    onPropsCategoryChange(){
        let categoryChangeable = typeof this.props.onCategoryChange === 'function';
        if(this.state.secondCategoryId){
            categoryChangeable && this.props.onCategoryChange( this.state.secondCategoryId, this.state.firstCategoryId, );
        } else {
            categoryChangeable && this.props.onCategoryChange( this.state.firstCategoryId, 0 );
        }
    }
	render(){
		return(   
            <div className="col-md-10">
                <select type="password" 
                    className="form-control cate-select col-md-5" 
                    value={this.state.firstCategoryId} 
                    onChange={(e) => this.onFirstCategoryChange(e)}
                    readOnly
                >
                    <option value="">请选择一级品类</option>
                    {
                        this.state.firstCategoryList.map((category, index) => {
                            return (
                                <option value={category.id} key={index}>{category.name}</option>
                            );
                        })
                    }
                </select>
                {this.state.secondCategoryList.length ?  
                    <select type="password" 
                        className="form-control cate-select col-md-5" 
                        value={this.state.secondCategoryId} 
                        onChange={(e) => this.onSecondCategoryChange(e)}
                        readOnly
                    >
                        <option value="">请选择二级品类</option>
                        {
                            this.state.secondCategoryList.map((category, index) => {
                                return (
                                    <option value={category.id} key={index}>{category.name}</option>
                                );
                            })
                        }
                    </select> : null
                }
            </div>
		)
	}
}

export default CategorySelect;