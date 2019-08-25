import { Motion, spring } from 'react-motion'

const toCSS = (y) => ({transform: `translateY(${y}px)`})

const Visible = ({show, children}) => {

  return (
    <Motion
      defaultStyle={{ opacity: show ? 1 : 0, y: 5}}
      style={{ opacity: spring(show ? 1 : 0, {stiffness: 140}), y: spring(0, {stiffness: 140})}}
    >
      {({opacity, y}) => {
        const transform = toCSS(y)
        return <div style={{
                  opacity: opacity,
                  ...transform}}>{children}</div>}}
    </Motion>

  )
}

export default Visible