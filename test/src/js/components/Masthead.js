import React from 'react'
import PropTypes from 'prop-types'

class Masthead extends React.Component {
  static propTypes = {
  }

  state = {
  }

  componentDidMount () {
    console.log('Masthead: componentDidMount')
  }

  componentDidUpdate () {
    console.log('Masthead: componentDidUpdate')
  }

  render () {
    return (
      <div id='Masthead'>
        <h1>Masthead</h1>
      </div>
    )
  }
}

export default Masthead
