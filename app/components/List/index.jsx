import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'
import Item from './Item'

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
        
    }
    render() {
        const data = this.props.data
         return (
            <div>
                {data.map((item, index) => {
                    return <Item key={index} data={item}/>
                })}             
            </div>          
        )
    }
}

export default List