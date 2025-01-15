
import Link from 'next/link'

import TogleThem from './TogleThem';



export default function Navbar() {
  
   
   
  return (
    <nav className='flex justify-between px-40 max-lg:px-20 max-md:px-14 max-sm:px-2 prefers-color-scheme items-center py-2  font-bold   bg-gray-900 max-sm:items-center
       text-white'>
      <Link href="/" className='text-3xl max-lg:text-2xl'>MovieNest</Link>
      <Link className='px-6 py-3 rounded-xl   max-sm:px-3 bg-[#111827] hover:bg-[#1d2a46] text-white border-2' href="/watchlist">WatchList</Link>
      <TogleThem />
    </nav>
  )
}
