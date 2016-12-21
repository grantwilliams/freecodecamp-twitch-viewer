import axios from 'axios';
import $ from 'jquery'

var CLIENT_ID = 'lzs8jzwl2tuwu1exvekqrn54wyn3utp'
var BASE_URL = 'https://api.twitch.tv/kraken'

function getTwitchData (searchType, channel) {
    return axios.get(`${BASE_URL}/${searchType}/${channel}/?client_id=${CLIENT_ID}&callback=`);
}

function searchTwitchChannels (query) {
    return axios.get(`${BASE_URL}/search/channels?q=${query}&client_id=${CLIENT_ID}`)
}

var twitchHelpers = {
    updateChannelDetails: function (channel) {
        return new Promise((resolve) => {
            let channelDetails = {
                displayName: channel,
                status: 'offline',
                logo: '../images/default_profile_big.png',
                game: 'Offline',
                url: undefined,
                uid: undefined,
                preview: undefined,
                visible: false,
            }

            getTwitchData('channels', channel).then((user) => {
                if(user.data.error) {
                    channelDetails = {
                        ...channelDetails,
                        game: 'Account Closed'
                    }
                    resolve(channelDetails)
                } else {
                    channelDetails = {
                        ...channelDetails,
                        displayName: user.data.display_name,
                        logo: user.data.logo,
                        url: user.data.url,
                        uid: user.data._id
                    }

                    getTwitchData('streams', channel).then((streamer) => {
                        if(streamer && streamer.data.stream) {
                            channelDetails = {
                                ...channelDetails,
                                status: 'online',
                                preview: <img className="img-responsive twitch-preview" src={streamer.data.stream.preview.medium} />,
                                game: streamer.data.stream.game + ': ' + streamer.data.stream.channel.status,
                            }
                        }
                        resolve(channelDetails)
                    })
                }
            })
        })
    },
    getChannelSuggestions: function (query) {
        return searchTwitchChannels(query)
        .then(function (results) {
            return results
        })
    }
}

export default twitchHelpers;