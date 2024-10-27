import React from 'react'

export default function Button({text}) {
  return (
    <button className='rounded-full px-12 py-4 bg-yellow-500 text-white font-medium hover:scale-110 duration-200'>
        {text}
    </button>
  )
}
