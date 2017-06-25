import {createAction} from 'redux-actions';
import * as actionTypes from 'app/constants/Player';
import axios from 'axios';

export const startPlaying = createAction(actionTypes.START_PLAYING);
export const pausePlaying = createAction(actionTypes.PAUSE_PLAYING);
export const showControls = createAction(actionTypes.SHOW_CONTROLS);
export const hideControls = createAction(actionTypes.HIDE_CONTROLS);

export const setPlayerInfo = createAction(
	actionTypes.SET_PLAYER_INFO,
	(playerInfo) => ({playerInfo}),
);

export const getPlayerInfoRequest = () => (dispatch) => axios.get('/player_info.json')
	.then(({data}) => dispatch(setPlayerInfo(data)));
