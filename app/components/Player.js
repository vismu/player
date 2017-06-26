import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import throttle from 'lodash.throttle';
import Hls from 'hls.js';
import './Player.css';

export default class Player extends React.PureComponent {
	static propTypes = {
		isPlaying: PropTypes.bool.isRequired,
		isMuted: PropTypes.bool.isRequired,
		isControlsVisible: PropTypes.bool.isRequired,
		isInFullScreen: PropTypes.bool.isRequired,
		startPlaying: PropTypes.func.isRequired,
		pausePlaying: PropTypes.func.isRequired,
		mute: PropTypes.func.isRequired,
		unmute: PropTypes.func.isRequired,
		showControls: PropTypes.func.isRequired,
		hideControls: PropTypes.func.isRequired,
		openFullScreen: PropTypes.func.isRequired,
		closeFullScreen: PropTypes.func.isRequired,
		setTime: PropTypes.func.isRequired,
		setVolume: PropTypes.func.isRequired,
		time: PropTypes.string.isRequired,
		volume: PropTypes.number.isRequired,
		getPlayerInfoRequest: PropTypes.func.isRequired,
		playerInfo: PropTypes.shape({
			title: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		})
	};

	static defaultProps = {
		playerInfo: null,
	};

	constructor(props) {
		super(props);

		this.hls = null;
		this.controlsVisibilityTimer = null;
	}

	componentDidMount() {
		this.props.getPlayerInfoRequest()
			.then(this.initPlayer);
	}

	componentWillUnmount() {
		if (this.hls) {
			this.hls.destroy();
		}
		document.removeEventListener('webkitfullscreenchange', this.toggleFullScreenState);
		document.removeEventListener('mozfullscreenchange', this.toggleFullScreenState);
		document.removeEventListener('fullscreenchange', this.toggleFullScreenState);
		this.video.removeEventListener('play', this.props.startPlaying);
		this.video.removeEventListener('pause', this.props.pausePlaying);
		this.video.removeEventListener('timeupdate', this.handleTimeUpdate);
	}

	setVideoNode = (node) => {
		this.video = node;
		document.addEventListener('webkitfullscreenchange', this.toggleFullScreenState);
		document.addEventListener('mozfullscreenchange', this.toggleFullScreenState);
		document.addEventListener('fullscreenchange', this.toggleFullScreenState);
		this.video.addEventListener('play', this.props.startPlaying);
		this.video.addEventListener('pause', this.props.pausePlaying);
		this.video.addEventListener('timeupdate', this.handleTimeUpdate);
	}

	initPlayer = () => {
		if (this.hls) {
			this.hls.destroy();
		}

		const hls = new Hls({});

		hls.loadSource(this.props.playerInfo.url);
		hls.attachMedia(this.video);
		hls.on(Hls.Events.MANIFEST_PARSED, () => {
			this.handleControlsVisibility();
		});

		this.hls = hls;
	}

	handleControlsVisibility = () => {
		if (!this.controlsVisibilityTimer) {
			this.props.showControls();
		} else {
			clearTimeout(this.controlsVisibilityTimer);
		}

		this.controlsVisibilityTimer = setTimeout(() => {
			this.props.hideControls();
			this.controlsVisibilityTimer = null;
		}, 5000);
	}

	handlePlay = () => {
		this.video.play();
	}

	handlePause = () => {
		this.video.pause();
	}

	handleTimeUpdate = throttle(() => {
		this.props.setTime(moment('00:00', 'mm:ss').add(this.video.currentTime, 'seconds').format('mm:ss'));
	}, 1000)

	handleOpenFullScreen = () => {
		if (this.video.requestFullscreen) {
			this.video.requestFullscreen();
		} else if (this.video.mozRequestFullScreen) {
			this.video.mozRequestFullScreen();
		} else if (this.video.webkitRequestFullscreen) {
			this.video.webkitRequestFullscreen();
		}
	}

	handleCloseFullScreen = () => {
		if (document.cancelFullScreen) {
			document.cancelFullScreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	}

	toggleFullScreenState = () => {
		if (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen) {
			this.props.openFullScreen();
		} else {
			this.props.closeFullScreen();
		}
	}

	handleVolumeChange = ({target: {value}}) => {
		this.props.setVolume(value);
		this.video.volume = value;
	}

	render() {
		const {playerInfo, isControlsVisible, isInFullScreen, isPlaying, isMuted, time, unmute, mute, volume} = this.props;

		return (
			<div className="player" onMouseMove={this.handleControlsVisibility}>
				{playerInfo && isControlsVisible ?
					<div className="player-header">
						<span className="player-header__title">{playerInfo.title}</span>
					</div>
				: null}
				<div className="player-content">
					<video
						ref={this.setVideoNode}
						className="player-content__video"
						controls={false}
						muted={isMuted}
						onClick={isPlaying ? this.handlePause : this.handlePlay}
						onTimeUpdate={this.handleTimeUpdate}
					/>
				</div>
				{isControlsVisible ?
					<div className="player-controls">
						<button className="player-controls__btn" onClick={isPlaying ? this.handlePause : this.handlePlay}>
							{isPlaying ?
								<img className="player-controls__icon" alt="pause" src="./img/pauseicon.svg" />
							:
								<img className="player-controls__icon" alt="play" src="./img/playicon.svg" />
							}
						</button>
						<div className="player-controls-sound">
							<button className="player-controls__btn" onClick={isMuted ? unmute : mute}>
								{isMuted ?
									<img className="player-controls__icon" alt="unmute" src="./img/officon.svg" />
								:
									<img className="player-controls__icon" alt="mute" src="./img/soundicon.svg" />
								}
							</button>
							<input
								type="range"
								className="player-controls-sound__bar"
								onChange={this.handleVolumeChange}
								min="0"
								max="1"
								step="0.1"
								value={volume}
							/>
						</div>
						<span className="player-controls__time">{time}</span>
						<button
							className="player-controls__btn"
							onClick={isInFullScreen ? this.handleCloseFullScreen : this.handleOpenFullScreen}
						>
							{isInFullScreen ?
								<img className="player-controls__icon" alt="window" src="./img/windowicon.svg" />
							:
								<img className="player-controls__icon" alt="full" src="./img/fullicon.svg" />
							}
						</button>
					</div>
				: null}
			</div>
		);
	}
}
