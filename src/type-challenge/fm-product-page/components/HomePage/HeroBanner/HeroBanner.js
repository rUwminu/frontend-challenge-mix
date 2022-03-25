import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

// Svg icon
import {
  Banner1,
  Banner2,
  Banner3,
  PreSvg,
  NextSvg,
} from '../../../assets/index'

const BannerImgArr = [
  {
    id: 'b1',
    bannerImg: Banner1,
  },
  {
    id: 'b2',
    bannerImg: Banner2,
  },
  {
    id: 'b3',
    bannerImg: Banner3,
  },
  {
    id: 'b4',
    bannerImg: Banner2,
  },
]

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(1)

  useEffect(() => {
    const lastIndex = BannerImgArr.length - 1

    if (currentIndex < 0) {
      setCurrentIndex(lastIndex)
    }

    if (currentIndex > lastIndex) {
      setCurrentIndex(0)
    }
  }, [currentIndex])

  //Auto slide to next slide in 3s
  useEffect(() => {
    let slider = setInterval(() => {
      setCurrentIndex(currentIndex + 1)
    }, 8000)

    //run one time after one
    return () => clearInterval(slider)
  }, [currentIndex])

  return (
    <HeroContianer>
      <div className="inner-container">
        <BannerSliderContainer>
          {BannerImgArr &&
            BannerImgArr.map((item, index) => {
              const { id, bannerImg } = item

              let position = 'hideSlideV'

              if (currentIndex === index) {
                position = 'activeSlideV'
              }

              if (
                currentIndex === index - 1 ||
                (index === 0 && currentIndex === BannerImgArr.length - 1)
              ) {
                position = 'lastSlideV'
              }

              if (currentIndex === index + 1) {
                position = 'nextSlideV'
              }

              return (
                <SliderCard key={id || index} className={position}>
                  <img src={bannerImg} alt="banner-img" />
                </SliderCard>
              )
            })}
        </BannerSliderContainer>
        <InfoCard>
          <div className="hero-card-container">
            <h1>High-Quality Product Just For You</h1>
            <p>
              We pick the most reliable seller and the best product that are
              well details that are suitable for listing in page
            </p>
            <div className="shop-btn">Shop Now</div>
          </div>
          <div className="slide-controller-container">
            <div className="inner-slider-container">
              <div className="slider-dot-box">
                {BannerImgArr &&
                  BannerImgArr.map((item, index) => (
                    <div
                      key={item.id || index}
                      className={`dot-item ${
                        currentIndex === index && 'active'
                      }`}
                    >
                      <div className={`dot-bg`} />
                    </div>
                  ))}
              </div>
              <div className="slider-control-box">
                <div
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                  className="control-btn prev-btn"
                >
                  <img src={PreSvg} alt="prev-svg" />
                </div>
                <div
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  className="control-btn next-btn"
                >
                  <img src={NextSvg} alt="next-svg" />
                </div>
              </div>
            </div>
          </div>
        </InfoCard>
      </div>
    </HeroContianer>
  )
}

const HeroContianer = styled.div`
  ${tw`
    h-full
    w-full
  `}

  .inner-container {
    ${tw`
      relative
      mx-auto
      mt-60
      md:mt-0
      px-6
      lg:px-0
      h-full
      w-full
      md:max-w-6xl
      flex
      items-end
      justify-center
      md:justify-end
    `}
  }
`

const BannerSliderContainer = styled.div`
  ${tw`
    relative
    mt-28
    h-[28rem]
    w-3/4
  `}

  .activeSlideV {
    opacity: 1;
    transform: translateX(0);
    z-index: 1;
  }

  .lastSlideV {
    opacity: 1;
    transform: translateX(-102.5%);
  }

  .nextSlideV {
    opacity: 1;
    transform: translateX(102.5%);
  }

  .hideSlideV {
    opacity: 0;
    transform: translateX(-102.5%);
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

    transition-all
    duration-200
    ease-in-out
  `}

  img {
    ${tw`
      w-full
      h-full
      object-cover
    `}
  }
`

const InfoCard = styled.div`
  ${tw`
    absolute
    -mt-60
    md:mt-0
    px-6
    lg:px-0
    top-0
    left-0
    h-full
    w-full
    flex
    flex-col
    md:flex-row
    items-start
    justify-between
  `}
  z-index: 2;

  .hero-card-container {
    ${tw`
      border-2
      p-10
      mt-8
      h-96
      md:h-[29rem]
      w-full
      md:max-w-sm
      bg-white
      bg-opacity-80
      shadow-sm
      rounded-sm
    `}

    h1 {
      ${tw`
        mt-3
        w-full
        text-4xl
        md:text-5xl
        font-bold
        text-gray-800
      `}
      line-height: 1.6;
    }

    p {
      ${tw`
        py-6
        font-semibold
        text-gray-600
      `}
    }

    .shop-btn {
      ${tw`
        mt-4
        py-3
        w-full
        md:text-lg
        text-center
        text-white
        bg-yellow-500
        font-semibold
        cursor-pointer

        transition
        duration-200
        ease-in-out
      `}

      :hover {
        ${tw`
          bg-yellow-500
        `}
      }
    }
  }

  .slide-controller-container {
    ${tw` 
      md:pl-6
      h-full
      w-full
      md:w-3/4    
    `}

    .inner-slider-container {
      ${tw`
        pt-6 
        md:pt-12
        w-full
        h-full

        flex
        items-start
        justify-between
      `}
    }

    .slider-dot-box {
      ${tw`        
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

    .slider-control-box {
      ${tw`
        flex
        items-center
        justify-center
      `}

      .control-btn {
        ${tw`
          ml-2
          w-10
          h-10
          p-2
          flex
          items-center
          justify-center
          bg-yellow-100
          rounded-full
          cursor-pointer

          transition
          duration-200
          ease-in-out
        `}

        img {
          ${tw`
            transition-all
            duration-200
            ease-in-out
            pointer-events-none
          `}
          filter: invert(48%) sepia(100%) saturate(1894%) hue-rotate(7deg)
            brightness(94%) contrast(95%);
        }

        :hover {
          ${tw`
            bg-yellow-500
          `}

          img {
            filter: invert(95%) sepia(0%) saturate(0%) hue-rotate(122deg)
              brightness(103%) contrast(107%);
          }
        }
      }
    }
  }
`

export default HeroBanner
