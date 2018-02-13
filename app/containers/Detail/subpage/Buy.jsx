import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BuyAndStore from '../../../components/BuyAndStore'
import * as storeActionsFromFile from '../../../actions/store'

class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
        this.state = {
            isStore: false
        }
    }
    render() {
        return (
            <div>
                <BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)}/>
            </div>
        )
    }
    componentDidMount() {
        this.checkStoreState()
    }
    //验证商户是否收藏
    checkStoreState() {
        const id = this.props.id
        const store = this.props.store
        store.some(item => {
            if(item.id === id) {
                this.setState({
                    isStore: true
                })
                //挑出循环
                return true
            }
        })
    }

    buyHandle() {
        const loginFlag = this.loginCheck()
        if(!loginFlag) {
            return
        }
        // 购买流程
        // 。。。
        // 。。。
        this.props.history.push('/User/')
    }

    //收藏数据
    storeHandle() {
        const loginFlag = this.loginCheck()
        if(!loginFlag) {
            return
        }

        const id = this.props.id
        const storeActions = this.props.storeActions
        if(this.state.isStore) {
            // 当前商户已经被收藏，点击取消收藏
            storeActions.rm({id: id})
        } else {
            // 当前商户尚未被收藏，点击收藏
            storeActions.add({id: id})
        }

        this.setState({
            isStore: !this.state.isStore
        })


    }
    // 验证登录
    loginCheck() {
        const id = this.props.id
        const userinfo = this.props.userinfo
        if(!userinfo.username) {
            this.props.history.push('/Login/' + encodeURIComponent('/detail/' + id))
            return false
        }
        return true
    }

}

function mapStateToProps(state) {
    console.log(state)
    return {
        userinfo: state.userinfo,
        store: state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeActions: bindActionCreators(storeActionsFromFile, dispatch)
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps 
)(Buy)