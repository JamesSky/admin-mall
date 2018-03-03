/**
 * 公共代码抽离
 */
class Mutil{
    request(param){
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.method || 'GET',
                url: param.url || '',
                dataType: param.type || "json",
                data: param.data || null,
                success: res => {
                    if(0 === res.status){
                        typeof resolve === 'function' && resolve(res.data || res.msg);
                    } else if(10 === res.status) {
                        this.doLogin();
                    } else {
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error: err => {
                    typeof reject === 'function' && reject(err.statusText);
                }
            })
        })
    }
    // 跳转到登录
    doLogin(){
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    // 获取url参数
    getParam( name ){
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let queryString = window.location.search.split('?')[1] || '';
        let result = queryString.match( reg );
        return result ? encodeURIComponent(result[2]) : null;
    }
    // alert成功
    successTips(sussessMsg){
        alert(sussessMsg || '操作成功~');
    }
    // alert错误
    errorTips(errorMsg){
        alert(errorMsg || '哪里不对了~');
    }
    // 向本地存储里放数据
    setStorage(name, data){
        let [dataType, winLocation] = [typeof data, window.localStorage];
        // array/json
        if(dataType === 'object'){
            let jsonString = JSON.stringify(data);
            winLocation.setItem(name, jsonString);
        // number/string/boolean
        } else if(['number', 'string', 'boolean'].indexOf(dataType) !== -1) {
            winLocation.setItem(name, string);
        // undefined/function    
        } else {
            alert('该数据类型不能用于本地存储');
        }
    }
    // 从本地存储获取数据
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }else{
            return '';
        }
    }
    // 删除本地存储
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
}

export default Mutil;