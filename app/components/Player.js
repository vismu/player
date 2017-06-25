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
		return (<div />);
	}
}
