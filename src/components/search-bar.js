import React, {Component} from 'react'

class SearchBar extends Component {
    constructor (props) {
        super(props)

        this.state = {
            searchText: '',
            placeHolder: 'Tapez votre film...',
            intervalQuery: 1000,
            lockQuery: false
        }
    }
    render () {
        return (
            <div className="row">
                <div className="col-md-8 input-group">
                    <input
                        type="text"
                        className="form-control input-lg"
                        onChange={this.handleChange.bind(this)}
                        placeholder={this.state.placeHolder}
                    />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" onClick={this.handleClick.bind(this)}>Go</button>
                    </span>
                </div>
            </div>
        )
    }

    handleChange (e) {
        this.setState({searchText: e.target.value})
        if (!this.state.lockQuery) {
            this.setState({lockQuery: true})
            setTimeout(() => this.search().bind(this), this.state.intervalQuery)
        }
    }

    handleClick () {
        this.search()
    }

    search () {
        this.props.callback(this.state.searchText)
        this.setState({lockQuery: false})
    }
}

export default SearchBar