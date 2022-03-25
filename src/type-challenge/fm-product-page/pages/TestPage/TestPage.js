import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

// images
//import Product1 from '../../assets/product-imgs/image-product-1.jpg'
import Product1 from '../../assets/product-imgs/l2.png'

const TestPage = () => {
  return (
    <SectionContainer>
      <div className="img-container">
        <TransformWrapper initialScale={1} maxScale={7}>
          <TransformComponent>
            <img src={Product1} alt="test-img" />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </SectionContainer>
  )
}

const SectionContainer = styled.div`
  ${tw`
    flex
    items-center
    justify-center
    px-6
    h-screen
    w-screen
  `}

  .img-container {
    ${tw`
        relative
        w-full
        max-w-md
        border-2
        border-red-600        
    `}

    img {
      object-position: left bottom;
    }
  }
`

export default TestPage
