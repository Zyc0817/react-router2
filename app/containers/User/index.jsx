import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserInfo from '../../components/UserInfo'
import OrderList from './subpage/OrderList'
import { withRouter } from 'react-router-dom'

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
        this.state = {
            initDone: false
        }
    }
    render() {
        const userinfo = this.props.userinfo
        return (
            <div>
                <Header title="个人中心" backRoute="/" history={this.props.history}/>
                <UserInfo username={userinfo.username} city={userinfo.cityName}/>
                <OrderList username={userinfo.username}/>
            </div>
        )
    }
    componentDidMount() {
        if(!this.props.userinfo.username) {
            this.props.history.push('/Login')
        }
    }
}
function mapStateToProps(state) {

    return {
        userinfo: state.userinfo,
        store: state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
        
    }
}


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps 
)(User))