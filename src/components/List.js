
import React from 'react'
import PropTypes from 'prop-types'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'

const List = props => (
  <Row>
    <Col md={5}>
      <ul>
        {props.data.map(user =>
          <li key={user._id}>{user.email}</li>)}
      </ul>
    </Col>
  </Row>
)

List.propTypes = {
  data: PropTypes.array.isRequired
}

export default List
