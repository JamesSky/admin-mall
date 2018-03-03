import React        from 'react';
import Simditor     from 'simditor';
import MMUtile from 'util/mm.jsx';

const _mm = new MMUtile();

import 'simditor/styles/simditor.scss';

class RichEditor extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.loadEditor();
    }
    componentWillReceiveProps(nextProps){
        if(this.props.defaultDetail !== nextProps.defaultDetail){
            this.editor.setValue( nextProps.defaultDetail );
        }
    }
    loadEditor(){
        this.textarea  = this.refs['textarea'];
        this.editor = new Simditor({
            textarea: $(this.textarea),
            defaultValue: this.props.placeholder || '请输入内容',
            upload:{
                url: '/manage/product/richtext_img_upload.do',
                defaultImage: '',
                fileKey: 'upload_file'
            }
        });
        // bind event
        this.bindEditorEvent();
    }
    bindEditorEvent(){
        this.editor.on('valuechanged', e => {
            this.props.onValueChange(this.editor.getValue());
        })
    }
    setValue(value){
        this.editor.setValue(value);
    }
    render() {
        return (
            <div className="rich-editor">
                <textarea ref="textarea"></textarea>
            </div>
        )           
    }
};

export default RichEditor;