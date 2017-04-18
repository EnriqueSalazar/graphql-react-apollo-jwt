
import React from 'react'
import PropTypes from 'prop-types'

const List = props => (
  <ul>
    {props.quizEntries.map(user =>
      <li key={user.id}>{user.firstname} {user.lastname}</li>)}
  </ul>
)

List.propTypes = {
  quizEntries: PropTypes.array.isRequired
}

export default List
