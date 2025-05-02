'use client';

import Image from 'next/image';
import { useState } from 'react';

type ImageType = { imageUrl: string };

type Props = {
  images: ImageType[];
};

const ImgDisplay = ({ images }: Props) => {
  const [isImage, setIsImage] = useState(0);

  const handleClick = (index: number) => {
    setIsImage(index);
  };

  return (
    <div>
      <div className="event-imgs pt-3 xl:fixed xl:mt-3">
        <div className="event-imgs-1"></div>
        <div className="event-imgs-2 ">
          <Image
            src={images[isImage]?.imageUrl || '/imgs/placeholder.jpg'}
            alt="Hình ảnh sự kiện chính"
            width={800}
            height={400}
            className="w-[366px] object-cover  h-96 rounded-[4px] mx-auto "
          />
          <div className="flex justify-between pt-4 gap-2 md:justify-center md:gap-5">
            {images.map((img, index) => (
              <Image
                key={index}
                src={img.imageUrl}
                alt={`Hình ảnh sự kiện ${index + 1}`}
                width={100}
                height={100}
                className={`object-cover rounded-[4px] h-18 w-18 cursor-pointer ${
                  isImage === index ? 'border-2 border-blue-500' : ''
                }`}
                onClick={() => handleClick(index)}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImgDisplay;
