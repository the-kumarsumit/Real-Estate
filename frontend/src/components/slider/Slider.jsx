import { useState } from "react";
import arrow from "/arrow.png"

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);

  const changeSlide = (direction) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };

  return (
    <div className="w-full h-[280px] sm:h-[350px] flex gap-5">
      {imageIndex !== null && (
        <div className="absolute w-full h-full top-0 left-0 bg-black flex justify-between items-center z-[9999] overflow-hidden">
          <div className="w-[20px] sm:w-[30px] flex-1 flex items-center justify-center" onClick={() => changeSlide("left")}>
            <img className="w-[50px]" src={arrow} alt="" />
          </div>
          <div className="flex-[10]">
            <img className="w-full h-full object-cover" src={images[imageIndex]} alt="" />
          </div>
          <div className="w-[20px] sm:w-[30px] flex-1 flex items-center justify-center" onClick={() => changeSlide("right")}>
            <img className="w-[50px] h-full object-cover rotate-180" src={arrow}  alt="" />
          </div>
          <div className="absolute top-0 right-0 text-white text-4xl font-bold p-[50px] cursor-pointer" onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}
      <div className="flex-[2] sm:flex-[3]">
        <img className="w-full h-full object-cover rounded-[10px] cursor-pointer" src={images[0]} alt="" onClick={() => setImageIndex(0)} />
      </div>
      <div className="flex-1 flex flex-col justify-between gap-5">
        {images.slice(1).map((image, index) => (
          <img className="w-full h-[80px] sm:h-[100px] object-cover rounded-[10px] cursor-pointer"
            src={image}
            alt=""
            key={index}
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
