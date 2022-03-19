import React, { useRef, useEffect } from 'react'

export const useInterval = (callback, delay) => {
    const savedCallback = useRef()
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback
    }, [callback])
  
    // Set up the interval.
    useEffect(() => {
      if (delay !== null) {
        let id = setInterval(() => {
          savedCallback.current()
        }, delay)
        return () => clearInterval(id)
      }
    }, [delay])
}
