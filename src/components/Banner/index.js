import React, { Component } from 'react'
import classNames from 'classnames'
import Countdown from 'components/Countdown'
import Slider from 'components/Slider'
import { Loader } from 'components/Loader'
import cofabLogo from 'img/cofab.svg'
import ethLogo from 'img/ethereum-logo.png'
import crowdsale from 'crowdsale'

const max = crowdsale.caps.max

export default class Banner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sliderVal: 0, // only used for testing purposes
    }
    this.renderBefore = this.renderBefore.bind(this)
    this.renderCrowdsale = this.renderCrowdsale.bind(this)
    this.renderSuccess = this.renderSuccess.bind(this)
    this.renderGameOver = this.renderGameOver.bind(this)
  }

  /*
   * Render a countdown timer before crowdsale
   */
  renderBefore() {
    const { openModal, lastBlock, loading } = this.props
    const { time, block } = this.props.phases
    let toBlock = block - lastBlock

    return (
      <div>
        <div className="row text-center">
          <div className="next-phase white">
            Pre-sale starts in{' '}
            <span
              className={classNames('to-block', {
                'loading-pulse': loading > 0,
              })}
            >
              {(toBlock >= 0 && toBlock) || 0}
            </span>{' '}
            blocks, about:
          </div>
        </div>
        <hr className="phase-hr phase-hr-h" />
        <div className="row text-center">
          <Countdown event={time} actions={this.props.actions} />
        </div>
        <hr className="phase-hr phase-hr-h" />
        <div className="row text-center">
          <button
            onClick={() => openModal()}
            id="contribute-button"
            className="btn wavves-effect waves-light light-blue"
          >
            PREPARE TO CONTRIBUTE
          </button>
        </div>
      </div>
    )
  }

  /*
   * Redner slider & eth contributed during a crowdsale
   */
  renderCrowdsale() {
    const { openModal, ethrPrice, loading, balance, phases } = this.props

    const { time, phase } = phases
    return (
      <div>
        <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12 text-center">
          {(balance !== undefined && (
            <Slider
              loading={loading}
              balance={balance}
              ethrPrice={ethrPrice}
              phase={phase}
              time={time}
            />
          )) || <Loader circle />}
        </div>
        <div className="col-md-6 col-md-offset-3 text-center">
          <button
            id="contribute-now-button"
            onClick={() => openModal()}
            className="btn wavves-effect waves-light light-blue contrib-button"
          >
            CONTRIBUTE NOW
          </button>
        </div>
      </div>
    )
  }

  /*
   * Render after a successfull crowdsale
   */
  renderSuccess() {
    let total = this.props.icoBalance + this.props.sigBalance
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="message-founded">
            <div className="message">The crowdsale has been fully funded!</div>

            <div className="main-info">
              <div className="amount-contributed">
                <div className="amount">
                  <span className="ethereum-logo">
                    <img src={ethLogo} alt="logo" />
                  </span>
                  <span className="exact-amount">{(total === max && max) || total}</span>
                  <span className="currency">ETH</span>
                </div>
                <div className="contributed-txt">contributed</div>
                <div className="tnx-txt">Thank you!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /*
   * Render after a crowdsale has finished & has not been successfully founded 
   */
  renderGameOver() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="message-founded">
            <div className="message not-founded">This project's funding goal was not reached.</div>
          </div>
        </div>
      </div>
    )
  }

  /*
   * Main render method
   */
  render() {
    const { phase } = this.props.phases
    const { icoBalance, sigBalance } = this.props
    const isSuccessful = icoBalance + sigBalance > crowdsale.caps.successCap

    // while loading data or if undefined show Loader
    if (phase === null || (icoBalance === undefined && sigBalance === undefined && phase !== 4)) {
      return (
        <div className={classNames('container-fluid banner')}>
          <Loader circle />
        </div>
      )
    }

    return (
      <div className={classNames('container-fluid banner')}>
        <div>
          <div className="row text-center">
            <img className="banner-logo" src={cofabLogo} alt="hero-logo" />
          </div>
          <br />
          <div className="row text-center">
            <p className="hero-text">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
            </p>
          </div>
        </div>

        {phase === 0 && this.renderBefore()}
        {(phase === 1 || phase === 2 || phase === 3) && this.renderCrowdsale()}
        {phase === 4 || (phase === 5 && isSuccessful && this.renderSuccess())}
        {phase === 5 && !isSuccessful && this.renderGameOver()}
      </div>
    )
  }
}
