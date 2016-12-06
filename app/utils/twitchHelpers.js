import axios from 'axios';
import $ from 'jquery'

var CLIENT_ID = 'lzs8jzwl2tuwu1exvekqrn54wyn3utp'
var BASE_URL = 'https://api.twitch.tv/kraken'

function getTwitchData (type, channel) {
    return axios.get(`${BASE_URL}/${type}/${channel}/?client_id=${CLIENT_ID}&callback=`);
}

function searchTwitchChannels (query) {
    return axios.get(`${BASE_URL}/search/channels?q=${query}&client_id=${CLIENT_ID}`)
}

var twitchHelpers = {
    getStreamingData: function (channel) {
        return getTwitchData('streams', channel)
        .then(function (streamer) {
            return streamer
        }).catch(function (err) {
            console.log(err);
        })
    },
    getChannelData: function (channel) {
        return getTwitchData('channels', channel)
        .then(function (user) {
            return user;
        }).catch(function (err) {
            console.log(err);
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