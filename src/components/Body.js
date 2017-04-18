import React, {Component} from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import List from '../components/List'
import QUIZ_ENTRY_QUERY from '../queries/QuizEntryQuery.graphql'

class Body extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    const newQuizEntries = nextProps.data.quizEntries
    const currentQuizEntries = this.props.data.quizEntries
    const shouldUpdateQuizEntries =
    !_.isEqual(newQuizEntries, currentQuizEntries)
    return shouldUpdateQuizEntries
  }

  render () {
    return (
      <Row>
        <Col md={5}>
          {
          this.props.data.quizEntries && <List
            quizEntries={this.props.data.quizEntries} />
        }
        </Col>
      </Row>
    )
  }
}

Body.propTypes = {
  data: PropTypes.object.isRequired
}

const BodyWithData = graphql(QUIZ_ENTRY_QUERY, {
  // options: {pollInterval: 3000}
})(Body)

export default BodyWithData
