/**
 * A component that displays social links.
 * Expects an array @socials = [ { name, link }]
 */
import React, { Component } from 'react'

// images import
import logoTwitter from 'img/logo-twitter.svg'
import logoMedium from 'img/logo-medium.svg'
import logoInstagram from 'img/logo-instagram.svg'
import logoFacebook from 'img/logo-facebook.svg'
import logoYoutube from 'img/logo-youtube.svg'

export default class SocialLiks extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="content">
          <div className="row">
            <h3 className="main-header">CONNECT WITH YOUR COMPANY</h3>
          </div>
          <div className="row">
            <div className="col-lg-2 col-md-4 col-sm-4 col-xs-6 col-lg-offset-1">
              <div className="term">
                <div className="row text-center">
                  <a target="_blank" rel="noopener noreferrer" href="/">
                    <img src={logoTwitter} className="footer-logo" alt="logo-twitter" />
                    <p className="sub-header sub-header-f">TWITTER</p>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-4 col-xs-6">
              <div className="term">
                <div className="row text-center">
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    <img src={logoMedium} className="footer-logo" alt="logo-medium" />
                    <p className="sub-header sub-header-f">MEDIUM</p>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-4 col-xs-6">
              <div className="term">
                <div className="row text-center">
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    <img src={logoInstagram} className="footer-logo" alt="logo-telegram" />
                    <p className="sub-header sub-header-f">INSTAGRAM</p>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-4 col-xs-6">
              <div className="term">
                <div className="row text-center">
                  <a target="_blank" rel="noopener noreferrer" href="/">
                    <img src={logoFacebook} className="footer-logo" alt="logo-facebook" />
                    <p className="sub-header sub-header-f">FACEBOOK</p>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-4 col-xs-6">
              <div className="term">
                <div className="row text-center">
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    <img src={logoYoutube} className="footer-logo" alt="logo-instagram" />
                    <p className="sub-header sub-header-f">YOUTUBE</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
