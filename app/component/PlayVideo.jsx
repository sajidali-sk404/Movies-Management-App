"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";

export default function PlayVideo({ movieDetails }) {
  const [selectMovie, setSelectMovie] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleWatch = (movieDetails) => {
    setSelectMovie(movieDetails);
    setModalIsOpen(true);
  };

  const modalClose = () => {
    setModalIsOpen(false);
    setSelectMovie(null);
  };

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <div>
      {/* Watch Trailer Button */}
      <button
        onClick={() => handleWatch(movieDetails)}
        className="border-2 px-6 py-2 font-semibold rounded-lg my-2 bg-orange-500 hover:bg-orange-600 text-white shadow-md transition-all"
      >
        🎥 Watch Trailer
      </button>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={modalClose}
        contentLabel="Video Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 50,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            background: "transparent",
            border: "none",
            padding: 0,
            overflow: "hidden",
          },
        }}
      >
        {selectMovie && (
          <div className="relative flex flex-col items-center">
            {/* Close Button */}
            <button
              onClick={modalClose}
              className="absolute top-2 z-30 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white text-2xl"
            >
              <IoMdClose />
            </button>

            {/* Title */}
            <p className="absolute top-4 left-4 text-white font-semibold text-lg drop-shadow-lg">
              {selectMovie.trackName}
            </p>

            {/* Video Player */}
            <div className="w-[90vw] max-w-4xl aspect-video rounded-lg overflow-hidden bg-black">
              <ReactPlayer
                url={selectMovie.previewUrl}
                width="100%"
                height="100%"
                controls
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
