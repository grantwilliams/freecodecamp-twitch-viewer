import React, {Component} from 'react';
import Header from '../components/Header';
import SearchContainer from './SearchContainer';
import Menu from '../components/Menu';
import Loading from '../components/Loading';
import UserContainer from './UserContainer';
import twitchHelpers from '../utils/twitchHelpers';
import update from 'immutability-helper';
import '../main.css';

class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            channels: ["ESL_SC2", "OgamingSC2", "freecodecamp", "storbeck", "noobs2ninjas", "comster404", "brunofin",
                        "syndicate", "riotgames", "ESL_CSGO", "LIRIK"],
            showing: 'all',
            isLoading: true
        }
    }

    handleAddStreamer(e) {
        typeof e == 'object' ? e.preventDefault() : null;
        var streamerToAdd = typeof e == 'object' ? e.target.search.value : e
        twitchHelpers.getChannelData(streamerToAdd)
        .then((user) => {
            if(user.data.status == 404) {
                alert("Streamer does not exist, please try another")
            } else {
                if(this.state.channels.indexOf(streamerToAdd) == -1) {
                    this.setState({
                        channels: update(this.state.channels, {$unshift: [streamerToAdd]})
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
                    <Header />
                    <SearchContainer
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