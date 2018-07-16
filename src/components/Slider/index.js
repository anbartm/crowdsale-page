/*
 * Displays a minimal slider with the wallet value
 */
import React, { Component } from 'react'
import { values } from 'lodash'
import RSlider from 'rheostat'
import classNames from 'classnames'
import CountTo from 'react-count-to'

import crowdsale from 'crowdsale'

export default class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      offsetLeft: 0,
      reposition: false,
    }
    this.resize = this.resize.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)

    this.setState({
      offsetLeft: this.refs.slider.rheostat.children[1].offsetLeft,
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.balance !== this.props.balance && !this.state.reposition) {
      this.setState({ reposition: true })
    }

    if (prevState.reposition !== this.state.reposition) {
      this.setState({
        offsetLeft: this.refs.slider.rheostat.children[1].offsetLeft,
        reposition: false,
      })
    }
  }

  resize() {
    this.setState({ reposition: true })
  }

  render() {
    const { balance, ethrPrice, loading } = this.props
    const { caps } = crowdsale
    const { min, max, successCap, phaseOneCap, phaseTwoCap } = crowdsale.caps

    let sliderBalance = (balance >= max && max) || balance

    return (
      <div>
        <div
          ref="tooltip"
          className="tooltip-top"
          style={{ color: '#FFFFFF', marginLeft: this.state.offsetLeft - 116 }}
        >
          <p className="tooltip-p">Contributed so far:</p>
          <p className="tooltip-h">
            <CountTo
              className={classNames('counter-h', {
                'loading-pulse': loading > 0,
              })}
              to={balance}
              speed={1234}
            />{' '}
            ETH
          </p>
          <p className="tooltip-p">
            approx.{' '}
            {balance &&
              ethrPrice && (
                <span
                  className={classNames('last-block', {
                    'loading-pulse': loading > 0,
                  })}
                >
                  {Math.round(balance * ethrPrice).toLocaleString()}
                </span>
              )}{' '}
            $ @{' '}
            <span
              className={classNames('last-block', {
                'loading-pulse': loading > 0,
              })}
            >
              {ethrPrice}/ETH
            </span>
          </p>
          <br />
          <br />
        </div>
        <RSlider
          className={classNames(
            {
              maxedOut: balance >= max - 700, // double check this with different values or use different condition
            },
            { minimum: balance <= 1200 }
          )}
          ref="slider"
          disabled={true}
          withBars
          min={min}
          max={max}
          values={[sliderBalance]}
          pitPoints={values(caps)}
          pitComponent={function PitComponent({ style, children }) {
            return (
              <div
                className={classNames(
                  'pit-component',
                  { first: children === min },
                  {
                    middle: children === successCap || children === phaseOneCap,
                  },
                  { last: children === max }
                )}
                style={{
                  ...style, // obligatory, for pit position based on value
                }}
              >
                <span className="goals-p">
                  {children === min && 'START'}
                  {children === successCap && 'SUCCESS'}
                  {children === phaseOneCap && 'PHASE 1 CAP'}
                  {children === phaseTwoCap && 'PHASE 2 CAP'}
                  {children === max && 'HARD CAP'}
                </span>
                <br />
                <span className="goals-sum">{children} ETH</span>
              </div>
            )
          }}
        />
      </div>
    )
  }
}
