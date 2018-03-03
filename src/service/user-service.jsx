/**
 * 数据处理层
 */
import Mutil from 'util/mm.jsx';
const _mm = new Mutil();

class User{
    login( loginInfo ){
        return  _mm.request({
            method: 'POST',
            url: '/manage/user/login.do',
            data: loginInfo
        })
    }
    // 验证登录接口数据是否合法
    checkLoginInfo( loginInfo ){
        let [username, password] = [
            $.trim( loginInfo.username ),
            $.trim( loginInfo.password )
        ];
        if( typeof username !== 'string' || username.length === 0 ){
            return {
                status: false,
                msg: '用户名不能为空'
            }
        }

        if( typeof password !== 'string' || password.length === 0 ){
            return {
                status: false,
                msg: '密码不能为空'
            }
        }

        return {
            status: true,
            msg: '验证通过'
        }
    }
    // 退出登录
    loginOut(){
        return  _mm.request({
            method: 'POST',
            url: '/user/logout.do'
        })
    }
    // 获取用户列表
    getUserList(pageNum){
        return _mm.request({
            url: '/manage/user/list.do',
            method: 'POST',
            data: { pageNum }
        });
    }
}

export default User;