import React from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { AlignJustify } from 'lucide-react';
import { X } from 'lucide-react';

const App = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <>
      <button onClick={toggleDrawer}>
        <AlignJustify />
      </button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='right'
        className='bla bla bla '
      >
        <button onClick={()=>setIsOpen(false)} className='absolute top-4 right-5'>
          <X  size={30}/>
        </button>
        <div className='pt-14'>
          <div className='text-xl px-6 py-3'>Home</div>
          <div className='text-xl px-6 py-3'>What We Do</div>
          <div className='text-xl px-6 py-3'>Testimonials</div>
          <div className='text-xl px-6 py-3'>Packages</div>
          <div className='text-xl px-6 py-3'>Blog and Articles</div>
        </div>
      </Drawer>
    </>
  )
}

export default App