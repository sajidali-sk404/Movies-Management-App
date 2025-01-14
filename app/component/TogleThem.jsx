'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { IoMoon, IoSunny } from "react-icons/io5";
export default function TogleThem() {
    const [DarkMode, setDarkMode] = useState(false);

    useEffect(() => {
      const theme = localStorage.getItem("theme")
      if(theme === "dark") setDarkMode(true)
    }, [])

    useEffect(() => {
      if(DarkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme","dark")
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme","light")
      }
    }, [DarkMode])

  const handleDarkMode = () => {
      setDarkMode(!DarkMode);
  }

  return (
    <div>
        <button className='absolute text-white  top-4 p-2 right-16 border-2  rounded-full max-lg:right-10  max-sm:right-2 max-sm:top-3'
       onClick={() => handleDarkMode()} >
                {

                    DarkMode && <IoSunny /> // render sunny when dark is true
                }
                {
                    !DarkMode && <IoMoon /> // render moon when dark is false
                }
                
            </button>
      
    </div>
  )
}
