import { useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ component: ComponentPortal, nameOfClass, ...rest }) => {
  const el = useMemo(() => document.createElement('div'), [])
  el.setAttribute('class', nameOfClass)
  useEffect(() => {
    document.body.appendChild(el)
    return () => {
      document.body.removeChild(el)
    }
  }, [el])
  return createPortal(<ComponentPortal {...rest} />, el)
}

export default Portal
