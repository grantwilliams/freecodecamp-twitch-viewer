import React, {Component, PropTypes} from 'react';
import Search from '../components/Search';
import twitchHelpers from '../utils/twitchHelpers';
import AppContainer from './AppContainer';

class SearchContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: []
        }
    }

    // componentWillMount() {

    // }

    handleOnChange(e) {
        this.setState({
            value: e.target.value
        });
        twitchHelpers.getChannelSuggestions(this.state.value)
        .then((results) => {
            var channelSuggestions = results.data.channels.map(channel => {
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

    // componentDidMount() {
        
    // }

    // componentWillReceiveProps(nextProps) {

    // }

    // shouldComponentUpdate(nextProps, nextState) {

    // }

    // componentWillUpdate(nextProps, nextState) {

    // }

    // componentDidUpdate(prevProps, prevState) {

    // }

    // componentWillUnmount() {

    // }

    render() {
        return (
            <Search
            onChange={this.handleOnChange.bind(this)}
            onSubmit={this.props.handleAddStreamer}
            suggestions={this.state.suggestions}
            value={this.state.value}
             />
        );
    }
}

SearchContainer.propTypes = {

};

export default SearchContainer;