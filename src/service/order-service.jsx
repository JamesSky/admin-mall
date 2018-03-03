import MMUtil from 'util/mm.jsx';

const _mm = new MMUtil();

export default class Order{
    // 获取订单列表
    getOrderList(listParam){
        if(listParam.listType == 'list'){
            return _mm.request({
                url: '/manage/order/list.do',
                data: {
                    pageNum : listParam.pageNum || 1
                }
            });
        }
        else if(listParam.listType == 'search'){
            return _mm.request({
                url:'/manage/order/search.do',
                data: listParam
            });
        } 
    }
    // 获取订单详情
    getOrderDetail(orderNo){
        return _mm.request({
            url: '/manage/order/detail.do',
            data: {
                orderNo : orderNo || 0
            }
        });
    }
    // 发货
    sendGoods(orderNo){
        return _mm.request({
            url: '/manage/order/send_goods.do',
            data: {
                orderNo : orderNo || 0
            }
        });
    }
}