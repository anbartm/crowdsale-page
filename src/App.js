import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Main from 'components/Main/'

import {
  getIcoBalance,
  getMultiSigBalance,
  getEtherLastPrice,
  getMostRecentBlock,
  singleAddressBalance,
} from 'store/modules/etherscan'
import { validForm } from 'store/modules/form'
import { activePhase, endCrowdsale, getAverageBlockTime } from 'store/modules/phases'
import { signUpMailingList, checkWhitelist } from 'store/modules/others'

import './App.css'

class App extends Component {
  render() {
    return <Main {...this.props} />
  }
}

// Redux stuff
const mapStateToProps = state => {
  return {
    etherscan: state.etherscan,
    form: state.form,
    others: state.others,
    phases: state.phases,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getIcoBalance,
        getMultiSigBalance,
        getEtherLastPrice,
        getMostRecentBlock,
        singleAddressBalance,
        validForm,
        activePhase,
        endCrowdsale,
        getAverageBlockTime,
        signUpMailingList,
        checkWhitelist,
      },
      dispatch
    ),
  }
}

// Connect to redux store
export default connect(mapStateToProps, mapDispatchToProps)(App)
