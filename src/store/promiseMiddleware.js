export default function promiseMiddleware() {
  return next => action => {
    const { promise, type, ...rest } = action

    if (!promise) return next(action)

    const SUCCESS = type + '_SUCCESS'
    const REQUEST = type + '_REQUEST'
    const FAILURE = type + '_FAILURE'

    // progress bar middleware action
    next({ type: 'LOADER_REQUEST' })

    next({ ...rest, type: REQUEST })
    return promise
      .then(req => {
        next({ ...rest, req, type: SUCCESS })
        next({ type: 'LOADER_REQUEST_SUCCESS' })
        return true
      })
      .catch(error => {
        let failureAction = error => {
          next({ ...rest, error, type: FAILURE })
          next({ type: 'LOADER_REQUEST_FAILURE' })
          return false
        }

        if (typeof error.then === 'function') {
          error.then(error => failureAction(error))
        } else {
          return failureAction(error)
        }
      })
  }
}
