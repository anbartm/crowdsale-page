import React, { Component } from 'react'

import TextInput from 'components/TextInput'

import logoMedium from 'img/logo-medium.svg'
import logoTwitter from 'img/logo-twitter.svg'
import logoFacebook from 'img/logo-facebook.svg'
import logoReddit from 'img/logo-reddit.svg'
import logoInstagram from 'img/logo-instagram.svg'
import logoTelegram from 'img/logo-telegram.svg'
import logoYoutube from 'img/logo-youtube.svg'

import crowdsale from 'crowdsale'

export default class Footer extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    if (this.props.form.emailForm) {
      let v = this.input && this.input.input.value // very ugly, because of uncontroled inputs
      this.props.actions.signUpMailingList(v)
    }
  }

  render() {
    const { form, actions } = this.props
    return (
      <footer className="page-footer light-grey">
        <div className="content">
          <div className="row">
            <div className="col-md-3 col-sm-6 footerlinks center">
              <div className="mid-grey-text footerlinks-_title">ABOUT US</div>
              <div className="footerlinks__divider"> </div>
              <ul>
                <li>
                  <a className="mid-grey-text footerlinks__link" href="/">
                    Your link
                  </a>
                </li>
                <li>
                  <a className="mid-grey-text footerlinks__link" href="/">
                    Another link
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6 footerlinks">
              <div className="mid-grey-text footerlinks__title">FOLLOW US</div>
              <div className="footerlinks__divider"> </div>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <img src={logoMedium} className="footerlinks__social" alt="Medium" />
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <img src={logoTwitter} className="footerlinks__social" alt="Twitter" />
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <img src={logoFacebook} className="footerlinks__social" alt="Facebook" />
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <img src={logoReddit} className="footerlinks__social" alt="Reddit" />
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <img src={logoInstagram} className="footerlinks__social" alt="Instagram" />
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <img
                  src={logoTelegram}
                  className="footerlinks__social light-blue-text"
                  alt="Telegram"
                />
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <img
                  src={logoYoutube}
                  className="footerlinks__social light-blue-text"
                  alt="Telegram"
                />
              </a>
            </div>

            <div className="col-md-6 col-sm-12 footerlinks">
              <div className="mid-grey-text footerlinks__title">SIGN UP FOR OUR NEWSLETTER</div>
              <div className="footerlinks__divider"> </div>
              <div className="row no-gutter footerlinks__inputcontainer">
                <form name="emailForm" onSubmit={e => this.handleSubmit(e)}>
                  <div className="input-field col-xs-8 col-sm-8 footerlinks__inputnest">
                    <TextInput
                      ref={email => (this.input = email)}
                      actions={actions}
                      form={form}
                      id="email"
                      type="email"
                      formName="emailForm"
                      className="validate footerlinks__input"
                      placeholder="Your e-mail address"
                      validate={['isEmail']}
                    />
                  </div>
                  <div className="col-xs-4 col-sm-4 footerlinks__buttoncontainer">
                    <button
                      className="btn waves-light light-blue footerlinks__button"
                      type="submit"
                      disabled={!form['emailForm']}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>

              <div className="mid-grey-text footerlinks__subtext">
                {this.props.message || "We respect your privacy. No spam, that's a promise!"}
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright light-grey">
          <div className="container">
            <div className="row footercopyright__content">
              <div className="col-sm-12">
                <div className="footercopyright__text mid-grey-text">
                  Crowdsale © 2018
                  <span style={{ opacity: 0 }}>v0.27</span>
                  <span id="hidden_address" style={{ display: 'none' }}>
                    {crowdsale.eth.ico}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
