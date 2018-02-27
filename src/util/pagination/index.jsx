import React from 'react';
import RcPagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

// 通用分页组件
class Pagination extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <RcPagination {...this.props}/>
        )           
    }
};

export default Pagination;