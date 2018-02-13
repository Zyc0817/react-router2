import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo'
import Header from '../../components/Header'
import LoginComponents from '../../components/Login'
import { withRouter } from 'react-router-dom'

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
        this.state = {
            checking: false
        }
    }
    render() {
        return (
            <div>
                <Header title='登录' history={this.props.history}/>
                {
                    this.state.checking
                    ? <div></div>
                    : <LoginComponents loginHandle={this.loginHandle.bind(this)}/>
                }
            </div>
        )
    }
    componentDidMount() {
        this.doCheck()
    }
    //登录成功之后的处理
    loginHandle(username) {
        //保存用户名
        const actions = this.props.userInfoActions
        let userinfo = this.props.userinfo
        userinfo.username = username
        actions.update(userinfo)

        // 跳转链接
        const params = this.props.match.params
        const router = params.router
        if(router) {
            this.props.history.push(router)
        } else {
            this.goUserPage()
        }

    }
    doCheck() {
        const userinfo = this.props.userinfo
        if(userinfo.username) {
            this.goUserPage()
        } else {
            this.setState({
                checking: false
            })
        }

    }
    goUserPage() {
        this.props.history.push('/User')
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps 
)(Login))