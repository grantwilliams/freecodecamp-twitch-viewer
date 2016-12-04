import React, {Component} from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import MainContainer from '../components/MainContainer';
import ResultsContainer from './ResultsContainer';
import SearchContainer from './SearchContainer';
import twitchHelpers from '../utils/twitchHelpers';

class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            originalChannels: ["ESL_SC2"]
            // originalChannels: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb",
            // "noobs2ninjas", "comster404", "brunofin", "syndicate", "riotgames", "ESL_CSGO", "LIRIK"]
        }

    }

    handleAddStreamer(e) {
        e.preventDefault();
        var streamerToAdd = e.target.search.value
        var newChannels = this.state.originalChannels
        twitchHelpers.getChannelData(streamerToAdd)
        .then((user) => {
            if(user.data.status == 404) {
                alert("Streamer does not exist, please try another")
            } else {
                if(newChannels.indexOf(streamerToAdd) == -1) {
                    newChannels.push(streamerToAdd)
                }
            }
        })
        this.setState({
            originalChannels: newChannels
        });
        console.log(this.state.originalChannels);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <MainContainer>
                <div id="top-section">
                    <Header />
                    <SearchContainer
                    handleAddStreamer={this.handleAddStreamer.bind(this)}
                    originalChannels={this.state.originalChannels} />
                    <Menu />
                </div>
                <ResultsContainer
                originalChannels={this.state.originalChannels} />
                </MainContainer>
            </div>
        );
    }
}

AppContainer.propTypes = {

};

export default AppContainer;