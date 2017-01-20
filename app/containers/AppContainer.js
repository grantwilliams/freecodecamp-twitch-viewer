import React, {Component} from 'react';
import SearchContainer from './SearchContainer';
import Menu from '../components/Menu';
import Loading from '../components/Loading';
import UserContainer from './UserContainer';
import twitchHelpers from '../utils/twitchHelpers';
import update from 'immutability-helper';
import '../styles/main.scss';

class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            channels: ["ESL_SC2", "OgamingSC2", "freecodecamp", "comster404", "brunofin", "syndicate", "ESL_CSGO", "LIRIK"],
            showing: 'all',
            isLoading: true,
            newStreamerAdded: ''
        }
    }

    handleAddStreamer(e) {
        typeof e == 'object' ? e.preventDefault() : null;
        var streamerToAdd = typeof e == 'object' ? e.target.search.value : e
        twitchHelpers.getChannelData(streamerToAdd).then((user) => {
            if(user.data.status == 404) {
                alert("Streamer does not exist, please try another")
            } else {
                if(this.state.channels.indexOf(streamerToAdd) == -1) {
                    this.setState({
                        channels: update(this.state.channels, {$unshift: [streamerToAdd]}),
                        newStreamerAdded: streamerToAdd
                    });
                }
            }
        })
    }

    handleDeleteStreamer(dataKey) {
        this.setState({
            channels: update(this.state.channels, {$splice: [[dataKey, 1]]})
        });
    }

    handleMenuClick(e) {
        this.setState({
            showing: e.target.id
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isLoading: false
            });
        }, 1500)
    }

    render() {
        return (
            <div className="container text-center" id="main-wrapper">
                <div id="top-section">
                    <div id="title-text" className="text-center">
                        TwitchTV Viewer
                        <div id="sub-title" className="text-center">
                            FreeCodeCamp Zipline
                        </div>
                    </div>
                    <div id="source-code">
                        <a href="https://github.com/grantwilliams/freecodecamp-twitch-viewer" target="_blank">
                            <button className="btn btn-success">Source code on GitHub <i className="fa fa-github"></i></button>
                        </a>
                    </div>
                    <SearchContainer
                    newStreamerAdded={this.state.newStreamerAdded}
                    handleAddStreamer={this.handleAddStreamer.bind(this)} />
                    <Menu
                    handleMenuClick={this.handleMenuClick.bind(this)}
                    showing={this.state.showing} />
                </div>
                {this.state.isLoading
                    ? <Loading />
                    : this.state.channels.map((channel, dataKey) => {
                        return (
                            <UserContainer
                            channelName={channel}
                            dataKey={dataKey}
                            key={channel}
                            showing={this.state.showing}
                            handleDeleteStreamer={this.handleDeleteStreamer.bind(this)} />
                        );
                    })
                }
            </div>
        );
    }
}

export default AppContainer;