'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import ReactPlayer from 'react-player';
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";

export default function PlayVideo({movieDetails}) {
    const [Selectmovie , setSelectmovie] = useState(null);
    const [modalIsOpen, setmodalIsOpen] = useState(false);
    

  const handleWacth = (movieDetails) => {
    setSelectmovie(movieDetails)
    setmodalIsOpen(true)
  }

  const modalClose = () => {
    setmodalIsOpen(false)
    setSelectmovie(null)
  }

    useEffect(() => {
        Modal.setAppElement('body');
    }, [])


  return (
    <div>
        <button className='border-2 p-2 px-10 font-serif font-bold my-2 bg-[#fd7e14] hover:bg-[#e8590c] ' onClick={() => handleWacth(movieDetails)}>Wacth Trailer</button>
        <Modal
         isOpen={modalIsOpen}
         onRequestClose={modalClose}
         contentLabel="Video Modal"
         style={{
            overlay: {
                backgroundColor: " hidden ",
            },
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
              },
        }}
        >
        {Selectmovie &&
        <div>
            <div><button className='absolute right-0 top-0  text-2xl' onClick={modalClose}><IoMdClose /></button></div>
            <p className='absolute top-10 left-10 text-white'>{Selectmovie.trackName}</p>
            <ReactPlayer url={Selectmovie.previewUrl} 
            width='70vw'
            height='80vh'
            controls={true}
            className='bg-gray-800 overflow-hidden '
            />
        </div>
      }
      </Modal>
    </div>
  )
}
