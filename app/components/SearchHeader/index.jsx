import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'
import SearchInput from '../SearchInput'


class SearchHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
        
    }
    render() {
        return (
            <div id="search-header" className="clear-fix">
                <span className="back-icon float-left" onClick={this.clickHandle.bind(this)}>
                    <i className="icon-chevron-left"></i>
                </span>
                <div className="input-container">
                    <i className="icon-search"></i>
                    &nbsp;
                    <SearchInput value={this.props.keyword || ''} enterHandle={this.enterHandle.bind(this)}/>
                </div>
            </div>
        )
    }
    clickHandle() {
        //window.history.back()
        this.props.history.push('/')
    }
    enterHandle(value) {
        this.props.history.push('/search/all/' + encodeURIComponent(value)) 
    }

}

export default SearchHeader