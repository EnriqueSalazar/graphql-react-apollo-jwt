import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import QUIZ_ENTRY_QUERY from '../queries/QuizEntryQuery.graphql'
import CREATE_QUIZ_ENTRY_MUTATION from
  '../queries/CreateQuizEntryMutation.graphql'

class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: ''
    }
  }
  handleChange = (event) => {
    const id = event.target.id
    const value = event.target.value
    const formValue = {}
    formValue[id] = value
    this.setState(formValue)
  }
  resetFormValues = () => {
    this.setState({
      firstname: '',
      lastname: ''
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const that = this
    const firstname = this.state.firstname
    const lastname = this.state.lastname
    this.props.mutate({
      variables: {firstname, lastname},
      refetchQueries: [{query: QUIZ_ENTRY_QUERY}]
    })
      .then(({data}) => {
        console.log('QuizEntry created:', data, '<= check the ID')
        that.resetFormValues()
      }).catch((error) => {
        console.log('there was an error sending the query', error)
      })
  }

  render () {
    return (
      <Row>
        <Col md={5}>
          <form onSubmit={this.handleSubmit}>
            <input
              id="firstname"
              type="text"
              value={this.state.firstname}
              onChange={this.handleChange} />
            <input
              id="lastname"
              type="text"
              value={this.state.lastname}
              onChange={this.handleChange} />
            <br />
            <button type="submit">Submit</button>
          </form>
        </Col>
      </Row>
    )
  }
}

Form.propTypes = {
  mutate: PropTypes.func.isRequired
}

const FormWithMutation = graphql(CREATE_QUIZ_ENTRY_MUTATION)(Form)

export default FormWithMutation
