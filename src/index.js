// passes store to root
import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider} from 'react-apollo'
import './index.css'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import {ENDPOINT} from './config/'
const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: ENDPOINT,
    opts: {
      credentials: 'same-origin'
    }
  }),
  dataIdFromObject: o => o.id
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root store={store} history={history} />
  </ApolloProvider>,
  document.getElementById('root'))
