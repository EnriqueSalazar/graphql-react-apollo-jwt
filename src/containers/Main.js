import React, {Component} from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import Form from '../components/Form'
import Body from '../components/Body'
import Auth from '../components/Auth'
import {COOKIE_NAME} from '../config/'
class Main extends Component {
  componentDidMount () {
    this.props.actions.getSessionFromCookie(COOKIE_NAME)
  }

  shouldComponentUpdate (nextProps, nextState) {
    const newSession = nextProps.main.session
    const currentSession = this.props.main.session
    const shouldUpdateSessionState =
    !_.isEqual(currentSession, newSession)
    return shouldUpdateSessionState
  }
  componentDidUpdate () {
    this.props.actions.getSessionFromCookie(COOKIE_NAME)
  }

  render () {
    return (
      <div >
        <Auth
          session={this.props.main.session} />
        <a href='/graphiql'>GraphiQL</a>
        <br />
        <br />
        {
          !_.isEmpty(this.props.main.session) &&
          <div>
            <br />
            <Form />
            <br />
            <Body />
          </div>
        }
      </div>
    )
  }
}

Main.propTypes = {
  actions: PropTypes.object.isRequired,
  main: PropTypes.object.isRequired
}

export default Main
