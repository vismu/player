import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

window.mockStore = configureStore([thunk]);
