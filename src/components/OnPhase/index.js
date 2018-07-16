/*
 * Display something on a certain phase conditional component
 */
import React from 'react'
import { includes } from 'lodash'

export const OnPhase = props => {
  if (includes(props.display, props.phase)) {
    return <div>{props.children}</div>
  } else {
    return null
  }
}
