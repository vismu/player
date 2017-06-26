import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {isPlaying, isMuted, isControlsVisible, isInFullScreen, getPlayerInfo, getTime, getVolume} from 'app/selectors/Player';
import {
	startPlaying, pausePlaying, showControls, hideControls, getPlayerInfoRequest,
	setTime, setVolume, openFullScreen, closeFullScreen, mute, unmute,
} from 'app/actions/Player';
import Player from 'app/components/Player';

const mapStateToProps = (state) => ({
	isPlaying: isPlaying(state),
	isMuted: isMuted(state),
	isControlsVisible: isControlsVisible(state),
	isInFullScreen: isInFullScreen(state),
	time: getTime(state),
	volume: getVolume(state),
	playerInfo: getPlayerInfo(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
	startPlaying,
	pausePlaying,
	mute,
	unmute,
	showControls,
	hideControls,
	openFullScreen,
	closeFullScreen,
	setTime,
	setVolume,
	getPlayerInfoRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Player);
