// This container handles the state of the app, also defines the layout.
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Form from '../components/Form'
import List from '../components/List'
import {gql, graphql} from 'react-apollo'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      quizEntries: [],
      formValues: {}
    }
  }

  // dispatchs an action to load the data
  componentDidMount () {
    this.props.actions.loadData()
  }

  // when props received from the store, updates state.
  componentWillReceiveProps (nextProps) {
    const quizEntries = nextProps.data.quizEntries
    if (quizEntries) {
      this.setState({quizEntries})
    }
  }
  handleSubmit=(formValues) => {
    this.props.actions.add(formValues)
  }
  render () {
    return (
      <div >
        <Form handleSubmit={this.handleSubmit} />
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
export default graphql(gql`
  query{quizEntries{
    id,
    firstname,
    lastname
  }}
`)(Main)
