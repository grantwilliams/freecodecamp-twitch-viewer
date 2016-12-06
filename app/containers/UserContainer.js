import React, {Component, PropTypes} from 'react';
import twitchHelpers from '../utils/twitchHelpers';
import User from '../components/User';

class UserContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            displayName: this.props.channelName,
            status: 'offline',
            logo: '../images/default_profile_big.png',
            game: 'Offline'
        }

    }

    // componentWillMount() {
        
    // }

    componentDidMount() {
        console.log(this.props.channelName);
        twitchHelpers.getStreamingData(this.props.channelName)
        .then((streamer) => {
            if(streamer && streamer.data.stream) {
                this.setState({
                    status: 'online',
                    preview: <img className="img-responsive twitch-preview" src={streamer.data.stream.preview.medium} />,
                    game: streamer.data.stream.game + ': ' + streamer.data.stream.channel.status,
                    visible: this.props.showing == 'all' || this.props.showing == 'online' ? true : false 
                });
            } else {
                this.setState({
                    visible: this.props.showing == 'all' || this.props.showing == 'offline' ? true : false
                });
            }
        })
        twitchHelpers.getChannelData(this.props.channelName)
        .then((user) => {
            if (user.data.status == 404) {
                this.setState({
                    game: 'Account Closed'
                });
            } else {
                this.setState({
                    displayName: user.data.display_name,
                    logo: user.data.logo,
                    url: user.data.url
                });
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        switch(nextProps.showing) {
            case 'online':
            this.setState({
                visible: this.state.status == 'online'
            });
            break;

            case 'offline':
            this.setState({
                visible: this.state.status !== 'online'
            });
            break;

            default:
            this.setState({
                visible: true
            });
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {

    // }

    // componentWillUpdate(nextProps, nextState) {

    // }

    // componentDidUpdate(prevProps, prevState) {

    // }

    // componentWillUnmount() {

    // }

    render() {
        return (this.state.visible
            ? <User
            displayName={this.state.displayName}
            visible={this.state.visible}
            status={this.state.status}
            game={this.state.game}
            logo={this.state.logo}
            preview={this.state.preview}
            url={this.state.url}
            onClick={this.props.handleDeleteStreamer}
            dataKey={this.props.dataKey}
            exists={this.props.exists} />
            : null
        );
    }
}

UserContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    channelName: PropTypes.string.isRequired,
    showing: PropTypes.string.isRequired,
};

export default UserContainer;