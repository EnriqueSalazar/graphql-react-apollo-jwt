// stateless component receives the status, data of the assignee and date and
// time of the assignation
import React from 'react'
import PropTypes from 'prop-types'
import {gql, graphql} from 'react-apollo'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'

class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formValues: {}
    }
  }
  handleChange = (event) => {
    const id = event.target.id
    const value = event.target.value
    const formValues = this.state.formValues
    formValues[id] = value
    this.setState({formValues})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // this.props.handleSubmit(this.state.formValues)
    const firstname = this.state.formValues.firstname
    const lastname = this.state.formValues.lastname
    this.props.submit(firstname, lastname)
    // this.props.mutate({
    //   variables: {firstname, lastname}
    // })
    //   .then(({data}) => {
    //     console.log('got data', data)
    //   }).catch((error) => {
    //     console.log('there was an error sending the query', error)
    //   })
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
            <br />
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
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired
}

const createQuizEntryMutation = gql`
  mutation createQuizEntry($firstname: String!, $lastname: String!){
  createQuizEntry(firstname:$firstname, lastname:$lastname){
    id
    firstname
    lastname
  }
}
`

export default graphql(createQuizEntryMutation, {
  props: ({mutate}) => ({
    submit: (firstname, lastname) => mutate({variables: {firstname, lastname}})
  })
})(Form)
