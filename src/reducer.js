/**
 * This module composes root reducer including react-router
 * @requires redux
 * @requires react-router-redux
 */
import {combineReducers} from 'redux';
import {routerReducer as router} from 'react-router-redux';


/**
 * App reducer maintain states to be shared across modules
 * @param  {Object} state - Previous leaf node of redux store
 * @param  {Object} state.currentUser - {}, userName => gust
 * @param  {Object} action - Redux action
 * @return {Object}
 */


/**
 * This is a create reducer function
 * It returns current permanent and asynchronously loaded reducers
 * @param  {function} asyncReducers - asynchronously loaded recuders
 * @return {object} - root reducer
 */
export default function createReducer(asyncReducers) {
  /**
   * Return root reducer
   * Name of each leaf store should match Page Name or Functionality Name
   */
  return combineReducers({
    // Permanent redux reducers
    router,
    // Aync reducers
    ...asyncReducers,
  });
}
