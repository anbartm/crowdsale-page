import React, { Component } from 'react'
import moment from 'moment'

import iconError from 'img/icon-error.png'
import crowdsale from 'crowdsale'

export default class Warning extends Component {
  render() {
    return (
      <p className="input-warning-mod">
        <img alt="Not whitelisted" width="16" src={iconError} />
        {`This wallet is NOT whitelisted and your contribution will be
                    rejected. Please wait until public crowdsale begins on 
                    ${moment(crowdsale.phases[2])
                      .utcOffset('+02:00')
                      .format('MMM D [around] h[:]mm a')} (CEST)`}
      </p>
    )
  }
}
