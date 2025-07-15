import { useState } from "react";
import {
  initializeArray as initArray,
  insertElement as insertEl,
  deleteElement as deleteEl,
  accessElement as accessEl,
  updateElement as updateEl} from '../services/arrayService'

  const useArrayOperations = () => {
  const [array, setArray] = useState([])
  const [operationHistory, setOperationHistory] = useState([])
  const [currentOperation, setCurrentOperation] = useState(null)
  const [error, setError] = useState(null)

  const updateHistory = (message, type = 'INFO') => {
    setOperationHistory(prev => [
      { message, type, timestamp: new Date().toISOString() },
      ...prev.slice(0, 9)
    ])
  }

  const handleError = (errorMsg) => {
    setError(errorMsg)
    updateHistory(errorMsg, 'ERROR')
    setTimeout(() => setError(null), 3000)
  }

  const initializeArray = async (size) => {
    try {
      const response = await initArray(size)
      setArray(response.array)
      setCurrentOperation(response)
      updateHistory(response.message)
    } catch (err) {
      handleError(err.message)
    }
  }

  const insertElement = async (index, value) => {
    try {
      const response = await insertEl(index, value)
      setArray(response.array)
      setCurrentOperation(response)
      updateHistory(response.message)
    } catch (err) {
      handleError(err.message)
    }
  }

  const deleteElement = async (index) => {
    try {
      const response = await deleteEl(index)
      setArray(response.array)
      setCurrentOperation(response)
      updateHistory(response.message)
    } catch (err) {
      handleError(err.message)
    }
  }

  const accessElement = async (index) => {
    try {
      const response = await accessEl(index)
      setCurrentOperation(response)
      updateHistory(response.message)
    } catch (err) {
      handleError(err.message)
    }
  }

  const updateElement = async (index, value) => {
    try {
      const response = await updateEl(index, value)
      setArray(response.array)
      setCurrentOperation(response)
      updateHistory(response.message)
    } catch (err) {
      handleError(err.message)
    }
  }

  return {
    array,
    initializeArray,
    insertElement,
    deleteElement,
    accessElement,
    updateElement,
    operationHistory,
    currentOperation,
    error
  }
}

export default useArrayOperations
