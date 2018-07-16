import React, { Component } from 'react'
import Tooltip from 'react-tooltip'
import classNames from 'classnames'
import moment from 'moment'
import Bar from 'components/Bar'
import Countdown from 'components/Countdown'
import { Loader } from 'components/Loader'
import iconQuestion from 'img/icon-quest.png'

import crowdsale from 'crowdsale'

export default class Phases extends Component {
  render() {
    const { lastBlock, actions, loading, balance } = this.props
    const { time, block, phase } = this.props.phases

    let toBlock = block - lastBlock

    if (balance === undefined) {
      return (
        <div className="container-fluid">
          <Loader circle />
        </div>
      )
    }

    return (
      <div className="container-fluid">
        <Bar loading={loading} />
        <div className="phase-item-container">
          <div
            className={classNames('phase-item text-center', {
              'past-phase': phase > 1,
            })}
          >
            <div className="phase-item-content">
              <h3 className={classNames(phase === 1 ? 'phase-header-active' : 'phase-header')}>
                {phase <= 1 && (
                  <img
                    data-tip={`Block ${crowdsale.blocks[0]} -  
                  ${moment(crowdsale.phases[0])
                    .utcOffset('+02:00')
                    .format('MMM D [approx.] h[:]mm a')} (CEST)`}
                    src={iconQuestion}
                    className="question-mark"
                    alt="question-mark"
                  />
                )}
                PHASE 1
              </h3>
              <p className="phase-text">Lorem ipsum dolor amet.</p>
              {phase === 1 && <div className="badge-active">ACTIVE NOW</div>}
            </div>
          </div>
          <div
            className={classNames('phase-item text-center', {
              'past-phase': phase > 2,
            })}
          >
            <div className="phase-item-content">
              <h3 className={classNames(phase === 2 ? 'phase-header-active' : 'phase-header')}>
                {phase <= 2 && (
                  <img
                    data-tip={`Block ${crowdsale.blocks[1]} -
              ${moment(crowdsale.phases[1])
                .utcOffset('+02:00')
                .format('MMM D [approx.] h[:]mm a')} (CEST)`}
                    src={iconQuestion}
                    className="question-mark"
                    alt="question-mark"
                  />
                )}
                PHASE 2
              </h3>
              <p className="phase-text">Lorem ipsum dolor amet.</p>
              {phase === 2 && <div className="badge-active">ACTIVE NOW</div>}
            </div>
          </div>
          <div
            className={classNames('phase-item text-center', {
              'past-phase': phase > 3,
            })}
          >
            <div className="phase-item-content">
              <h3 className={classNames(phase === 3 ? 'phase-header-active' : 'phase-header')}>
                {phase <= 3 && (
                  <img
                    data-tip={`Block ${crowdsale.blocks[2]} - 
              ${moment(crowdsale.phases[2])
                .utcOffset('+02:00')
                .format('MMM D [approx.] h[:]mm a')} (CEST)`}
                    src={iconQuestion}
                    className="question-mark"
                    alt="question-mark"
                  />
                )}
                PHASE 3
              </h3>
              <p className="phase-text">Public crowdsale, unlimited contributions.</p>
              {phase === 3 && <div className="badge-active">ACTIVE NOW</div>}
            </div>
          </div>
        </div>

        {phase !== 4 &&
        phase !== 5 && ( // hide counter to next phase for phase 3
            <div className="row text-center">
              <hr className="phase-hr" />
              {phase !== 3 && (
                <div className="next-phase">
                  <br />
                  <Tooltip />
                  <img
                    data-tip={`Block ${block} - ${moment(time)
                      .utcOffset('+02:00')
                      .format('MMM D [approx.] h[:]mm a')} (CEST)`}
                    src={iconQuestion}
                    className="question-mark"
                    alt="question-mark"
                  />
                  Current block{' '}
                  <span
                    className={classNames('last-block', {
                      'loading-pulse': loading > 0,
                    })}
                  >
                    {lastBlock || '...'}{' '}
                  </span>
                  next phase starts in{' '}
                  <span
                    className={classNames('to-block', {
                      'loading-pulse': loading > 0,
                    })}
                  >
                    {(toBlock >= 0 && toBlock) || '...'}
                  </span>{' '}
                  blocks, about:<br />
                </div>
              )}

              {phase === 3 && (
                <div className="next-phase">
                  <div className="next-phase">
                    <br />
                    <Tooltip />
                    <img
                      data-tip={`Block ${block} - ${moment(time).format(
                        'MMM D [approx.] h[:]mm a'
                      )} (CEST)`}
                      src={iconQuestion}
                      className="question-mark"
                      alt="question-mark"
                    />
                    Current block{' '}
                    <span
                      className={classNames('last-block', {
                        'loading-pulse': loading > 0,
                      })}
                    >
                      {lastBlock || '...'}{' '}
                    </span>
                    crowdsale ends in{' '}
                    <span
                      className={classNames('to-block', {
                        'loading-pulse': loading > 0,
                      })}
                    >
                      {(toBlock >= 0 && toBlock) || '...'}
                    </span>{' '}
                    blocks, about:<br />
                  </div>
                </div>
              )}
              <div className="time-container">
                <div className="time-part">
                  <Countdown actions={actions} event={time} className="dark small" />
                </div>
              </div>
            </div>
          )}
      </div>
    )
  }
}
