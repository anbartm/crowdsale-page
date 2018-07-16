const NAMESPACE = 'FORM/'

const VALID_FORM = NAMESPACE + 'VALID_FORM'

/*
 * Action to validate form and prevent submit
 */
export function validForm(formName, isValid) {
  return {
    type: VALID_FORM,
    payload: {
      formName: formName,
      isValid: isValid,
    },
  }
}

const initialState = {}

export default function etherscan(state = initialState, action) {
  switch (action.type) {
    case VALID_FORM:
      return {
        ...state,
        [`${action.payload.formName}`]: action.payload.isValid,
      }

    default:
      return state
  }
}
