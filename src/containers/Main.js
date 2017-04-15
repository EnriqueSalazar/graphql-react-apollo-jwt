// This container handles the state of the app, also defines the layout.
import React, {Component} from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import Form from '../components/Form'
import List from '../components/List'
import Auth from '../components/Auth'
import QUIZ_ENTRY_QUERY from '../queries/QuizEntryQuery.graphql'
import cookie from 'react-cookie'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      quizEntries: [],
      session: {}
    }
  }
  componentDidMount () {
    this.checkCookieChange('app-cookie')
  }
  // when props received from the store, updates state.
  componentWillReceiveProps (nextProps) {
    const quizEntries = nextProps.data.quizEntries
    if (quizEntries) {
      this.setState({quizEntries})
    }
    this.checkCookieChange('app-cookie')
  }
  componentDidUpdate () {
    this.checkCookieChange('app-cookie')
  }

  getSessionFromCookie = (cookieName) => {
    const cookieJSON = cookie.load(cookieName)
    return cookieJSON || {}
  }
  deleteSessionCookie = (cookieName) => {
    cookie.remove(cookieName)
  }
  checkCookieChange = (cookieName) => {
    const newSession = this.getSessionFromCookie(cookieName)
    const currentSession = this.state.session
    const shouldUpdateSessionState = !_.isEqual(currentSession, newSession)
    if (shouldUpdateSessionState) {
      this.setState({session: newSession})
    }
  }
  render () {
    return (
      <div >
        <Auth
          session={this.state.session} />
        {
            !_.isEmpty(this.state.session) &&
            <div>
              <Form />
              <List
                quizEntries={this.state.quizEntries} />
            </div>
          }
      </div>
    )
  }
}
// propTypes provides documentation of the props in each component.
Main.propTypes = {
  actions: PropTypes.object.isRequired,
  main: PropTypes.object.isRequired
}

const MainWithData = graphql(QUIZ_ENTRY_QUERY, {
  // options: {pollInterval: 3000}
})(Main)

export default MainWithData
