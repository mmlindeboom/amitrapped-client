import { useState } from 'react'

export const Dropper = ({ root, input, active, children }) => {
  const [borderColor, setBorderColor] = useState('#ccc')
  return (
    <div  style={{border: `1px dashed ${borderColor}`, padding: 10}}
          onMouseOver={() => setBorderColor('blue')}
          onMouseOut={() => setBorderColor('#ccc')}
    {...root()}>
      {children}
      <input {...input()}></input>
      <p style={{marginTop: 10}}>{active ? 'Drop image here' : 'Drag or click here to upload new image'}</p>
    </div>
  )
}