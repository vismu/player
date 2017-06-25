import {createAction} from 'redux-actions';
import * as actionTypes from 'app/constants/Player';

export const startPlaying = createAction(actionTypes.START_PLAYING);
export const pausePlaying = createAction(actionTypes.PAUSE_PLAYING);
export const showControls = createAction(actionTypes.SHOW_CONTROLS);
export const hideControls = createAction(actionTypes.HIDE_CONTROLS);
