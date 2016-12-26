import React, {Component, PropTypes} from 'react';
import twitchHelpers from '../utils/twitchHelpers';
import User from '../components/User';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class UserContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            channelDetails: {
                visible: false
            }
        }

    }

    componentDidMount() {
        twitchHelpers.updateChannelDetails(this.props.channelName)
        .then((details) => {
            if(this.props.showing) {
                details.visible = true
            }
            this.setState({
                channelDetails: details
            });
        })
    }

    componentWillReceiveProps(nextProps) {
        switch(nextProps.showing) {
            case 'online':
            this.setState({
                channelDetails: {
                    ...this.state.channelDetails,
                    visible: this.state.channelDetails.status == 'online'
                }
            });
            break;

            case 'offline':
            this.setState({
                channelDetails: {
                    ...this.state.channelDetails,
                    visible: this.state.channelDetails.status !== 'online'
                }
            });
            break;

            default:
            this.setState({
                channelDetails: {
                    ...this.state.channelDetails,
                    visible: true
                }
            });
        }
    }

    render() {
        return (
            this.state.channelDetails.visible
            ? <ReactCSSTransitionGroup
                transitionName="channel"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
                component="div"
                id={this.state.channelDetails.displayName}
                className={"streamer container-fluid row " + this.state.channelDetails.status}
                >
                    <User
                    displayName={this.state.channelDetails.displayName}
                    visible={this.state.channelDetails.visible}
                    status={this.state.channelDetails.status}
                    game={this.state.channelDetails.game}
                    logo={this.state.channelDetails.logo}
                    preview={this.state.channelDetails.preview}
                    url={this.state.channelDetails.url}
                    handleDeleteStreamer={this.props.handleDeleteStreamer}
                    dataKey={this.props.dataKey}
                    key={this.props.channelName}
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
    handleDeleteStreamer: PropTypes.func.isRequired
};

export default UserContainer;