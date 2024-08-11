'use client';
import { motion } from 'framer-motion'
import React from 'react'

const Sponsors = ({children}) => {
    const MarqueeAnimation = {
        x: ['0%', '-100%'],
        transition: {
          duration: 10,
          repeat: Infinity,
          
          ease: 'linear'
        }
    }
  return (
    <div className='flex flex-shrink-0 flex-grow-0 basis-auto overflow-x-hidden w-100%'>
       <motion.div animate={MarqueeAnimation} 
        className='flex flex-shrink-0 flex-grow-0 basis-auto  min-w-min'>
       {children}
       </motion.div>
       <motion.div animate={MarqueeAnimation} className='flex flex-shrink-0 flex-grow-0 basis-auto  min-w-min'>
       {children}
       </motion.div>
    </div>
  )
}
 
export default Sponsors