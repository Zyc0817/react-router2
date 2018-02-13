import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SearchHeader from '../../components/SearchHeader'
import SearchList from './Subpage/List'

class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
        this.state = {
            initDone: false
        }
    }
    render() {
        const params = this.props.match.params
        return (
            <div>
                <SearchHeader keyword={params.keyword} history={this.props.history}/>
                <SearchList keyword={params.keyword} type={params.type}/>
            </div>
        )
    }
    
}

export default Search