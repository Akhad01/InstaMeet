import { useEffect, useState } from 'react'
import professions from '../mockData/professions.json'
import qualities from '../mockData/qualities.json'
import users from '../mockData/users.json'
import httpService from '../services/http.service'

const useMockData = () => {
  const statusConst = {
    idle: 'Not Started',
    pending: 'In Process',
    successed: 'Ready',
    error: 'Error occured',
  }

  const [error, setError] = useState(null)
  const [status, setStatus] = useState(statusConst.idle)
  const [progress, setProgress] = useState(0)
  const [count, setCount] = useState(0)

  const summuryCount = qualities.length + professions.length + users.length

  const incrementCount = () => {
    setCount((prevState) => prevState + 1)
  }

  const updateProgress = () => {
    const newProgress = Math.floor((count / summuryCount) * 100)

    if (count !== 0 && status === statusConst.idle) {
      setStatus(statusConst.pending)
    }

    if (progress < newProgress) {
      setProgress(() => newProgress)
    }

    if (newProgress === 100) {
      setStatus(statusConst.successed)
    }
  }

  useEffect(() => {
    updateProgress()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  async function initialize() {
    try {
      for (const prof of professions) {
        await httpService.put('profession/' + prof._id, prof)

        incrementCount()
      }

      for (const quality of qualities) {
        await httpService.put('quality/' + quality._id, quality)

        incrementCount()
      }

      for (const user of users) {
        await httpService.put('user/' + user._id, user)

        incrementCount()
      }
    } catch (error) {
      setError(error)
      setProgress(statusConst.error)
    }
  }

  return { error, initialize, count, progress, status }
}

export default useMockData
