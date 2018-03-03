import React from 'react';

class ListSearch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            orderNumber: ''
        };
    }
    onValueChange(e){
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name] : value
        })
    }
    onSearch(){
        this.props.onSearch(
            this.state.orderNumber
        );
    }
    onSearchKeyWordKeyUp(e){
        if(e.keyCode === 13){
            this.onSearch();
        }
    }
    render(){
        return(
            <div className="row">
                <div className="search-wrap col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control">
                                <option>按订单号查询</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="请输入订单号"
                                onKeyUp={(e)=>this.onSearchKeyWordKeyUp(e)} 
                                onChange={(e)=>this.onValueChange(e)}
                                name="orderNumber"
                            />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={(e)=>this.onSearch(e)}>查询</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListSearch;