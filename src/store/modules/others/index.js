import api from '../../api'
import each from 'lodash/each'

const NAMESPACE = 'OTHER/'

const SIGN_UP_MAILING_LIST = NAMESPACE + 'SIGN_UP_MAILING_LIST'
const SIGN_UP_MAILING_LIST_SUCCESS = NAMESPACE + 'SIGN_UP_MAILING_LIST_SUCCESS'
const SIGN_UP_MAILING_LIST_FAILURE = NAMESPACE + 'SIGN_UP_MAILING_LIST_FAILURE'

const CHECK_WHITELIST = NAMESPACE + 'CHECK_WHITELIST'

/*
 * We used our API for this.
 * Was moved to constant only for easier usage.
 * Consider using an API to confirm the address, its easier to maintain.
 */
const whitelist = {
  '0x00009277775ac7d0d59eaad8fee3d10ac6c805e7': 35.6966691186334,
  '0x0004409bd35a28bd6e3a31bc184933a1726e980a': 71.4290230074958,
  '0x0007773f6717028699111675a90143a731a5454c': 27.0343479349686,
  '0x0008d343091ef8bd3efa730f6aae5a26a285c7a1': 8.92416727965836,
  '0x000abf987d6d132cd1477b2c9f1fca2ffc0a4373': 18.3309893759654,
  '0x000ba5c6406f75ef15380e06ed7c2666da93d812': 35.6966691186334,
  '0x000d19e404036317a5be45c7ad4a56d81c8e56f1': 24.7204918067063,
  '0x000ea6df3b680cb96f66a42041235d1ed776ef4e': 166.8773791419,
}

/*
 * Signup on a MailChimp mailinglist
 */
export const signUpMailingList = address => {
  return {
    type: SIGN_UP_MAILING_LIST,
    promise: api('POST', `your_url`, [address]),
  }
}

/*
 * Check whitelist endpoint
 */
export const checkWhitelist = address => {
  let w = ''
  each(whitelist, (value, key) => {
    if (key.toLowerCase() === address) {
      w = value
      return false // break out of each loop
    } else {
      w = false
    }
  })

  return {
    type: CHECK_WHITELIST,
    payload: w,
  }
}

const initialState = {
  message: '',
  whitelist: null,
  loading: 0,
}

export default function etherscan(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP_MAILING_LIST_SUCCESS:
      return {
        ...state,
        message: 'Thank you!',
      }

    case SIGN_UP_MAILING_LIST_FAILURE:
      return {
        ...state,
        message: 'Ups!',
      }

    case CHECK_WHITELIST:
      return {
        ...state,
        whitelist: action.payload,
      }

    case 'LOADER_REQUEST':
      return {
        ...state,
        loading: state.loading + 1,
      }

    case 'LOADER_REQUEST_FAILURE':
    case 'LOADER_REQUEST_SUCCESS':
      return {
        ...state,
        loading: state.loading - 1,
      }

    default:
      return state
  }
}
