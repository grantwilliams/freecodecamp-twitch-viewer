import React, {Component, PropTypes} from 'react';
import UserContainer from './UserContainer'
import AppContainer from './OldAppContainer'

class ResultsContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            resultsDiv: '',
            showing: 'all',
            // channels: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb",
            // "noobs2ninjas", "comster404", "brunofin", "syndicate", "riotgames", "ESL_CSGO", "summit1g", "LIRIK"]
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        var resultsDiv = this.props.originalChannels.map((channel, key) => { // change back to state
            console.log(channel);
                        return (
                            <UserContainer
                            channelName={channel}
                            key={key}
                            showing={this.state.showing}
                            isLoading={this.state.isLoading} />
                        )
                    })
        this.setState({
            resultsDiv: resultsDiv,
            isLoading: false
        });
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
        if (this.state.isLoading) {
            return (
                <div>
                    LOADING...
                </div>
            )
        } else {
            return (
                <div className="col-xs-12">
                    {this.state.resultsDiv}
                </div>
                // <div>
                //     {this.state.channels.map((channel, key) => {
                //         return (
                //             <UserContainer
                //             channelName={channel}
                //             key={key}
                //             showing={this.state.showing}
                //             isLoading={this.state.isLoading} />
                //         )
                //     })}
                // </div>
            );
        }
    }
}

ResultsContainer.propTypes = {
    // isLoading: PropTypes.bool.isRequired,
};

export default ResultsContainer;