/*
 * Pop-up modal component, with 3 steps
 * Step 1: Terms of Use
 * Step 2: Wallet whitelist check
 * Step 3: Contribute address
 */

import React, { Component } from 'react'
import ReactModal from 'react-modal'
import ReactBlockies from 'react-blockies'
import classNames from 'classnames'
import CopyToClipboard from 'react-copy-to-clipboard'

import crowdsale from 'crowdsale'

import { OnPhase } from 'components/OnPhase'
import Warning from 'components/Warning'
import TextInput from 'components/TextInput'
import iconCopy from 'img/copy.png'

const ico = crowdsale.eth.ico

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkbox1: false,
      checkbox2: false,
      step: 1,
      numOfSteps: 3, // remove this
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.phases.phase !== this.props.phases.phase) {
      if (
        this.props.phases.phase === 0 ||
        this.props.phases.phase === 1 ||
        this.props.phases.phase === 2
      ) {
        this.setState({ numOfSteps: 3 })
      } else {
        this.setState({
          numOfSteps: 2,
          step: (this.state.checkbox1 && this.state.checkbox2 && 2) || 1,
        })
      }
    }
  }

  render() {
    const { isOpen, onRequestClose, walletAddress, actions, whitelist, phases } = this.props
    const { checkbox1, checkbox2, step, numOfSteps } = this.state

    if (phases.phase === null || phases.phase === undefined) return null

    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Modal"
        className={{
          base: 'cf-modal',
          afterOpen: 'myClass_after-open',
          beforeClose: 'myClass_before-close',
        }}
        overlayClassName={{
          base: 'cf-modal-overlay',
          afterOpen: 'myOverlayClass_after-open',
          beforeClose: 'myOverlayClass_before-close',
        }}
      >
        <div className="modal-header">
          <div className="row">
            <div
              className={classNames(
                { 'col-md-4': numOfSteps === 3 },
                { 'col-md-6': numOfSteps === 2 },
                'text-center first-h'
              )}
            >
              <h3 className={classNames('mod-header', { active: step === 1 })}>
                <span>1</span>TERMS OF USE
              </h3>
            </div>
            <OnPhase phase={phases.phase} display={[0, 1, 2]}>
              <div className="col-md-4 text-center second-h">
                <h3 className={classNames('mod-header', { active: step === 2 })}>
                  <span>2</span>CHECK YOUR WALLET
                </h3>
              </div>
            </OnPhase>
            <div
              className={classNames(
                { 'col-md-4': numOfSteps === 3 },
                { 'col-md-6': numOfSteps === 2 },
                'text-center third-h'
              )}
            >
              <h3
                className={classNames('mod-header', {
                  active: step === 3 || (numOfSteps === 2 && step === 2),
                })}
              >
                <span>{numOfSteps}</span>CONTRIBUTE
              </h3>
            </div>
          </div>
        </div>

        {/* 
           * Step 1 
           */
        step === 1 && (
          <div className="modal-body step step-1">
            <div className="row text-center">
              <p className="modal-p">
                Please take a minute to review the{' '}
                <a target="_blank" rel="noopener noreferrer" href="/">
                  crowdsale contribution terms.
                </a>
              </p>
            </div>
            <div className="row text-center">
              <p className="modal-p-b">To continue, please confirm the following:</p>
            </div>
            <div className="row text-left cbox">
              <div className="checkbox control-group">
                <label className="control control-checkbox">
                  <input
                    type="checkbox"
                    value=""
                    checked={this.state.checkbox1}
                    onChange={() => this.setState({ checkbox1: !this.state.checkbox1 })}
                  />
                  <div className="control_indicator" />
                  <span style={{ marginLeft: 6 }}>
                    I have read and agree with the crowdsale contribution terms.
                  </span>
                </label>
              </div>
              <div className="checkbox">
                <label className="control control-checkbox">
                  <input
                    type="checkbox"
                    value=""
                    checked={this.state.checkbox2}
                    onChange={() => this.setState({ checkbox2: !this.state.checkbox2 })}
                  />
                  <div className="control_indicator" />
                  <span style={{ marginLeft: 6 }}>
                    I confirm that I am not a citizen of US or China or signing on behalf of citizen
                    from US or China.
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* 
           * Step 2
           */
        step === 2 && (
          <OnPhase phase={phases.phase} display={[0, 1, 2]}>
            <div className="modal-body step step-2">
              <div className="mar-mod2">
                <div className="row text-left">
                  <p className="modal-p2">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    book.
                  </p>
                </div>
                <div className="row text-left">
                  <p className="modal-p2">
                    <span>To avoid uneccessary transaction fees</span>, paste the public address of
                    your ETH wallet below and <span>check if your wallet is whitelisted:</span>
                  </p>
                </div>
                <div className="row no-gutters">
                  {walletAddress &&
                    whitelist && (
                      <div className="col-12 text-center">
                        <span>
                          <OnPhase phase={phases.phase} display={[0, 1]}>
                            Your wallet is whitelisted, your contribution limit is:
                          </OnPhase>
                          <OnPhase phase={phases.phase} display={[2]}>
                            Your wallet is whitelisted.
                          </OnPhase>
                        </span>
                        <OnPhase phase={phases.phase} display={[0, 1]}>
                          <span className="eth-balance">{whitelist} ETH</span>
                        </OnPhase>
                        <br />
                      </div>
                    )}
                  <div className="col-1 col-sm-1 col-xs-12 text-center">
                    {walletAddress && <ReactBlockies seed={walletAddress.toLowerCase()} />}
                  </div>
                  <div className="col-11 col-sm-11 col-xs-12">
                    <TextInput
                      actions={actions}
                      id="eth-wallet"
                      className="input input-eth form-group"
                      label="Enter your ETH address below:"
                      onChangeCall={this.props.actions.singleAddressBalance}
                      onValidCall={actions.checkWhitelist}
                      defaultValue={walletAddress}
                      validate={['isAddress']}
                    />
                    {!whitelist && <Warning />}
                  </div>
                </div>
              </div>
            </div>
          </OnPhase>
        )}

        {step === numOfSteps && (
          <div className="modal-body step step-3">
            <div className="mar-mod2">
              {walletAddress &&
                whitelist && (
                  <div>
                    <div className="row text-center">
                      <p className="modal-p-wallet">{walletAddress}</p>
                      <br />
                      <span>
                        <OnPhase phase={phases.phase} display={[0, 1]}>
                          Your wallet is whitelisted, your contribution limit is:
                        </OnPhase>
                        <OnPhase phase={phases.phase} display={[2]}>
                          Your wallet is whitelisted.
                        </OnPhase>
                      </span>
                      <OnPhase phase={phases.phase} display={[0, 1]}>
                        <span className="eth-balance">{whitelist} ETH</span>
                      </OnPhase>
                    </div>
                  </div>
                )}
              <div className="row text-center">
                <div className="input-form mar-mod">
                  <h4>
                    Send contribution to this address:<br />
                    <small>Suggested Gas Limit: 400000</small>
                  </h4>
                  <ReactBlockies seed={ico} />
                  <br />
                  <span id="the_address" className="the_address">
                    {ico}
                  </span>
                  <CopyToClipboard text={ico} onCopy={() => this.setState({ copied: true })}>
                    <button
                      title="Copy address to clipboard"
                      type="button"
                      className="btn btn-default"
                    >
                      <img src={iconCopy} style={{ width: 24 }} alt="Copy address to clipboard" />
                    </button>
                  </CopyToClipboard>
                  <br />
                  {this.state.copied && (
                    <small className="clipboard-alert">Address copied to clipboard!</small>
                  )}
                  <p className="input-warning-mod danger text-center">
                    <span>NOTE:</span> DON’T make your contribution from an exchange wallet, even if
                    it’s whitelisted or you won’t receive your ART tokens.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="modal-footer">
          <div className="row text-center">
            {step === 1 && (
              <button
                id="button-modal-skip"
                disabled={!checkbox1 || !checkbox2}
                onClick={() => this.setState({ step: step + 1 })}
                className="step step-1 stepper btn wavves-effect waves-light light-blue step-button"
              >
                Continue
              </button>
            )}
            {step === 2 &&
              numOfSteps === 3 && (
                <button
                  id="button-modal-skip"
                  disabled={!checkbox1 || !checkbox2}
                  onClick={() => this.setState({ step: step + 1 })}
                  className="step step-1 stepper btn wavves-effect waves-light light-blue step-button"
                >
                  {(walletAddress && 'Continue') || 'Skip'}
                </button>
              )}
            {step === numOfSteps && (
              <button
                id="button-modal-done"
                onClick={() => onRequestClose()}
                className="step step-1 stepper btn wavves-effect waves-light light-blue step-button"
              >
                DONE
              </button>
            )}
          </div>
        </div>
      </ReactModal>
    )
  }
}
