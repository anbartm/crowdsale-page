/*
 * Limit check component used on the 2. step in the modal window
 */
import React, { Component } from 'react'
import TextInput from 'components/TextInput'
import ReactBlockies from 'react-blockies'
import Warning from 'components/Warning'
import { OnPhase } from 'components/OnPhase'

export default class LimitCheck extends Component {
  render() {
    const { walletAddress, actions, whitelist, phases } = this.props
    return (
      <div id="limit-check" className="container-fluid limit-check">
        <div className="content">
          <div className="row">
            <h3 className="main-header">CHECK YOUR WALLET</h3>
          </div>
          <div className="row text-center">
            <div className="col-12">
              {walletAddress &&
                whitelist && (
                  <div>
                    <span>
                      <OnPhase phase={phases.phase} display={[0, 1]}>
                        Your wallet is whitelisted, your contribution limit is:
                      </OnPhase>
                      <OnPhase phase={phases.phase} display={[2]}>
                        Your wallet is whitelisted.
                      </OnPhase>
                    </span>
                    <OnPhase phase={phases.phase} display={[0, 1]}>
                      <span
                        style={{
                          display: 'inline-block',
                        }}
                      >
                        <ReactBlockies seed={walletAddress} />
                      </span>
                      <span className="eth-balance">{whitelist} ETH</span>
                    </OnPhase>
                    <br />
                  </div>
                )}
            </div>
            <div className="col-sm-6 col-sm-offset-3 col-xs-12">
              <TextInput
                id="limit-check"
                onChangeCall={actions.singleAddressBalance}
                onValidCall={actions.checkWhitelist} // not the nicest thing but it works
                label="Enter your ETH wallet address below"
                defaultValue={walletAddress}
                placeholder="Enter your ETH address"
                className="input input-eth"
                validate={['isAddress']}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3 col-xs-12">
              {walletAddress && whitelist === false && <Warning />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
