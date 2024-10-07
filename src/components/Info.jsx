import React from 'react'
import { Cup } from '../constants'

function Info() {
  return (
    <div className='flex w-[85%] m-auto  gap-4'>
      <img src={Cup} alt="" className='h-[29rem] m-9 animate-moveUpDown ' />
      <div className='flex flex-col gap-9'>
        <h1 className='font-bold text-7xl pt-12'>Our Expedition</h1>
        <p>
        <ul className="list-disc pl-5 space-y-2 text-gray-200">
  <li className="hover:text-white transition-colors duration-200">Stake N Seek fuses blockchain tech with real-world treasure hunts.</li>
  <li className="hover:text-white transition-colors duration-200">Players stake tokens to unlock location-based challenges, solve clues, and earn crypto rewards.</li>
  <li className="hover:text-white transition-colors duration-200">Users track progress as they explore new places.</li>
  <li className="hover:text-white transition-colors duration-200">Game creators can build custom challenges and monitor player activity in real-time, tracking clue completions.</li>
  <li className="hover:text-white transition-colors duration-200">The platform includes tools for game creation, live tracking, player progress, and personalized profiles.</li>
  <li className="hover:text-white transition-colors duration-200">It brings transparency and adventure to gaming through blockchain.</li>
</ul>        </p>
      </div>
    </div>
  )
}

export default Info
