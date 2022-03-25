import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getProductList } from '../../../redux/actions/productAction'

// Dumb data
import { productData } from '../../../assets/dumb-data/productData'

const ProductList = () => {
  const dispatch = useDispatch()

  const [proItemValue, setProItemValue] = useState(8)
  const [proItemList, setProItemList] = useState([])

  const productList = useSelector((state) => state.productList)
  const { allProduct } = productList

  const handleGetProduct = () => {
    const newArr = productData.slice(proItemValue, proItemValue + 8)

    dispatch(getProductList(newArr))

    setProItemValue(proItemValue + 8)
  }

  useEffect(() => {
    if (allProduct.length === 0 && productData) {
      const newArr = productData.slice(0, 8)

      dispatch(getProductList(newArr))
    }
  }, [productData, allProduct])

  useEffect(() => {
    if (allProduct) setProItemList([...allProduct])
  }, [allProduct])

  return (
    <ProductContainer>
      <h1>Our Products</h1>
      <div className='product-box'>
        {proItemList &&
          proItemList.map((item, index) => {
            const { id, productName, brand, price, discount, productImg } = item
            return (
              <ProductCard to={`product/${id}`} key={id || index} index={index}>
                <div className='product-img-box'>
                  <img src={productImg[0].image} alt='product-img' />
                  {discount > 0 && <div className='tag'>{discount}%</div>}
                </div>
                <div className='product-info'>
                  <h2>{productName}</h2>
                  <small className='product-brand'>{brand}</small>
                  <div className='product-price-box'>
                    <p>$ {(price / 100) * (100 - discount)}</p>
                    {discount > 0 && (
                      <small className='price-ori'>$ {price}</small>
                    )}
                  </div>
                </div>
              </ProductCard>
            )
          })}
      </div>
      <div className='more-btn' onClick={() => handleGetProduct()}>
        Show more
      </div>
    </ProductContainer>
  )
}

const ProductContainer = styled.div`
  ${tw`
    mx-auto
    py-12
    px-6
    md:px-0
    w-full
    md:max-w-6xl
    flex
    flex-col
    items-center
    justify-center
  `}

  h1 {
    ${tw`
      mb-6
      text-lg
      md:text-xl
      lg:text-2xl
      font-semibold
    `}
  }

  .product-box {
    ${tw`
      w-full
      grid
      grid-cols-2 
      sm:grid-cols-3
      md:grid-cols-4
      gap-3

      transition-all
      duration-200
      ease-in-out
    `}
  }

  .more-btn {
    ${tw`
      mt-6
      py-1
      w-full
      max-w-[18rem]
      text-lg
      text-center
      text-yellow-500
      font-semibold
      border
      border-yellow-500

      transition
      duration-200
      ease-in-out
    `}

    :hover {
      ${tw`
        text-white
        bg-yellow-500
      `}
    }
  }
`

const ProductCard = styled(Link)`
  ${tw`
    flex
    flex-col
    bg-gray-100  
    rounded-sm
    overflow-hidden

    opacity-0
  `}

  animation: ${(props) =>
    `fadeInFromBottom 0.5s ease-in-out forwards ${props.index / 7 + 0.5}s`};

  :hover {
    ${tw`
      shadow-xl
    `}

    .product-img-box {
      img {
        ${tw`
          scale-110
        `}
      }
    }
  }

  .product-img-box {
    ${tw`
      relative
      w-full
      overflow-hidden
    `}

    &:after {
      content: '';
      display: block;
      padding-bottom: 100%;
    }

    img {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      z-index: 0;

      ${tw`
        transition-all
        duration-200
        ease-in-out
      `}
    }

    .tag {
      ${tw`
      absolute
      top-3
      right-3
      w-8
      h-8
      flex
      items-center
      justify-center
      text-sm
      text-white
      font-semibold
      bg-opacity-75
      bg-yellow-500
      rounded-full
    `}
      z-index: 1;
    }
  }

  .product-info {
    ${tw`
      pl-3
      py-2
    `}

    h2 {
      ${tw`
        md:text-lg
        font-semibold
      `}
    }

    .product-brand {
      ${tw`
        font-semibold
        text-gray-600
      `}
    }

    .product-price-box {
      ${tw`
        flex
        items-center
        justify-start
      `}

      p {
        ${tw`
          font-semibold
        `}
      }

      .price-ori {
        ${tw`
          ml-4
          line-through
          font-semibold
          text-gray-600
        `}
      }
    }
  }

  @keyframes fadeInFromBottom {
    from {
      opacity: 0;
      transform: translateY(100px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`

export default ProductList
