import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'
import Item from './item'

class OrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
        
    }
    render() {
        const data = this.props.data
        const submitComment = this.props.submitComment
        return (
            <div>
                {
                    data.map((item, index) => {
                        return <Item key={index} data={item} submitComment={submitComment.bind(this)}/> 
                    })
                }
            </div>
        )
    }
}

export default OrderList