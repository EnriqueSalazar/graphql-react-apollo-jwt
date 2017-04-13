// This container handles the state of the app, also defines the layout.
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Form from '../components/Form'
import List from '../components/List'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      formValues: {}
    }
  }

  // dispatchs an action to load the data
  componentDidMount () {
    this.props.actions.loadData()
  }

  // when props received from the store, updates state.
  componentWillReceiveProps (nextProps) {
    const data = nextProps.main.data
    this.setState({data})
  }
  handleSubmit=(formValues) => {
    debugger//eslint-disable-line
    this.props.actions.add(formValues)
  }
  render () {
    return (
      <div >
        <Form handleSubmit={this.handleSubmit} />
        <List data={this.props.main.data} />
      </div>
    )
  }
}
// propTypes provides documentation of the props in each component.
Main.propTypes = {
  actions: PropTypes.object.isRequired,
  main: PropTypes.object.isRequired

}

export default Main
