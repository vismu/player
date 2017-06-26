import {handleActions} from 'redux-actions';
import * as actionTypes from 'app/constants/Player';

const initialState = {
	isPlaying: false,
	isMuted: false,
	isControlsVisible: false,
	isInFullScreen: false,
	time: '00:00',
	volume: 1,
	playerInfo: null,
};

export default handleActions({
	[actionTypes.START_PLAYING]: (state) => ({...state, isPlaying: true}),
	[actionTypes.PAUSE_PLAYING]: (state) => ({...state, isPlaying: false}),
	[actionTypes.MUTE]: (state) => ({...state, isMuted: true}),
	[actionTypes.UNMUTE]: (state) => ({...state, isMuted: false}),
	[actionTypes.SHOW_CONTROLS]: (state) => ({...state, isControlsVisible: true}),
	[actionTypes.HIDE_CONTROLS]: (state) => ({...state, isControlsVisible: false}),
	[actionTypes.OPEN_FULLSCREEN]: (state) => ({...state, isInFullScreen: true}),
	[actionTypes.CLOSE_FULLSCREEN]: (state) => ({...state, isInFullScreen: false}),
	[actionTypes.SET_TIME]: (state, {payload: {time}}) => ({...state, time: time || state.time}),
	[actionTypes.SET_VOLUME]: (state, {payload: {volume}}) => ({...state, volume}),
	[actionTypes.SET_PLAYER_INFO]: (state, {payload: {playerInfo}}) => ({...state, playerInfo}),
}, initialState);
