import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

// Svg Icon
import { NextSvg, PreSvg } from '../../assets/index'

const ProductView = ({ productImg, currentIndex, setCurrentIndex }) => {
  const [listImg, setListImg] = useState([])

  const handleChangeImg = (index) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    setListImg([...productImg])
  }, [productImg])

  useEffect(() => {
    const lastIndex = listImg.length - 1

    if (currentIndex < 0) {
      setCurrentIndex(lastIndex)
    }

    if (currentIndex > lastIndex) {
      setCurrentIndex(0)
    }
  }, [currentIndex, listImg])

  //console.log(productImg);

  return (
    <ViewContainer>
      <div className="inner-container">
        <div className="img-slider-box">
          {listImg &&
            listImg.map((img, index) => {
              let position = 'nextSlideV'

              if (currentIndex === index) {
                position = 'activeSlideV'
              }

              if (
                currentIndex === index - 1 ||
                (index === 0 && currentIndex === listImg.length - 1)
              ) {
                position = 'lastSlideV'
              }

              return (
                <SliderCard key={index} className={position}>
                  <img src={img} alt="banner-img" />
                </SliderCard>
              )
            })}
        </div>
        <div
          className="slider-btn pre-btn"
          onClick={(e) => {
            e.stopPropagation()
            setCurrentIndex(currentIndex - 1)
          }}
        >
          <img src={PreSvg} alt="pre-svg" />
        </div>
        <div
          className="slider-btn next-btn"
          onClick={(e) => {
            e.stopPropagation()
            setCurrentIndex(currentIndex + 1)
          }}
        >
          <img src={NextSvg} alt="next-svg" />
        </div>
      </div>
      {listImg && (
        <ThumbnailContainer onClick={(e) => e.stopPropagation()}>
          {listImg.map((thumb, index) => {
            return (
              <div
                onClick={() => handleChangeImg(index)}
                key={index}
                className={`thumb-card ${currentIndex === index && 'active'}`}
              >
                <img src={thumb} alt="thumbnails-img" />
              </div>
            )
          })}
        </ThumbnailContainer>
      )}
    </ViewContainer>
  )
}

const ViewContainer = styled.div`
  ${tw`
    relative
    w-full
  `}

  .inner-container {
    ${tw`
      relative
      w-full
    `}
    padding-top: 100%;

    .img-slider-box {
      ${tw`
        absolute
        top-0
        left-0
        w-full
        h-full
        rounded-xl
        overflow-hidden
      `}
    }

    .slider-btn {
      ${tw`
        absolute
        top-[50%]
        -translate-y-1/2
        p-3
        w-10
        h-10
        flex
        items-center
        justify-center
        bg-white
        border
        border-gray-400
        rounded-full
        shadow-md
        cursor-pointer
      `}

      .img {
        ${tw`
          w-full
          h-full
          pointer-events-none

          transition-all
          duration-200
          ease-in-out
        `}
      }

      :hover {
        img {
          filter: invert(46%) sepia(93%) saturate(2053%) hue-rotate(12deg)
            brightness(96%) contrast(102%);
        }
      }
    }

    .pre-btn {
      ${tw`
        left-0
        -translate-x-1/2
      `}
    }

    .next-btn {
      ${tw`
        right-0
        translate-x-1/2
      `}
    }
  }

  .activeSlideV {
    opacity: 1;
    transform: translateX(0);
  }

  .lastSlideV {
    opacity: 0;
    transform: translateX(-100%);
  }

  .nextSlideV {
    opacity: 0;
    transform: translateX(100%);
  }
`

const SliderCard = styled.div`
  ${tw`
    absolute
    top-0
    left-0
    flex
    items-start
    justify-center
    w-full
    h-full
    rounded-2xl
    overflow-hidden

    transition-all
    duration-200
    ease-in-out
  `}

  img {
    ${tw`
      h-full
      w-full
      object-cover

      transition
      duration-200
      ease-in-out
    `}
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }
`

const ThumbnailContainer = styled.div`
  ${tw`
    mt-6
    w-full
    grid
    grid-cols-4
    gap-5
  `}

  .thumb-card {
    ${tw`
      relative
      max-h-[4.5rem]
      max-w-[4.5rem]
      rounded-xl
      overflow-hidden
      cursor-pointer

      transition-all
      duration-200
      ease-in-out
    `}

    &:before {
      content: '';
      ${tw`
        absolute
        top-0
        left-0
        w-full
        h-full
        bg-white
        bg-opacity-0

        transition-all
        duration-200
        ease-in-out
      `}
    }

    img {
      ${tw`
        w-full
        h-full
        object-cover
      `}
    }

    :hover {
      &:before {
        ${tw`
          bg-opacity-40
        `}
      }
    }
  }

  .thumb-card.active {
    ${tw`
      border-[3px]
      border-yellow-600
    `}

    &:before {
      ${tw`
        bg-opacity-50
      `}
    }
  }
`

export default ProductView
