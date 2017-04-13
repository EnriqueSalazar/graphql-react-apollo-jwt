// stateless component receives the status, data of the assignee and date and
// time of the assignation
import React from 'react'
import PropTypes from 'prop-types'
// import {Row, Col} from 'react-bootstrap'
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
    this.props.handleSubmit(this.state.formValues)
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
            <input
              id="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange} />
            <button type="submit">hola</button>
          </form>
        </Col>
      </Row>
    )
  }
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default Form
