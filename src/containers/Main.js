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
    console.info('componentDidUpdate')
    this.props.actions.getSessionFromCookie(COOKIE_NAME)
  }

  render () {
    return (
      <div >
        <Auth
          session={this.props.main.session} />
        {
            !_.isEmpty(this.props.main.session) &&
            <div>
              <br />
              <Form />
              <Body />
            </div>
          }
        <a href='/graphiql'>GraphiQL</a>
      </div>
    )
  }
}

Main.propTypes = {
  actions: PropTypes.object.isRequired,
  main: PropTypes.object.isRequired
}

export default Main
