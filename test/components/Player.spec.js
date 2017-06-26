import React from 'react';
import {render} from 'react-dom';
import PromiseMock from 'promise-mock';
import Player from 'app/components/Player';

const funcMock = jest.fn();

describe('Clock', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		render(<Player
			isPlaying
			isMuted
			isControlsVisible
			isInFullScreen
			getPlayerInfoRequest={() => PromiseMock.resolve()}
			startPlaying={funcMock}
			pausePlaying={funcMock}
			mute={funcMock}
			unmute={funcMock}
			showControls={funcMock}
			hideControls={funcMock}
			openFullScreen={funcMock}
			closeFullScreen={funcMock}
			setTime={funcMock}
			setVolume={funcMock}
			time={'01:01'}
			volume={0.5}
		/>, div);
	});
});
