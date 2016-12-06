import React, {Component} from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import MainContainer from '../components/MainContainer';
import ResultsContainer from './ResultsContainer';
import SearchContainer from './SearchContainer';
import twitchHelpers from '../utils/twitchHelpers';
import update from 'immutability-helper';

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
        }
    }

    handleAddStreamer(e) {
        typeof e == 'object' ? e.preventDefault() : null;
        var streamerToAdd = typeof e == 'object' ? e.target.search.value.toLowerCase() : e
        var updatedChannels;
        twitchHelpers.getChannelData(streamerToAdd)
        .then((user) => {
            if(user.data.status == 404) {
                alert("Streamer does not exist, please try another")
            } else {
                var alreadyExists = false;
                for(let channel of this.state.originalChannels) {
                    if(channel.channel == streamerToAdd) {
                        channel.exists ? alreadyExists = true : channel.exists = true, alreadyExists = true
                    }
                }
                if(!alreadyExists) {
                    this.setState({
                        originalChannels: [{channel: streamerToAdd, dataKey:this.state.nextKey, exists: true}].concat(this.state.originalChannels),
                        nextKey: this.state.nextKey + 1
                    });
                    // updatedChannels = update(this.state.originalChannels, {$unshift: [{channel: streamerToAdd, dataKey:this.state.nextKey, exists: true}]})
                    // updatedChannels.unshift({channel: streamerToAdd, dataKey:this.state.nextKey, exists: true})
                }
                // console.log(this.state.originalChannels);
                // console.log(updatedChannels);
                // this.setState({
                //     originalChannels: updatedChannels,
                //     nextKey: this.state.nextKey + 1
                // });
            }
        })
    }

    handleDeleteStreamer(streamerKey) {
        var newChannels = this.state.originalChannels
        for(let channel of newChannels) {
            if(channel.dataKey == streamerKey) {
                channel.exists = false
                break
            }
        }
        this.setState({
            originalChannels: newChannels
        });
    }

    handleMenuClick(e) {
        this.setState({
            showing: e.target.id
        });
    }

    // componentWillMount() {

    // }

    // componentDidMount() {

    // }

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
        return (
            <div className="container text-center" id="main-wrapper">
                <div id="top-section" className="row">
                    <Header />
                    <SearchContainer
                    handleAddStreamer={this.handleAddStreamer.bind(this)}
                    originalChannels={this.state.originalChannels} />
                    <Menu
                    onClick={this.handleMenuClick.bind(this)}
                    showing={this.state.showing} />
                </div>
                <ResultsContainer
                originalChannels={this.state.originalChannels}
                handleDeleteStreamer={this.handleDeleteStreamer.bind(this)}
                showing={this.state.showing} />
            </div>
        );
    }
}

AppContainer.propTypes = {

};

export default AppContainer;