import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {isPlaying, isControlsVisible} from 'app/selectors/Player';
import {startPlaying, pausePlaying, showControls, hideControls} from 'app/actions/Player';
import Player from 'app/components/Player';

const mapStateToProps = (state) => ({
	isPlaying: isPlaying(state),
	isControlsVisible: isControlsVisible(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
	startPlaying,
	pausePlaying,
	showControls,
	hideControls,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Player);
