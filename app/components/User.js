import React, {PropTypes} from 'react';

const User = props => {
    return (
        props.showChannel
        ? <div id={props.displayName} className={"streamer container-fluid row " + props.status} key={props.dataKey}>
                <a href={props.url} target="_blank" className={"streamers-" + props.status}>
                    <div className="col-xs-5 col-sm-3 col-md-2 text-center text-div" id={props.displayName + "-twitch-logo"}>
                        <img className="img-responsive logo"
                        src={props.game == 'Account Closed' ? require('../images/default_profile_big.png') : props.logo } />
                    </div>
                    <div className="col-xs-5 col-sm-5 col-md-7 clamped clamped-2" id={props.displayName + "-twitch-channel"}>
                        <span className="text-div"><strong>{props.displayName}</strong><br />
                        <span className="twich-game">{props.game}</span></span>
                    </div>
                    <div className="col-sm-3 col-md-2 twitch-preview-div" id={props.displayName + "-twitch-preview"}>{props.preview}</div>
                </a>
                <div className="col-xs-2 col-sm-1 col-md-1">
                    <button className="btn-delete" onClick={() => props.onClick(props.dataKey)}><i className="fa fa-times"></i></button>
                </div>
            </div>
        : null
    );
};

User.propTypes = {
    displayName: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    game: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    preview: PropTypes.object,
    url: PropTypes.string,
    dataKey: PropTypes.number.isRequired,
    showChannel: PropTypes.bool.isRequired
};

export default User;