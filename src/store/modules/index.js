import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import etherscan from './etherscan'
import form from './form'
import others from './others'
import phases from './phases'

export default combineReducers({
  routing: routerReducer,
  etherscan: etherscan,
  form: form,
  others: others,
  phases: phases,
})
