import React from 'react';
import PropTypes from 'prop-types';

export default class Player extends React.PureComponent {
	static propTypes = {
		isPlaying: PropTypes.bool.isRequired,
		isControlsVisible: PropTypes.bool.isRequired,
		startPlaying: PropTypes.func.isRequired,
		pausePlaying: PropTypes.func.isRequired,
		showControls: PropTypes.func.isRequired,
		hideControls: PropTypes.func.isRequired,
	};

	render() {
		return (<div />);
	}
}
