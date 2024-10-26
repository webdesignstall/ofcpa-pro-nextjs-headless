import React from 'react'

export default function Button({text}) {
  return (
    <button className='rounded-full px-12 py-4 bg-yellow-500 '>
        {text}
    </button>
  )
}
