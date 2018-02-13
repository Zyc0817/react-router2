import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getSearchData, getListData } from '../../../fetch/home/home'
import ListComponents from '../../../components/List'
import LoadMore from '../../../components/LoadMore'
import { connect } from 'react-redux'

const initialState = {
    data: [],
    hasMore: false,
    isLoadingMore: false,  //记录当前状态下是“加载中。。。” 还是 ”点击加载更多“
    page: 1  //下一页的页码
}

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
        this.state = initialState         
    }
    render() {
        return (
            <div>
                {
                    this.state.data.length
                    ? <ListComponents data={this.state.data}/>
                    : <div>加载中。。。</div>
                }
                {
                    this.state.hasMore
                    ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
                    : <div></div>
                }
            </div>
        )
    }
    componentDidMount() {
        this.loadFirstPageData()
    }
    // 获取首页数据
    loadFirstPageData() {
        const cityName = this.props.userinfo.cityName 
        const keyword = this.props.keyword
        const type = this.props.type || ''
        // const result = getListData(cityName, 0)
        const result = getSearchData(cityName, 0, keyword, type)
        this.resultHandle(result)
    }
    // 加载更多的数据
    loadMoreData() {
        this.setState({
            isLoadingMore: true
        })
        const cityName = this.props.userinfo.cityName
        const page = this.state.page
        const keyword = this.props.keyword || ''
        const type = this.props.type || ''
        const result = getSearchData(cityName, page, keyword, type)
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
            this.setState({
                hasMore: hasMore,
                data: this.state.data.concat(data)
            })
        })
    }
    componentDidUpdate(prevProps, prevState) {
        const keyword = this.props.keyword || ''
        const type = this.props.type
        if(keyword === prevProps.keyword && type === prevProps.type) {
            return
        }
        //重置state
        this.setState(initialState)
        this.loadFirstPageData()
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps 
)(List)