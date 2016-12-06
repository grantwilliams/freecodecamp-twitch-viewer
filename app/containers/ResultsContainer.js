import React, {Component, PropTypes} from 'react';
import UserContainer from './UserContainer'
import AppContainer from './AppContainer'
import Loading from '../components/Loading'

class ResultsContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            resultsDiv: '',
            showing: 'all',
        }
    }

    // componentWillMount() {

    // }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isLoading: false
            });
        }, 1500)
    }

    // componentWillReceiveProps(nextProps) {

    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return true
    // }

    // componentWillUpdate(nextProps, nextState) {

    // }

    // componentDidUpdate(prevProps, prevState) {

    // }

    // componentWillUnmount() {

    // }

    render() {
        return (this.state.isLoading
            ? <Loading />
            : <div id="resultsContainer" className="row">
                {this.props.originalChannels.map((channel, key) => {
                    return (
                        <UserContainer
                        channelName={channel.channel}
                        dataKey={channel.dataKey}
                        key={key}
                        showing={this.props.showing}
                        isLoading={this.state.isLoading}
                        handleDeleteStreamer={this.props.handleDeleteStreamer}
                        exists={channel.exists} />
                    )
                })}
            </div>
        );
    }
}

ResultsContainer.propTypes = {
    // isLoading: PropTypes.bool.isRequired,
};

export default ResultsContainer;