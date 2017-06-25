import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {isPlaying, isControlsVisible, getPlayerInfo} from 'app/selectors/Player';
import {startPlaying, pausePlaying, showControls, hideControls, getPlayerInfoRequest} from 'app/actions/Player';
import Player from 'app/components/Player';

const mapStateToProps = (state) => ({
	isPlaying: isPlaying(state),
	isControlsVisible: isControlsVisible(state),
	playerInfo: getPlayerInfo(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
	startPlaying,
	pausePlaying,
	showControls,
	hideControls,
	getPlayerInfoRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Player);
