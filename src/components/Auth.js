
import React from 'react'
import PropTypes from 'prop-types'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'

const Auth = props => {
  let profileHTML = null
  if (props.session.profile && props.session.logout) {
    const displayName = props.session.profile.displayName
    const logout = <a href={props.session.logout}>Logout</a>
    profileHTML = <div>{displayName}<br />{logout}</div>
  } else {
    profileHTML = <a href='/auth/login'>Login</a>
  }

  return (
    <Row>
      <Col md={5}>
        {profileHTML}
      </Col>
    </Row>
  )
}

Auth.propTypes = {
  session: PropTypes.object.isRequired
}

export default Auth
