/*
 * Term and conditions component.
 * Displays crowdsale phase dates.
 */
import React, { Component } from 'react'
import moment from 'moment'
import crowdsale from 'crowdsale'

export default class Terms extends Component {
  render() {
    return (
      <div className="container-fluid grey">
        <div className="content">
          <div className="row">
            <h3 className="main-header">CROWDSALE TERMS</h3>
          </div>
          <div className="row">
            <div className="col-md-3 col-sm-12 col-xs-12">
              <div className="term">
                <h5 className="sub-header">CROWDSALE TIMELINE</h5>
                <div className="row">
                  <p className="std std-b">
                    Phase 1
                    {` [${moment(crowdsale.phases[0])
                      .utcOffset('+02:00')
                      .format('MMM D [@] h a')} CEST]`}
                  </p>
                  <p className="std">
                    Your company community and members, contributions are limited.
                  </p>
                </div>
                <div className="row">
                  <p className="std std-b">
                    Phase 2{' '}
                    {` [${moment(crowdsale.phases[1])
                      .utcOffset('+02:00')
                      .format('MMM D [@] h a')} CEST]`}
                  </p>
                  <p className="std">
                    Your company community and members, contributions are unlimited.{' '}
                  </p>
                </div>
                <div className="row">
                  <p className="std std-b">
                    Phase 3{' '}
                    {` [${moment(crowdsale.phases[2])
                      .utcOffset('+02:00')
                      .format('MMM D [@] h a')} CEST]`}
                  </p>
                  <p className="std">Public crowdsale, unlimited contributions.</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-12 col-xs-12">
              <div className="row">
                <h5 className="sub-header">DISTRIBUTION</h5>
                <p className="std-s">
                  <span className="std-b">Crowdsale end: </span>4 weeks (Oct 5) after public
                  crowdsale or when the hard cap is reached.
                </p>
                <p className="std-s">
                  <span className="std-b">Token distribution:</span> immediately after contribution.<br />
                </p>
                <p className="std-s">
                  <a target="_blank" rel="noopener noreferrer" href="/">
                    Token address info
                  </a>
                </p>
                <p className="std-s">
                  <span className="std-b">Token lock period: </span>Oct 10 at the latest.<br />
                </p>
              </div>
            </div>
            <div className="col-md-3 col-sm-12 col-xs-12">
              <div className="term offering">
                <div className="row">
                  <h5 className="sub-header">AVAILABLE SUPPLY</h5>
                </div>
                <div className="row">
                  <p className="std">
                    <span className="std-b">Success threshold:</span> 9,375 ETH<br />
                    (approx. $3M)
                  </p>
                </div>
                <div className="row">
                  <p className="std">
                    <span className="std-b">Phase 1 cap:</span> 50% of hard cap
                  </p>
                </div>
                <div className="row">
                  <p className="std">
                    <span className="std-b">Phase 2 cap:</span> 50% of hard cap
                  </p>
                </div>
                <div className="row">
                  <p className="std">
                    <span className="std-b">Total cap:</span> 62,500 ETH (approx. $20M)
                  </p>
                </div>
                <div className="row">
                  <p className="std">
                    <span className="std-b">Total number of COINS tokens issued:</span> 100M
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-12 col-xs-12">
              <div className="term">
                <div className="row">
                  <h5 className="sub-header">PRICING MECHANISM</h5>
                </div>
                <div className="row">
                  <p className="std">
                    <b>30% of COINS tokens</b> (30M) sold in crowdsale.
                  </p>
                </div>
                <div className="row">
                  <p className="std">
                    <b>COINS token price:</b> 1 ETH = 480 COINS
                  </p>
                </div>
                <div className="row">
                  <p className="std">
                    <a target="_blank" rel="noopener noreferrer" href="/">
                      More crowdsale details
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
