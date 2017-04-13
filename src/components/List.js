
import React from 'react'
import PropTypes from 'prop-types'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'

const List = props => (
  <Row>
    <Col md={5}>
      <ul>
        {props.quizEntries.map(user =>
          <li key={user.id}>{user.firstname} {user.lastname}</li>)}
      </ul>
    </Col>
  </Row>
)

List.propTypes = {
  quizEntries: PropTypes.array.isRequired
}

export default List
