// This container handles the state of the app, also defines the layout.
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import Form from '../components/Form'
import List from '../components/List'
import QUIZ_ENTRY_QUERY from '../queries/QuizEntryQuery.graphql'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      quizEntries: []
    }
  }

  // when props received from the store, updates state.
  componentWillReceiveProps (nextProps) {
    const quizEntries = nextProps.data.quizEntries
    if (quizEntries) {
      this.setState({quizEntries})
    }
  }

  render () {
    return (
      <div >
        <Form />
        <List quizEntries={this.state.quizEntries} />
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
  options: {pollInterval: 3000}
})(Main)

export default MainWithData
