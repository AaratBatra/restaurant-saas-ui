import React from 'react'

const FieldItem = ({label, value}: {label: string; value: string, x?: any}) => {
  return (
    <div>
      <p className='text-sm'>{label}</p>
      <p className='text-base'>{value}</p>
    </div>
  )
}

export default FieldItem
