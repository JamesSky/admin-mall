import React from 'react';

class PageTitle extends React.Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        document.title=`${this.props.pageTitle} - HAPPYMALL`
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-12">
                    <h1 className="page-header">{this.props.pageTitle}</h1>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default PageTitle;