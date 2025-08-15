import React from 'react'

const Input = ({value,onChange,type,placeholder}) => {
  return (
    <input value={value} onChange={(e)=>onChange(e.target.value)} 
          type={type} placeholder={placeholder} />
  )
}

export default Input
