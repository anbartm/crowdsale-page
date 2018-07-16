/*
 * Slim loading bar component between phases & slider component
 */
import React, { Component } from 'react'
import classNames from 'classnames'

export default class Bar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading && !this.state.loading) {
      this.setState({ loading: true })
    } else if (this.props.loading === 0 && this.state.loading) {
      // loading is so fast we have to make it look longer - delay
      setTimeout(
        function() {
          this.setState({ loading: false })
        }.bind(this),
        600
      )
    }
  }

  render() {
    return (
      <div className={classNames('half full sexy')}>
        <div className="border-overlay" />
        <div className="gradient-overlay" />
        <div className={classNames('bar', { loading: this.state.loading })} />
      </div>
    )
  }
}
