import fetch from 'isomorphic-fetch'

var headers = {
  // 'Content-Type': 'application/json'
}

export default function fetchAPI(method = 'POST', path = '', data) {
  let endpoint = `${path}`

  let request
  if (method === 'POST') {
    request = {
      method: method,
      body: JSON.stringify(data),
      headers: headers,
    }
  } else if (method === 'GET') {
    request = {
      method: method,
      headers: headers,
    }
  } else if (method === 'FILE') {
    request = {
      method: 'POST',
      body: data,
    }
  } else if (method === 'DELETE') {
    request = {
      method: 'DELETE',
      headers: headers,
    }
  }

  return fetch(endpoint, request).then(res => {
    return res.json()
  })
}
