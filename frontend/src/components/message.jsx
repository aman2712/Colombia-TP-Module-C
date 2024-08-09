import React from 'react'

const Message = ({type, text}) => {
  return (
    <p className={`${type === 'error' ? 'text-red-300' : 'text-green-400'}`}>{text}</p>
  )
}

export default Message
