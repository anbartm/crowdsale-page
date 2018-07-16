/*
 * Countdown timer component
 */
import React, { Component } from 'react'
import classNames from 'classnames'
import moment from 'moment'

export default class Countdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      days: '',
      hour: '',
      minutes: '',
      seconds: '',
      zero: false,
    }
    this.countdown = this.countdown.bind(this)
  }

  componentWillMount() {
    this.countdown()
  }

  componentDidMount() {
    this.interval = setInterval(this.countdown, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  countdown() {
    let currentTime = moment()
    let event = moment(this.props.event)

    let diffTime = event.diff(currentTime)
    let duration = moment.duration(diffTime)

    if (diffTime > 0) {
      this.setState({
        days: duration.get('days'),
        hours: duration.get('hours'),
        minutes: duration.get('minutes'),
        seconds: duration.get('seconds'),
        zero: false,
      })
    } else if (this.props.event) {
      this.setState({ zero: true })
    }
  }

  render() {
    const { className } = this.props
    const { days, hours, minutes, seconds } = this.state

    if (this.state.zero) {
      return <h6 className="sub-header text-center">Any moment...</h6>
    }
    return (
      <div className={classNames('time-container', className)}>
        <div className={`time`}>
          <span className="time-h">{days}</span>
          <small>DAYS</small>
        </div>
        <div className={`time`}>
          <span className="time-h">{hours}</span>
          <small>HOURS</small>
        </div>
        <div className={`time`}>
          <span className="time-h">{minutes}</span>
          <small>MINUTES</small>
        </div>
        <div className={`time`}>
          <span className="time-h">{seconds}</span>
          <small>SECONDS</small>
        </div>
      </div>
    )
  }
}
