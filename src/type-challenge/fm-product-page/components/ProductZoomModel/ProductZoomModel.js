import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

import { NextSvg, PreSvg } from '../../assets/index'

const ProductZoomModel = ({
  productImg,
  currentIndex,
  setIsViewImg,
  setCurrentIndex,
}) => {
  const handleChangeImg = (e, index) => {
    e.stopPropagation()
    setCurrentIndex(index)
  }

  return (
    <ModelContainer onClick={() => setIsViewImg(false)}>
      <div className="view-container">
        <div className="img-control-box" onClick={(e) => e.stopPropagation()}>
          <TransformWrapper
            initialScale={1}
            maxScale={7}
            onClick={(e) => e.stopPropagation()}
          >
            <TransformComponent>
              <img src={productImg[currentIndex]} alt="test-img" />
            </TransformComponent>
          </TransformWrapper>
          <div
            className="slider-btn pre-btn"
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            <img src={PreSvg} alt="pre-svg" />
          </div>
          <div
            className="slider-btn next-btn"
            onClick={() => setCurrentIndex(currentIndex + 1)}
          >
            <img src={NextSvg} alt="next-svg" />
          </div>
        </div>
        <div>
          <ThumbnailContainer>
            {productImg &&
              productImg.map((thumb, index) => {
                return (
                  <div
                    onClick={(e) => handleChangeImg(e, index)}
                    key={index}
                    className={`thumb-card ${
                      currentIndex === index && 'active'
                    }`}
                  >
                    <img src={thumb} alt="thumbnails-img" />
                  </div>
                )
              })}
          </ThumbnailContainer>
        </div>
      </div>
    </ModelContainer>
  )
}

const ModelContainer = styled.div`
  ${tw`
    absolute
    top-0
    left-0
    flex
    items-center
    justify-center
    px-6
    w-full
    h-screen
    bg-black/90
    z-30
  `}

  .view-container {
    ${tw`
        relative
        flex
        flex-col
        items-center
        justify-center
        w-full
        max-w-md
    `}
  }

  .img-control-box {
    ${tw`
        relative
    `}

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

      &:hover {
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

export default ProductZoomModel
