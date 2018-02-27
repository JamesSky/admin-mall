/**
 * 数据处理层
 */
import Mutil from 'util/mm.jsx';
const _mm = new Mutil();

class Statistic{
    getHomeCount(){
        return  _mm.request({
            url: '/manage/statistic/base_count.do'
        })
    }
}

export default Statistic;