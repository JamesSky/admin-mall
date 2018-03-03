import React from 'react';

// 通用table list
class TableList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isFirstLoading: true
        }
    }
    componentWillReceiveProps(){
        this.setState({
            isFirstLoading: false
        });
    }
    render() {
        let listNone = (
            <tr>
                <td colSpan={this.props.tableHeads.length} className="text-center">
                    {this.state.isFirstLoading ? '数据加载中...' : '没有找到相应结果~'}
                </td>
            </tr>
        );
        let listMap = this.props.children;
        let listBody = listMap.length ? listMap : listNone;
        return (
            <div className="row">
                <div className="table-wrap col-lg-12">
                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                {
                                    this.props.tableHeads.map((item, index) => {
                                        if( typeof item === 'object' ){
                                            return(
                                                <th key={index} style={{width: item.width}}>{item.name}</th>
                                            )
                                        } else if( typeof item === 'string' ){
                                            return(
                                                <th key={index}>{item}</th>
                                            )
                                        }
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            { listBody }       
                        </tbody>
                    </table>
                </div>
            </div>    
        )           
    }
};

export default TableList;