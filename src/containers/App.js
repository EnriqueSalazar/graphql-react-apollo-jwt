// this container takes the state from the store and the actions and passes them
// to the Main container.
import React from 'react'
import PropTypes from 'prop-types'
import Main from './Main'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as MaintActions from '../actions'

const App = ({main, actions}) => (
  <div className="App">
    <Main actions={actions} main={main} />
  </div>
)

App.propTypes = {
  main: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  main: state.main
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(MaintActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
