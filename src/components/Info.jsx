import React from 'react'
import { Cup } from '../constants'

function Info() {
  return (
    <div className='flex w-[85%] m-auto  gap-4'>
      <img src={Cup} alt="" className='h-[29rem] m-9 animate-moveUpDown ' />
      <div className='flex flex-col gap-9'>
        <h1 className='font-bold text-7xl pt-12'>Our Expedition</h1>
        <p>
        At Stake N Seek, we're on an ambitious journey to revolutionize gaming through the fusion of blockchain technology and real-world adventures. Our platform invites users to immerse themselves in interactive treasure hunts, where staking tokens unlocks challenges tied to physical locations. Players solve clues, earn crypto rewards, and track their progress as they explore new places. For game creators, our site offers the tools to build custom challenges, monitor player activity in real-time, and track how many clues have been solved. From game creation to live tracking, player progress, and personalized profiles, Stake N Seek is a comprehensive platform where gaming meets blockchain, bringing adventure and transparency to every step.
        </p>
      </div>
    </div>
  )
}

export default Info
