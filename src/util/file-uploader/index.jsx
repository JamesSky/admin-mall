import React        from 'react';
import FileUpload   from './react-fileupload.jsx';
import MMUtile from 'util/mm.jsx';

const _mm = new MMUtile();

class FileUploader extends React.Component{
    constructor(props) {
        super(props)
    }
    componentDidMount(){

    }
    render() {
        const options={
            baseUrl: '/manage/product/upload.do',
            fileFieldName: 'upload_file',
            dataType: 'json',
            accept: 'image/gif,image/jpeg,image/jpg,image/png',
            chooseAndUpload: true,
            uploadSuccess: (res) => {
                this.props.onSuccess(res.data);
            },
            uploadError: (err) => {
                this.props.onError(err.message || `上传图片出错了～`);
            }
        }
        return (
            <FileUpload options={options}>
                <button ref="chooseAndUpload">上传图片</button>
            </FileUpload>
        )           
    }
};

export default FileUploader;