import api from '../../api'
import crowdsale from 'crowdsale'

// Constants
const NAMESPACE = 'etherscan/'

const GET_ICO_BALANCE = NAMESPACE + 'GET_ICO_BALANCE'
// const GET_ICO_BALANCE_REQUEST = NAMESPACE + 'GET_ICO_BALANCE_REQUEST'
const GET_ICO_BALANCE_SUCCESS = NAMESPACE + 'GET_ICO_BALANCE_SUCCESS'
const GET_ICO_BALANCE_FAILURE = NAMESPACE + 'GET_ICO_BALANCE_FAILURE'

const GET_SIG_BALANCE = NAMESPACE + 'GET_SIG_BALANCE'
// const GET_SIG_BALANCE_REQUEST = NAMESPACE + 'GET_SIG_BALANCE_REQUEST'
const GET_SIG_BALANCE_SUCCESS = NAMESPACE + 'GET_SIG_BALANCE_SUCCESS'
const GET_SIG_BALANCE_FAILURE = NAMESPACE + 'GET_SIG_BALANCE_FAILURE'

const GET_SINGLE_ADDRESS_BALANCE = NAMESPACE + 'GET_SINGLE_ADDRESS_BALANCE'
// const GET_SINGLE_ADDRESS_BALANCE_REQUEST = NAMESPACE + 'GET_SINGLE_ADDRESS_BALANCE_REQUEST'
// const GET_SINGLE_ADDRESS_BALANCE_SUCCESS = NAMESPACE + 'GET_SINGLE_ADDRESS_BALANCE_SUCCESS'
// const GET_SINGLE_ADDRESS_BALANCE_FAILURE = NAMESPACE + 'GET_SINGLE_ADDRESS_BALANCE_FAILURE'

const GET_ETHER_LAST_PRICE = NAMESPACE + 'GET_ETHER_LAST_PRICE'
// const GET_ETHER_LAST_PRICE_REQUEST = NAMESPACE + 'GET_ETHER_LAST_PRICE_REQUEST'
const GET_ETHER_LAST_PRICE_SUCCESS = NAMESPACE + 'GET_ETHER_LAST_PRICE_SUCCESS'
const GET_ETHER_LAST_PRICE_FAILURE = NAMESPACE + 'GET_ETHER_LAST_PRICE_FAILURE'

const GET_MOST_RECENT_BLOCK = NAMESPACE + 'GET_MOST_RECENT_BLOCK'
// const GET_MOST_RECENT_BLOCK_REQUEST = NAMESPACE + 'GET_MOST_RECENT_BLOCK_REQUEST'
const GET_MOST_RECENT_BLOCK_SUCCESS = NAMESPACE + 'GET_MOST_RECENT_BLOCK_SUCCESS'
const GET_MOST_RECENT_BLOCK_FAILURE = NAMESPACE + 'GET_LIST_OF_BLOCKS_FAILURE'

const { etherscanApiKey, eth } = crowdsale

// Action creators
/*
 * Get main ico address balance from Etherscan
 */
export const getIcoBalance = () => {
  return {
    type: GET_ICO_BALANCE,
    promise: api(
      'GET',
      `https://api.etherscan.io/api?module=account&action=balance&address=${
        eth.ico
      }&tag=latest&apikey=${etherscanApiKey}`,
      {}
    ),
    payload: eth.ico,
  }
}

/*
 * For security purposes some ETH is transfered daily on a multisignature wallet.
 * The actions gets multisig balance from Etherscan
 */
export const getMultiSigBalance = () => {
  return {
    type: GET_SIG_BALANCE,
    promise: api(
      'GET',
      `https://api.etherscan.io/api?module=account&action=balance&address=${
        eth.sig
      }&tag=latest&apikey=${etherscanApiKey}`,
      {}
    ),
  }
}

/*
 * Get current ether price
 */
export const getEtherLastPrice = () => {
  return {
    type: GET_ETHER_LAST_PRICE,
    promise: api(
      'GET',
      `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${etherscanApiKey}`
    ),
  }
}

/*
 * Get the current block number
 */
export const getMostRecentBlock = () => {
  return {
    type: GET_MOST_RECENT_BLOCK,
    promise: api(
      'GET',
      `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${etherscanApiKey}`
    ),
  }
}

/*
 * Set wallet whitelist contribution limit in state
 */
export const singleAddressBalance = address => {
  return {
    type: GET_SINGLE_ADDRESS_BALANCE,
    payload: address,
  }
}

// Reducer initial state
const initialState = {
  init: 'test',
  wallet: '',
  ethrPrice: '',
  icoBalance: 0,
  sigBalance: 0,
}

// Reducers
export default function etherscan(state = initialState, action) {
  switch (action.type) {
    case GET_ICO_BALANCE_SUCCESS:
      let icoBalance = Math.round(parseInt(action.req.result, 10) / 1000000000000000000 * 100) / 100

      return {
        ...state,
        icoBalance: icoBalance,
        icoAddress: action.payload,
      }

    case GET_SIG_BALANCE_SUCCESS:
      let sigBalance = Math.round(parseInt(action.req.result, 10) / 1000000000000000000 * 100) / 100

      return {
        ...state,
        sigBalance: sigBalance,
      }

    case GET_SINGLE_ADDRESS_BALANCE:
      return {
        ...state,
        walletAddress: action.payload,
      }

    case GET_ETHER_LAST_PRICE_SUCCESS:
      return {
        ...state,
        ethrPrice: action.req.result.ethusd,
      }

    case GET_MOST_RECENT_BLOCK_SUCCESS:
      const lastBlock = parseInt(action.req.result, 16)
      return {
        ...state,
        lastBlock: lastBlock,
      }

    case GET_ICO_BALANCE_FAILURE:
    case GET_SIG_BALANCE_FAILURE:
    case GET_ETHER_LAST_PRICE_FAILURE:
    case GET_MOST_RECENT_BLOCK_FAILURE:
      return {
        ...state,
      }

    default:
      return state
  }
}
