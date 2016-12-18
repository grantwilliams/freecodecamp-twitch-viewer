import React, {Component, PropTypes} from 'react';
import twitchHelpers from '../utils/twitchHelpers';
import User from '../components/User';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class UserContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            displayName: this.props.channelName,
            status: 'offline',
            logo: '../images/default_profile_big.png',
            game: 'Offline',
            uid: '',
        }

    }

    componentDidMount() {
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
                    url: user.data.url,
                    uid: user.data._id
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

    render() {
        return (
            this.state.visible
            ? <ReactCSSTransitionGroup
                transitionName="channel"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
                component="div"
                key={this.props.dataKey}
                >
                    <User
                    displayName={this.state.displayName}
                    visible={this.state.visible}
                    status={this.state.status}
                    game={this.state.game}
                    logo={this.state.logo}
                    preview={this.state.preview}
                    url={this.state.url}
                    onClick={this.props.handleDeleteStreamer}
                    dataKey={this.props.dataKey}
                    key={this.props.dataKey}
                    showChannel={this.props.showChannel}
                    />
            </ReactCSSTransitionGroup>
            : null
        );
    }
}

UserContainer.propTypes = {
    channelName: PropTypes.string.isRequired,
    dataKey: PropTypes.number.isRequired,
    showing: PropTypes.string.isRequired,
    handleDeleteStreamer: PropTypes.func.isRequired,
    showChannel: PropTypes.bool.isRequired
};

export default UserContainer;