import crowdsale from 'crowdsale'
import api from '../../api'
import { each } from 'lodash'

const NAMESPACE = 'PHASES/'

export const SET_ACTIVE_PHASE = NAMESPACE + 'SET_ACTIVE_PHASE'

export const END_CROWDSALE = NAMESPACE + 'END_CROWDSALE'

export const GET_AVERAGE_BLOCK_TIME = NAMESPACE + 'GET_AVERAGE_BLOCK_TIME'
export const GET_AVERAGE_BLOCK_TIME_REQUEST = NAMESPACE + 'GET_AVERAGE_BLOCK_TIME_REQUEST'
export const GET_AVERAGE_BLOCK_TIME_SUCCESS = NAMESPACE + 'GET_AVERAGE_BLOCK_TIME_SUCCESS'
export const GET_AVERAGE_BLOCK_TIME_FAILURE = NAMESPACE + 'GET_AVERAGE_BLOCK_TIME_FAILURE'

const b = crowdsale.blocks
const p = crowdsale.phases

const blocks = crowdsale.blocks

/*
 * Action that defines the current crowdsale phase, based on the current block
 */
export const activePhase = lastBlock => {
  let phase = null
  each(blocks, (value, key) => {
    if (value - lastBlock > 0) {
      phase = parseInt(key, 10)
      return false
    }
  })

  if (phase === null) {
    phase = 5
  }

  return {
    type: SET_ACTIVE_PHASE,
    phase: phase,
  }
}

/*
 * Action to end a crowdsale
 */
export const endCrowdsale = (phase = 4) => {
  return {
    type: END_CROWDSALE,
    payload: {
      phase: phase,
    },
  }
}

// not hooked function the get the average block time
export const getAverageBlockTime = () => {
  return {
    type: GET_AVERAGE_BLOCK_TIME,
    promise: api('GET', `https://etherchain.org/api/miningEstimator`),
  }
}

const initialState = {
  time: null, // active time
  phase: null, // active phase
  block: null,
  avgBlockTime: null,
}

export default function phases(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_PHASE:
      return {
        ...state,
        phase: action.phase,
        time: p[action.phase],
        block: b[action.phase],
      }

    case GET_AVERAGE_BLOCK_TIME_SUCCESS:
      return {
        ...state,
        avgBlockTime: action.req.data[0].blockTime,
      }

    case END_CROWDSALE:
      return {
        ...state,
        phase: action.payload.phase,
      }

    default:
      return state
  }
}
