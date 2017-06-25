import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Player.css';

export default class Player extends React.PureComponent {
	static propTypes = {
		isPlaying: PropTypes.bool.isRequired,
		isControlsVisible: PropTypes.bool.isRequired,
		startPlaying: PropTypes.func.isRequired,
		pausePlaying: PropTypes.func.isRequired,
		showControls: PropTypes.func.isRequired,
		hideControls: PropTypes.func.isRequired,
		getPlayerInfoRequest: PropTypes.func.isRequired,
		playerInfo: PropTypes.shape({
			title: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		})
	};

	static defaultProps = {
		playerInfo: null,
	}

	componentDidMount() {
		const {getPlayerInfoRequest, showControls, startPlaying} = this.props;

		getPlayerInfoRequest()
			.then(showControls)
			.then(startPlaying);
	}

	render() {
		const {playerInfo, isControlsVisible, isPlaying} = this.props;

		return (
			<div className="player">
				{playerInfo && isControlsVisible ?
					<div className="player-header">
						<span className="player-header__title">{playerInfo.title}</span>
					</div>
				: null}
				{isControlsVisible ?
					<div className="player-controls">
						<button className="player-controls__btn">
							{isPlaying ?
								<img className="player-controls__icon" alt="play" src="./img/pauseicon.svg" />
							:
								<img className="player-controls__icon" alt="play" src="./img/playicon.svg" />
							}
						</button>
						<div className="player-controls-sound">
							<button className="player-controls__btn">
								{isPlaying ?
									<img className="player-controls__icon" alt="play" src="./img/soundicon.svg" />
								:
									<img className="player-controls__icon" alt="play" src="./img/officon.svg" />
								}
							</button>
							<div className="player-controls-sound__bar">
								<div className="player-controls-sound__level" style={{width: '50%'}} />
							</div>
						</div>
						<span className="player-controls__time">
							{moment().format('HH:mm')}
						</span>
						<button className="player-controls__btn">
							{isPlaying ?
								<img className="player-controls__icon" alt="play" src="./img/fullicon.svg" />
							:
								<img className="player-controls__icon" alt="play" src="./img/windowicon.svg" />
							}
						</button>
					</div>
				: null}
			</div>
		);
	}
}
