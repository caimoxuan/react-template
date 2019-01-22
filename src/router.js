import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import {object} from 'prop-types';
import lodable from 'react-loadable';

// Dynamically load reducer
import injectAsyncReducer from './injectAsyncReducer';


/**
 * Router with lazy loaded pages
 */
export default class Router extends React.Component {
  static contextTypes = {
    store: object,
  };

  /**
   * @param {Object} props
   * @param {Object} context
   */
  constructor(props, context) {
    super(props);

    this.IndexPage = lodable({
      loader: () => {
        return import('./component/Index')
      },
      loading: () => {
        return <div>Loading...</div>
      },
    });
  }

  /**
   * @return {Component}
   */
  render() {
    return (
      <Switch>
        <Route exact path="/" component={this.IndexPage} />

      </Switch>
    );
  }
}
