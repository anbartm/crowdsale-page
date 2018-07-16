/*
 * Just a picture component
 */
import React from 'react'
import MaecenasInfographic from 'img/infographic.png'

export const Infographic = () => {
  return (
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col-xs-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
          <a
            href="https://medium.com/maecenas/we-raised-11m-in-the-pre-sale-10fadfc865ed"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="Infographic" style={{ width: '100%' }} src={MaecenasInfographic} />
          </a>
        </div>
      </div>
    </div>
  )
}
