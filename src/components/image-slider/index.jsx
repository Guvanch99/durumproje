import { useState, memo } from 'react'

import { DATA } from '../../data'

import './index.scss'

const { images } = DATA

const ImageSlider = () => {
  const [current, setCurrent] = useState(0)
  const imageLength = images.length

  const nextImage = () =>
    setCurrent(current === imageLength - 1 ? 0 : current + 1)

  const prevImage = () =>
    setCurrent(current === 0 ? imageLength - 1 : current - 1)

  return (
    <div className="slider">
      {images.map(
        ({ url, text }, index) =>
          index === current && (
            <img
              loading="lazy"
              key={index}
              className="slider__image"
              src={url}
              alt={text}
            />
          )
      )}
      <i onClick={prevImage} className="fas fa-arrow-left arrow-left arrow" />
      <i onClick={nextImage} className="fas fa-arrow-right arrow-rigth arrow" />
    </div>
  )
}

export default memo(ImageSlider)
