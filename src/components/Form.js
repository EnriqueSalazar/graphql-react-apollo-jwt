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
    // debugger//eslint-disable-line
    this.setState({
      firstname: '',
      lastname: ''
    })
  }
  handleSubmit = (event) => {
    const that = this
    event.preventDefault()
    // this.props.handleSubmit(this.state.formValues)
    const firstname = this.state.firstname
    const lastname = this.state.lastname
    // this.props.submit(firstname, lastname)
    this.props.mutate({
      variables: {firstname, lastname},
      refetchQueries: [{query: QuizEntryQuery}]
    })
      .then(({data}) => {
        console.log('got data', data)
        that.resetFormValues()
        // that.setState({formValues: {}})
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
  handleSubmit: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired
}

const CreateQuizEntryMutation = gql`
  mutation createQuizEntry($firstname: String!, $lastname: String!){
  createQuizEntry(firstname:$firstname, lastname:$lastname){
    id
    firstname
    lastname
  }
}
`
const QuizEntryQuery = gql`
  query{quizEntries{
    id,
    firstname,
    lastname
  }}
`
const FormWithMutation = graphql(CreateQuizEntryMutation)(Form)
// const FormWithMutation = graphql(CreateQuizEntryMutation, {
//   props: ({mutate}) => ({
//     submit: (firstname, lastname) => mutate({
//       variables: {firstname, lastname},
//       refetchQueries: [{query: QuizEntryQuery}]
//     })
//       .then(({data}) => {
//         debugger//eslint-disable-line
//         console.log('got data', data)
//         this.setState({formValues: {}})
//       }).catch((error) => {
//         console.log('there was an error sending the query', error)
//       })
//   })
// })(Form)

export default FormWithMutation
