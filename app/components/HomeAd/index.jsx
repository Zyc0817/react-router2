import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'
let img1 = require('../../static/img/138012-20161016191639092-2000037796.png')
let img2 = require('../../static/img/138012-20161016191648124-298129318.png')
let img3 = require('../../static/img/138012-20161016191653983-1962772127.png')

let arr = [img1, img2, img3, img1, img2, img3]

class HomeAd extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
        
    }
    render() {
        const data = this.props.data
        return (
            <div id="home-ad">
                <h2>超值特惠</h2>
                <div className="ad-container clear-fix">
                    {data.map((item, index) => {
                        return <div key={index} className="ad-item float-left">
                            <a href={item.link} target="_blank">
                                <img src={arr[index]} alt={item.title}/>
                            </a>
                        </div>
                    })}
                </div>
            </div>
        )
    }
}

export default HomeAd