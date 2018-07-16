/*
 * Main/root component 
 */
import React, { Component } from 'react'
import ReactGA from 'react-ga'

import TopNav from 'components/TopNav'
import Banner from 'components/Banner'
import Modal from 'components/Modal'
import Phases from 'components/Phases'
import Terms from 'components/Terms'
import Promo from 'components/Promo'
import LimitCheck from 'components/LimitCheck'
import SocialLinks from 'components/SocialLinks'
import Footer from 'components/Footer'
import { OnPhase } from 'components/OnPhase'
import { Infographic } from 'components/Infographic'

import crowdsale from 'crowdsale'

/* Initalize Google anayltics */
if (process.env.NODE_ENV !== 'development') {
  ReactGA.initialize(crowdsale.googleAnalyticsApiKey)
}

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.openModal = this.openModal.bind(this)
    this.state = {
      modalOpen: false,
      lock: false, // crowdsale end lock, when funds are transfered from the used wallets
    }
    this.logPageView = this.logPageView.bind(this)
    this.callEtherscan = this.callEtherscan.bind(this)
  }

  componentDidMount() {
    const { etherscan, actions } = this.props
    process.env.NODE_ENV !== 'development'
      ? this.logPageView()
      : console.log(`ENV ${process.env.NODE_ENV}, analytics turned off!`)

    this.callEtherscan() // call Etherscan for the first time

    if (!this.state.lock && etherscan.lastBlock) {
      actions.activePhase(etherscan.lastBlock) // set state active phase based on current block
    } else if (this.state.lock) {
      actions.endCrowdsale()
    }

    this.callEtherApi = setInterval(() => this.callEtherscan(), 10000)
  }

  componentDidUpdate(prevProps) {
    const { etherscan, actions, others } = this.props

    if (
      etherscan.lastBlock &&
      !this.state.lock &&
      prevProps.etherscan.lastBlock !== etherscan.lastBlock
    ) {
      // after getting the current block number from etherscan, set the App current phase
      actions.activePhase(etherscan.lastBlock)
    }

    if (
      !this.state.lock &&
      etherscan.sigBalance &&
      etherscan.icoBalance &&
      etherscan.sigBalance + etherscan.icoBalance === crowdsale.caps.max
    ) {
      this.setState({ lock: true })
      /* Force the crowdsale end in case the user app is opened in the browser and hardCap is reached */
      actions.endCrowdsale()
    }

    if (prevProps.etherscan.walletAddress !== etherscan.walletAddress) {
      ReactGA.event({
        category: 'User',
        action: 'Wallet check',
        label: `${etherscan.walletAddress} - ${(others.whitelist && 'valid') || 'invalid'}`,
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.callEtherApi)
  }

  callEtherscan() {
    if (this.props.phases.phase !== 4 && this.props.phases.phase !== 5) {
      this.props.actions.getIcoBalance()
      this.props.actions.getMultiSigBalance()
      this.props.actions.getMostRecentBlock()
      this.props.actions.getEtherLastPrice()
    }
  }

  logPageView() {
    ReactGA.set({ page: window.location.pathname + window.location.search })
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  openModal() {
    this.setState({ modalOpen: !this.state.modalOpen })
    ReactGA.event({
      category: 'User',
      action: 'Modal button clicked',
      label: `${this.props.etherscan.walletAddress || 'no wallet address yet'}`,
    })
  }

  render() {
    const { actions, form, others, etherscan, phases } = this.props

    const { ethrPrice, walletAddress, icoBalance, lastBlock, sigBalance } = etherscan

    return (
      <div className="row">
        <TopNav />
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.openModal}
          walletAddress={walletAddress}
          actions={this.props.actions}
          whitelist={others.whitelist}
          phases={phases}
        />
        <Banner
          actions={actions}
          openModal={() => this.openModal()}
          ethrPrice={ethrPrice}
          icoBalance={icoBalance}
          lastBlock={lastBlock}
          sigBalance={sigBalance}
          balance={icoBalance + sigBalance} // use balance sum everywhere
          phases={phases}
          loading={others.loading}
        />
        <Phases
          actions={actions}
          phases={phases}
          lastBlock={lastBlock}
          loading={others.loading}
          balance={icoBalance + sigBalance}
        />
        <Terms />
        <OnPhase phase={phases.phase} display={[0, 1, 2]}>
          <LimitCheck
            actions={actions}
            walletAddress={walletAddress}
            whitelist={others.whitelist}
            phases={phases}
          />
        </OnPhase>
        <OnPhase phase={phases.phase} display={[3, 4, 5]}>
          <Infographic />
        </OnPhase>
        <Promo />
        <SocialLinks />
        <Footer message={others.message} form={form} actions={this.props.actions} />
      </div>
    )
  }
}
