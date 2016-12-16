import React, {Component} from 'react';
import Header from '../components/Header';
import SearchContainer from './SearchContainer';
import Menu from '../components/Menu';
import Loading from '../components/Loading';
import UserContainer from './UserContainer';
import twitchHelpers from '../utils/twitchHelpers';
import '../main.css';

class AppContainer extends Component {
    constructor(props) {
        super(props);

        var startingChannelsList = ["ESL_SC2", "OgamingSC2", "freecodecamp", "storbeck", "noobs2ninjas", "comster404", "brunofin",
        "syndicate", "riotgames", "ESL_CSGO", "LIRIK"]
        this.dataKey = 0
        var startingChannels = []
        startingChannelsList.forEach(channel => {
            startingChannels.push({channel: channel.toLowerCase(), dataKey: this.dataKey, exists: true})
            this.dataKey++
        })
        this.state = {
            nextKey: this.dataKey,
            originalChannels: startingChannels,
            showing: 'all',
            isLoading: true
        }
    }

    handleAddStreamer(e) {
        typeof e == 'object' ? e.preventDefault() : null;
        var streamerToAdd = typeof e == 'object' ? e.target.search.value.toLowerCase() : e.toLowerCase()
        var updatedChannels = JSON.parse(JSON.stringify(this.state.originalChannels))
        twitchHelpers.getChannelData(streamerToAdd)
        .then((user) => {
            if(user.data.status == 404) {
                alert("Streamer does not exist, please try another")
            } else {
                var alreadyExists = false;
                for(let channel of updatedChannels) {
                    if(channel.channel == streamerToAdd) {
                        channel.exists ? alreadyExists = true : channel.exists = true, alreadyExists = true
                        this.setState({
                            originalChannels: updatedChannels
                        });
                    }
                }
                if(!alreadyExists) {
                    this.setState({
                        originalChannels: [{channel: streamerToAdd, dataKey:this.state.nextKey, exists: true}].concat(this.state.originalChannels),
                        nextKey: this.state.nextKey + 1
                    });
                }
            }
        })
    }

    handleDeleteStreamer(streamerKey) {
        var updatedChannels = JSON.parse(JSON.stringify(this.state.originalChannels))
        for(let channel of updatedChannels) {
            if(channel.dataKey == streamerKey) {
                channel.exists = false
                break
            }
        }
        this.setState({
            originalChannels: updatedChannels
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
                    onClick={this.handleMenuClick.bind(this)}
                    showing={this.state.showing} />
                </div>
                {this.state.isLoading
                    ? <Loading />
                    : this.state.originalChannels.map((channel, key) => {
                        return (
                            <UserContainer
                            channelName={channel.channel}
                            dataKey={channel.dataKey}
                            key={key}
                            showing={this.state.showing}
                            handleDeleteStreamer={this.handleDeleteStreamer.bind(this)}
                            exists={channel.exists} />
                        );
                    })
                }
            </div>
        );
    }
}

export default AppContainer;