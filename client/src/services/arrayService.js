const API_URL = 'http://localhost:8080/api/array'

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Operation failed')
  }
  return response.json()
}

export const initializeArray = async (size) => {
  const response = await fetch(`${API_URL}/init/${size}`, {
    method: 'POST',
    credentials: 'include'
  })
  return handleResponse(response)
}

export const insertElement = async (index, value) => {
  const response = await fetch(`${API_URL}/insert?index=${index}&value=${value}`, {
    method: 'POST',
    credentials: 'include'
  })
  return handleResponse(response)
}

export const deleteElement = async (index) => {
  const response = await fetch(`${API_URL}/delete/${index}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  return handleResponse(response)
}

export const accessElement = async (index) => {
  const response = await fetch(`${API_URL}/access/${index}`, {
    method: 'GET',
    credentials: 'include'
  })
  return handleResponse(response)
}

export const updateElement = async (index, value) => {
  const response = await fetch(`${API_URL}/update?index=${index}&value=${value}`, {
    method: 'PUT',
    credentials: 'include'
  })
  return handleResponse(response)
}