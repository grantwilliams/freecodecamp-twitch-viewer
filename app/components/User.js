import React, {PropTypes} from 'react';

const User = props => {
    return (
        <a href={props.url} target="_blank" className={"streamers-" + props.status}>
            <div id={props.displayName} className={"streamer container-fluid row " + props.status}>
                <div className="col-md-2 text-center" id={props.displayName + "-twitch-logo"}>
                    <img className="img-circle img-responsive logo"
                    src={props.game == 'Account Closed' ? require('../images/default_profile_big.png') : props.logo } />
                </div>
                <div className="col-md-2" id={props.displayName + "-twitch-channel"}><strong>{props.displayName}</strong></div>
                <div className="col-md-6" id={props.displayName + "-twitch-game"}>{props.game}</div>
                <div className="col-md-2" id={props.displayName + "-twitch-preview"}>{props.preview}</div>
            </div>
        </a>
    );
};

User.propTypes = {
    displayName: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    game: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    preview: PropTypes.object,
    url: PropTypes.string
};

export default User;