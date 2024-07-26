import { type MutableRefObject, useEffect, useMemo, useState } from 'react'

export function useIsInViewport(
  ref: MutableRefObject<HTMLDivElement | HTMLHeadingElement | null>
) {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false)

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting)
      ),
    []
  )

  useEffect(() => {
    if (!!!ref || !!!ref.current) return

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref, observer])

  return isIntersecting
}
