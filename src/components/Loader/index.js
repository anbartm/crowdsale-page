/*
 * Spinner, loader animation
 */
import React from 'react'
import classNames from 'classnames'

export const Loader = props => (
  <div
    className={classNames(
      { 'loader-circle': props.circle },
      { 'loader-lines': props.lines },
      { 'half full sexy': props.bar }
    )}
  />
)
