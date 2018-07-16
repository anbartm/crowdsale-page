/*
 * Top navigation bar, logo and link
 */
import React, { PureComponent } from 'react'

export default class TopNav extends PureComponent {
  render() {
    return (
      <nav>
        <div className="nav-wrapper nav-container">
          <a id="logo-container" href="/" className="brand-logo">
            Crowdsale
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <a href="/">Link</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
