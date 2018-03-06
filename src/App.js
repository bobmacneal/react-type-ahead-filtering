import React, { Component } from 'react';
import {getList} from './util';

class App extends Component {
    _list: Array<{}>;

    _initialState = {
        searchTerm: '',
        hideResults: true,
        filteredList: []
    };

    constructor(props) {
        super(props);
        this._list = getList();
        this.state = this._initialState;
    }

    onChange(event) {
        const searchTerm = event.target.value;
        this.setState({
            searchTerm: searchTerm,
            hideResults: searchTerm.length < 1,
            filteredList: this._list.filter(
                x => x.label.toLowerCase().includes(searchTerm.toLowerCase())
            )
        });
    }

    onSelect = (value, event) => {
        alert(`${event.target.textContent} was selected. \n\nvalue=${value}`);
        this.setState(this._initialState);
        this.searchTermInputElement.focus();
    };

    componentDidMount() {
        this.searchTermInputElement.focus();
    }

    render() {
        const listItems = this.state.filteredList.map((item, index) =>
            <li
                className="searchResults"
                data-qa={`user_search_results_item_${++index}`}
                onClick={this.onSelect.bind(this, item.value)}
                key={index}
            >{item.label}</li>
        );
        return (
            <div>
                <div className="search-input-container">
                    <input
                        ref={(input) => this.searchTermInputElement = input}
                        placeholder="Enter alpha characters..."
                        type="text"
                        data-qa="user_search_txt"
                        className="search-input"
                        value={this.state.searchTerm}
                        onChange={this.onChange.bind(this)}
                    />
                </div>
                {this.state.filteredList.length === 0 || this.state.hideResults ?
                    null :
                    <ul className="selectStyle" data-qa="user_search_results">
                        {listItems}
                    </ul>
                }
            </div>
        );
    }
}

export default App;
