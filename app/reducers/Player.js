import {handleActions} from 'redux-actions';
import * as actionTypes from 'app/constants/Player';

const initialState = {
	isPlaying: false,
	isControlsVisible: false,
	playerInfo: null,
};

export default handleActions({
	[actionTypes.START_PLAYING]: (state) => ({...state, isPlaying: true}),
	[actionTypes.PAUSE_PLAYING]: (state) => ({...state, isPlaying: false}),
	[actionTypes.SHOW_CONTROLS]: (state) => ({...state, isControlsVisible: true}),
	[actionTypes.HIDE_CONTROLS]: (state) => ({...state, isControlsVisible: false}),
	[actionTypes.SET_PLAYER_INFO]: (state, {payload: {playerInfo}}) => ({...state, playerInfo}),
}, initialState);
