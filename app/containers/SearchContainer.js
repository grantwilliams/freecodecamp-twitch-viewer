import React, {Component, PropTypes} from 'react';
import Search from '../components/Search';
import twitchHelpers from '../utils/twitchHelpers';
import AppContainer from './AppContainer';

class SearchContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: [],
            previousStreamerAdded: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.newStreamerAdded !== this.state.previousStreamerAdded) {
            this.clearSearch()
        }
        this.setState({
            previousStreamerAdded: nextProps.newStreamerAdded
        });
    }

    handleOnChange(e) {
        this.setState({
            value: e.target.value
        });
        twitchHelpers.getChannelSuggestions(this.state.value).then((results) => {
            var channelSuggestions = results.data.channels.map((channel) => {
                return channel.display_name
            })
            this.setState({
                suggestions: channelSuggestions
            });
        })
        if(e.target.value.length == 0) {
            this.setState({
                value: '',
                suggestions: []
            });
        }
    }

    clearSearch() {
        this.setState({
            value: '',
            suggestions: []
        });
    }

    render() {
        return (
            <Search
            handleOnChange={this.handleOnChange.bind(this)}
            handleAddStreamer={this.props.handleAddStreamer}
            suggestions={this.state.suggestions}
            value={this.state.value}
             />
        );
    }
}

SearchContainer.propTypes = {
    handleAddStreamer: PropTypes.func.isRequired
};

export default SearchContainer;