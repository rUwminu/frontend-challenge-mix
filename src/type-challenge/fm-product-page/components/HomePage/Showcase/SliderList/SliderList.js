import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

import {
  Inspirate1,
  Inspirate2,
  Inspirate3,
  NextSvg,
} from '../../../../assets/index'

import checkCurrentSize from '../../../../utils/handleWindowsResize'

const SliderItem = [
  {
    id: 1,
    image: Inspirate1,
    title: 'Inner Peace',
    tag: 'Bed Room',
  },
  {
    id: 2,
    image: Inspirate2,
    title: 'Morden Space',
    tag: 'Living Room',
  },
  {
    id: 3,
    image: Inspirate3,
    title: 'Creative Corner',
    tag: 'Any Corner',
  },
  {
    id: 4,
    image: Inspirate2,
    title: 'Extra Space',
    tag: 'Smart Design',
  },
]

const SliderList = () => {
  const [isMobile, setIsMobile] = useState()
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleResize = () => {
    setIsMobile(checkCurrentSize())
    // if (window.innerWidth < 768) {
    //   setIsMobile(true);
    // } else {
    //   setIsMobile(false);
    // }
  }

  useEffect(() => {
    const lastIndex = SliderItem.length - 1

    if (currentIndex < 0) {
      setCurrentIndex(lastIndex)
    }

    if (currentIndex > lastIndex) {
      setCurrentIndex(0)
    }
  }, [currentIndex, SliderItem])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <SliderContainer move={isMobile ? 14.7 : 18} index={currentIndex}>
        <div className='slider-container'>
          {SliderItem &&
            SliderItem.map((item, index) => {
              const { id, image, title, tag } = item

              return (
                <SliderCard
                  className={`${currentIndex === index ? 'h-full' : 'h-[80%]'}`}
                >
                  <img
                    onClick={() => setCurrentIndex(index)}
                    src={image}
                    alt={title}
                  />
                  {currentIndex === index && (
                    <div className='tag-box'>
                      <h2>
                        0{index + 1} <span>---{tag}</span>
                      </h2>
                      <h1>{title}</h1>
                      <div
                        className='next-btn'
                        onClick={() => setCurrentIndex(currentIndex + 1)}
                      >
                        <img src={NextSvg} alt='next-svg' />
                      </div>
                    </div>
                  )}
                </SliderCard>
              )
            })}
          <div className='more-box'>
            <h1>
              Need More
              <br />
              Help?
            </h1>
            <p>Contact Us!</p>
          </div>
        </div>
        <div className='slider-dot-box'>
          {SliderItem &&
            SliderItem.map((item, index) => (
              <div
                onClick={() => setCurrentIndex(index)}
                key={item.id || index}
                className={`dot-item ${currentIndex === index && 'active'}`}
              >
                <div className={`dot-bg`} />
              </div>
            ))}
        </div>
      </SliderContainer>
    </>
  )
}

const SliderContainer = styled.div`
  ${tw`
    relative
    min-h-[70vh]
    md:min-h-[80vh]
    w-full
    md:w-[170%]
  `}

  clip-path: inset( -100vw -100vw -100vw 0 );

  .slider-container {
    ${tw`
      absolute
      top-0
      left-0
      w-full
      h-full
      flex
      flex-nowrap

      transition-all
      duration-500
      ease-in-out
    `}

    transform: ${(props) => {
      //   if (props.index === 0) return `translateX(0rem)`;

      //   if (props.index === 1) return `translateX(-18rem)`;

      //   if (props.index === 2) return `translateX(-36rem)`;

      //   if (props.index === 3) return `translateX(-54rem)`;

      return `translateX(-${props.move * props.index}rem)`
    }};

    .more-box {
      ${tw`
        hidden
        md:inline-block
        pt-14
        h-[80%]
        min-w-max
      `}

      h1 {
        ${tw`
            text-xl
            md:text-2xl
            font-semibold
        `}
      }

      p {
        ${tw`
            mt-2
            text-blue-600
            font-semibold
        `}
      }
    }
  }

  .slider-dot-box {
    ${tw`
        absolute 
        left-[18rem]   
        bottom-7    
        w-full
        flex
        items-center
        justify-start
      `}

    .dot-item {
      ${tw`
          mr-4
          w-6
          h-6
          p-[6px]
          border
          border-gray-400
          cursor-pointer

          rounded-full
        `}

      .dot-bg {
        ${tw`
            h-full
            w-full
            bg-gray-400
            rounded-full
          `}
      }
    }

    .dot-item.active {
      ${tw`
          border-yellow-500
        `}

      .dot-bg {
        ${tw`
            bg-yellow-500
          `}
      }
    }
  }
`

const SliderCard = styled.div`
  ${tw`
    relative
    mr-4
    w-[14rem]
    md:w-[17rem]
    md:max-w-[17rem]
    bg-red-100
    overflow-hidden
    cursor-pointer

    transition-all
    duration-200
    ease-in-out
  `}
  flex-shrink: 0;

  img {
    ${tw`
        w-full
        h-full
        object-cover

        transition-all
        duration-200
        ease-in-out
    `}
  }

  .tag-box {
    ${tw`  
        relative
        absolute
        left-4
        bottom-4
        p-6
        bg-white
        bg-opacity-75
    `}
    z-index:2;

    h2 {
      ${tw`
        flex
        flex-col
        md:flex-row
        text-xs
        md:text-sm
        font-semibold
        text-gray-600
      `}
    }

    h1 {
      ${tw`
        pt-1
        text-base
        md:text-lg
        font-semibold
      `}
    }

    .next-btn {
      ${tw`
        absolute
        right-0
        bottom-0
        p-3
        w-10
        h-10
        bg-yellow-500
        bg-opacity-80
        translate-x-full
        cursor-pointer

        transition
        duration-200
        ease-in-out
      `}

      :hover {
        ${tw`
            bg-opacity-100
        `}
      }

      img {
        ${tw`
            pointer-events-none
        `}
      }
    }
  }

  :hover {
    img {
      ${tw`
        scale-105
      `}
    }
  }
`

export default SliderList
