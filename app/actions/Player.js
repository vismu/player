import {createAction} from 'redux-actions';
import * as actionTypes from 'app/constants/Player';
import axios from 'axios';

export const startPlaying = createAction(actionTypes.START_PLAYING);
export const pausePlaying = createAction(actionTypes.PAUSE_PLAYING);
export const mute = createAction(actionTypes.MUTE);
export const unmute = createAction(actionTypes.UNMUTE);
export const showControls = createAction(actionTypes.SHOW_CONTROLS);
export const hideControls = createAction(actionTypes.HIDE_CONTROLS);
export const openFullScreen = createAction(actionTypes.OPEN_FULLSCREEN);
export const closeFullScreen = createAction(actionTypes.CLOSE_FULLSCREEN);

export const setTime = createAction(
	actionTypes.SET_TIME,
	(time) => ({time}),
);

export const setVolume = createAction(
	actionTypes.SET_VOLUME,
	(volume) => ({volume}),
);

export const setPlayerInfo = createAction(
	actionTypes.SET_PLAYER_INFO,
	(playerInfo) => ({playerInfo}),
);

export const getPlayerInfoRequest = () => (dispatch) => axios.get('/player_info.json')
	.then(({data}) => dispatch(setPlayerInfo(data)));
