import React, { Component } from 'react'
import classNames from 'classnames'
import { each, isEmpty } from 'lodash'

import { rules } from 'utils/validator.js'

export default class TextInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      dirty: false,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    const { validate, actions, form, formName, onChangeCall, onValidCall } = this.props

    /**
     * Ugly way to handle errors
     */
    let errors = [] // array to store errors

    // lowerCase everything
    value = value.toLowerCase()

    if (!this.state.dirty) {
      this.setState({ dirty: true })
    }

    // check each validation rule, from array validate
    each(validate, func => {
      if (rules[func](value)) {
        errors.push(rules[func](value))
        if (formName) {
          actions.validForm(formName, false)
        }
      }
    })

    // if input part of some form invalidate form by passed formName
    formName && actions.validForm(formName, isEmpty(errors))

    // if errors found, only display the first one
    if (!isEmpty(errors)) {
      this.setState({ error: errors[0] })

      // clear error state and call final function
    } else {
      this.setState({ error: null })

      /**
       * Async validation when typing, not waiting for the submit button
       */
      if (!form) {
        // async submit, no submit needed
        onChangeCall(value)
        onValidCall(value)
      }
    }
  }

  render() {
    const { id, type, className, defaultValue, placeholder, label } = this.props

    const { dirty, error } = this.state

    return (
      <div className="input-form">
        <label
          className={classNames('input-inst-mod', {
            valid: dirty && !error,
            invalid: dirty && error,
          })}
        >
          {label}
        </label>
        <input
          ref={id => (this.input = id)}
          name={id}
          id={id}
          type={type || 'text'}
          className={classNames(className, {
            valid: dirty && !error,
            invalid: dirty && error,
          })}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={() => this.handleChange(this.input.value)}
        />
        <span
          className={classNames('help-block', {
            valid: dirty && !error,
            invalid: dirty && error,
          })}
        >
          {this.state.error}
        </span>
      </div>
    )
  }
}
