import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'
import CommentList from '../../../components/CommentList'
import LoadMore from '../../../components/LoadMore'
import { getDetailData } from '../../../fetch/detail/detail'


class Comment extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
        this.state = {
            data: [],
            hasMore: false,
            isLoadingMore: false,  //记录当前状态下是“加载中。。。” 还是 ”点击加载更多“
            page: 1  //下一页的页码
        }
    }
    render() {
        return (
            <div>
                <CommentList data={this.state.data}/>
                <LoadMore loadMoreFn={this.loadMoreData.bind(this)}/>
            </div>
        )
    }
    componentDidMount() {
        this.loadFirstPageData()
    }
    // 获取首页数据
    loadFirstPageData() {
        const id = this.props.id
        const result = getDetailData(id, 0)
        this.resultHandle(result)
    }
    // 加载更多的数据
    loadMoreData() {
        this.setState({
            isLoadingMore: true
        })
        const id = this.props.id
        const page = this.state.page
        const result = getDetailData(id, page)
        this.resultHandle(result)
        this.setState({
            page: page + 1,
            isLoadingMore: false
        })
    }
    // 数据处理函数
    resultHandle(result) {
        result.then(res => {
            return res.json()
        }).then(json => {
            const hasMore = json.hasMore
            const data = json.data 
            console.log(data)
            this.setState({
                hasMore: hasMore,
                data: this.state.data.concat(data)
            })
        })
    }

}

export default Comment