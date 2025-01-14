'use client'
import PaginationControl from "./component/PaginationControl";
import { FaSearch } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useState } from 'react';





export default function Home() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const hnadleSubmit = (e) => {
   e.preventDefault();
   if(search){
     router.push(`/movies/search?query=${search}`)
   }
  }

  return (
    <div>
      <div className=" h-1/5   w-fit">
        <img className="opacity-90 h-80 object-cover   w-screen " src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        <div className="absolute top-60 left-96 max-sm:left-20">
          <form action="#" onSubmit={(e) => hnadleSubmit(e)}>
            <div className="search border-2 border-red-900 rounded-full bg-gray-900 opacity-90 relative text-gray-600 pr-4 max-sm:pr-2  focus-within:text-gray-400  ">
              <input className='px-6 max-lg:px-4 max-md:px-1 py-2   bg-gray-900 rounded-full rounded-r-none' type="search" value={search} placeholder='Search here' onChange={(e) => setSearch(e.target.value)} />
              <button className='pl-2' type="submit"><FaSearch /></button>
            </div>
          </form>
        </div>
      </div>
      <PaginationControl />
    </div>
  );
}
