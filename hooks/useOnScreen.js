import { useState, useEffect } from 'react'

export default function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    )

    observer.observe(ref.current)
    // Remove the observer as soon as the component is unmounted
    return () => {
      console.log('removing')
      observer.disconnect()
    }
  }, [])

  return isIntersecting
}
