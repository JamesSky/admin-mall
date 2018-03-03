/**
 * 产品数据处理层
 */
import Mutil from 'util/mm.jsx';
const _mm = new Mutil();

class Product{
    // 获取用户列表
    getProductList(listParam){
        let url = '';
        let data = {};
        if(listParam.listType === 'list'){
            url = '/manage/product/list.do';
            data.pageNum = listParam.pageNum;
        } else if (listParam.listType === 'search') {
            url = '/manage/product/search.do';
            data.pageNum = listParam.pageNum;
            data[listParam.searchType] = listParam.searchKeyWord;
        }
        return _mm.request({
            url,
            method: 'POST',
            data
        });
    }
    // 变更商品销售状态
    setProductStatus(productInfo){
        return _mm.request({
            url: '/manage/product/set_sale_status.do',
            method: 'POST',
            data: productInfo
        });
    }
    /**
     * 品类相关
     */
    getCategoryList(parentCategoryId= 0){
        return _mm.request({
            url: '/manage/category/get_category.do',
            method: 'POST',
            data: {
                categoryId: parentCategoryId
            }
        });
    }
    // 获取商品信息
    saveProduct(product){
        return _mm.request({
            url: '/manage/product/save.do',
            data: product
        });
    }
    // 获取商品信息
    getProduct(productId){
        return _mm.request({
            url: '/manage/product/detail.do',
            data: {
                productId : productId || 0
            }
        });
    }
    // 验证要提交的产品信息是否符合规范
    checkProduct(product){
        let result = {
            status  : true,
            msg     : '验证通过'
        };
        if(!product.name){
            result = {
                status  : false,
                msg     : '请输入商品名称'
            }
        }
        if(!product.subtitle){
            result = {
                status  : false,
                msg     : '请输入商品描述'
            }
        }
        if(!product.price){
            result = {
                status  : false,
                msg     : '请输入商品价格'
            }
        }
        if(!product.stock){
            result = {
                status  : false,
                msg     : '请输入商品库存'
            }
        }
        if(!product.detail){
            result = {
                status  : false,
                msg     : '请输入商品详情'
            }
        }
        return result;
    }
}

export default Product;