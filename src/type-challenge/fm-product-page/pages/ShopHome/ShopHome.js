import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

import {
  HeroBanner,
  Feature,
  ProductList,
  ShowCase,
} from '../../components/index'

// Svg
import { TrophySvg, ShippingSvg, GuarantSvg, CsSvg } from '../../assets/index'

const featureTagContent = [
  {
    id: 't1',
    icon: TrophySvg,
    title: 'Hight Quality',
    body: 'Only selected seller',
  },
  {
    id: 't2',
    icon: GuarantSvg,
    title: 'Warrany Protection',
    body: 'Full refund in 7 days',
  },
  {
    id: 't3',
    icon: ShippingSvg,
    title: 'Free Shipping',
    body: 'Order over 150 $',
  },
  {
    id: 't4',
    icon: CsSvg,
    title: '24 / 7 Support',
    body: 'Dedicated support',
  },
]

const ShopHome = () => {
  return (
    <PageContainer>
      <HeroBanner />
      <FeatureTageContainer>
        {featureTagContent && (
          <div className={`feature-tag-box`}>
            {featureTagContent.map((tag) => {
              const { id, icon, title, body } = tag

              return (
                <div key={id} className='tag-card'>
                  <div className='tag-icon'>
                    <img src={icon} alt='tag-svg' />
                  </div>
                  <div className='tag-info'>
                    <h2>{title}</h2>
                    <p>{body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </FeatureTageContainer>
      <ProductList />
      <Feature />
      <ShowCase />
    </PageContainer>
  )
}

const PageContainer = styled.div`
  ${tw`
    w-screen
    overflow-x-hidden
  `}
`

const FeatureTageContainer = styled.div`
  ${tw`
    mx-auto
    py-8
    px-6
    md:px-0
    w-full
    md:max-w-6xl
  `}

  .feature-tag-box {
    ${tw`
      grid
      grid-cols-2 
      lg:grid-cols-4
      gap-3
    `}

    .tag-card {
      ${tw`
        py-8
        flex
        flex-col
        lg:flex-row
        items-center
        justify-center
      `}

      .tag-icon {
        ${tw`
          lg:mr-4
          w-full
          h-full
          max-w-[2.7rem]
          max-h-[2.7rem]
          md:max-w-[3rem]
          md:max-h-[3rem]
          flex
          items-center
          justify-center
        `}

        img {
          ${tw`
            w-full
            h-full
          `}
        }
      }

      .tag-info {
        ${tw`
          flex
          flex-col
          items-center
          lg:items-start
          justify-center
        `}

        h2 {
          ${tw`
            md:text-lg
            font-semibold
          `}
        }

        p {
          ${tw`
            text-sm
            lg:text-base
            font-semibold
            text-gray-600
          `}
        }
      }
    }
  }
`

export default ShopHome
