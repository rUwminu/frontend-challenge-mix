import React, { useState, useEffect } from 'react'
import axios from 'axios'
import tw from 'twin.macro'
import styled from 'styled-components'
import { Link, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductList } from '../../redux/actions/productAction'

const SearchProduct = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const type = searchParams.get('name')

  const [isLowHigh, setIsLowHigh] = useState(false)
  const [priceFilter, setPriceFilter] = useState({
    min: 0,
    max: 0,
  })
  const [oriSuggestions, setOriSuggestions] = useState([])
  const [filteredSuggestions, setFilteredSuggestions] = useState([])

  const productList = useSelector((state) => state.productList)
  const { allProduct } = productList

  // This api call should be calling route that search for product by name *not get all product
  const getAllProductList = async () => {
    let uri = 'https://staging.flowerchimp.com/asset/json/products.json'

    const res = await axios({
      method: 'GET',
      url: uri,
      responseType: 'stream',
    })

    if (res) dispatch(getProductList(res.data.products))

    console.log(res.data.products)

    return
  }

  const deepFilterLowHigh = () => {
    const compare = (a, b) => {
      const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''))
      const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''))

      return isLowHigh ? bPrice - aPrice : aPrice - bPrice
    }

    const tempArr = oriSuggestions.sort(compare)

    const moreFilter = deepFilterPriceBetween(tempArr)

    setFilteredSuggestions([...moreFilter])
  }

  const deepFilterPriceBetween = (items) => {
    const tempArr = items.map((item) => {
      if (priceFilter.min > 0 && priceFilter.max > 0) {
        return (
          Number(item.price) > priceFilter.min &&
          Number(item.price) < priceFilter.max &&
          item
        )
      } else if (priceFilter.min > 0 && priceFilter.max === 0) {
        return Number(item.price) > priceFilter.min && item
      } else if (priceFilter.max > 0 && priceFilter.min === 0) {
        return Number(item.price) < priceFilter.max && item
      } else {
        return item
      }
    })

    return tempArr.filter((x) => x !== false)
  }

  const handleFilterProductByName = async () => {
    const filterSearchList = await allProduct.filter(
      (suggestion) =>
        suggestion.title.toLowerCase().indexOf(type.toString().toLowerCase()) >
        -1
    )

    console.log(filterSearchList)

    setOriSuggestions(filterSearchList)
    setFilteredSuggestions(filterSearchList)
  }

  const handleFilterBetweenPrice = () => {
    deepFilterLowHigh()
  }

  useEffect(() => {
    if (allProduct.length > 0) {
      console.log('Trigger Filter?')
      handleFilterProductByName()
    } else {
      getAllProductList()
    }
  }, [type, allProduct])

  useEffect(() => {
    deepFilterLowHigh()
  }, [isLowHigh])

  console.log(filteredSuggestions)

  return (
    <SearchContainer>
      <div className='inner-container'>
        <FilterBar>
          <h2>More Filter</h2>
          <div className='filter-box'>
            <div
              className={`filter-item  ${isLowHigh && 'active'}`}
              onClick={() => setIsLowHigh(true)}
            >
              <div className='checkbox' />
              <span>Low to High</span>
            </div>

            <div
              className={`filter-item  ${!isLowHigh && 'active'}`}
              onClick={() => setIsLowHigh(false)}
            >
              <div className='checkbox' />
              <span>High to Low</span>
            </div>
          </div>
          <h2>Price</h2>
          <div className='filter-min-max-box'>
            <div className='price-input-box'>
              <input
                type='number'
                className='input-box'
                onChange={(e) => {
                  if (e.target.value > 0) {
                    setPriceFilter({ ...priceFilter, min: e.target.value })
                  } else {
                    setPriceFilter({ ...priceFilter, min: 0 })
                  }
                }}
                placeholder='min'
              />
              <div className='dash' />
              <input
                type='number'
                className='input-box'
                onChange={(e) => {
                  if (e.target.value > 0) {
                    setPriceFilter({ ...priceFilter, max: e.target.value })
                  } else {
                    setPriceFilter({ ...priceFilter, max: 0 })
                  }
                }}
                placeholder='max'
              />
            </div>
          </div>
          <div
            className='btn filter-price-btn'
            onClick={() => handleFilterBetweenPrice()}
          >
            Search Price
          </div>
        </FilterBar>
        <ProductContainer>
          <h1>Search By {type}</h1>
          <div className='grid-container'>
            {filteredSuggestions.length > 0 &&
              filteredSuggestions.map((item, index) => {
                let discount = 20
                const { id, title, price, image } = item
                return (
                  <ProductCard
                    to={`/frontend-challenge-mix/product/${id}`}
                    key={index}
                    index={index}
                  >
                    <div className='product-img-box'>
                      <img
                        src={image[0]}
                        onError={(e) => (e.target.src = image[1])}
                        alt='product-img'
                      />
                      {discount > 0 && <div className='tag'>{discount}%</div>}
                    </div>
                    <div className='product-info'>
                      <h2>{title}</h2>
                      <div className='product-price-box'>
                        <p>$ {((price / 100) * (100 - discount)).toFixed(2)}</p>
                        {discount > 0 && (
                          <small className='price-ori'>$ {price}</small>
                        )}
                      </div>
                    </div>
                  </ProductCard>
                )
              })}
          </div>
        </ProductContainer>
      </div>
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  ${tw`
    relative
    mx-auto
    px-6
    xl:px-0
    pb-6
    h-full
    w-full
    max-w-6xl
  `}

  .inner-container {
    ${tw`
        flex
        flex-col
        md:flex-row
        items-start
        justify-start
        w-full
        h-full
    `}
  }
`

const FilterBar = styled.div`
  ${tw`
    sticky
    top-24
    flex
    flex-col
    mr-2
    px-2
    pt-3
    pb-6
    w-full
    md:max-w-[12rem]
    lg:max-w-[14rem]
    bg-white
    rounded-md
    z-20
  `}
  box-shadow: 0 0 5px rgba(0,0,0,0.2);

  h2 {
    ${tw`
      mb-1
      font-semibold
    `}
  }

  .filter-box {
    ${tw`
      flex
      md:flex-col
      items-center
      md:items-start
    `}

    .filter-item {
      ${tw`
        flex
        items-center
        justify-center
        mb-2
        cursor-pointer
      `}

      .checkbox {
        ${tw`
          mx-2
          w-4
          h-4
          md:w-5
          md:h-5
          border-2
          border-yellow-500
          rounded-md

          transition
          duration-200
          ease-in-out
        `}
      }

      span {
        ${tw`
          text-sm
          md:text-base
          font-semibold
          pointer-events-none
        `}
      }

      &.active {
        .checkbox {
          ${tw`
            bg-yellow-500
          `}
        }
      }
    }
  }

  .filter-min-max-box {
    ${tw`
      flex
      flex-col
      w-full
    `}

    .price-input-box {
      ${tw`
        flex
        items-center
        justify-between
      `}

      .input-box {
        ${tw`
          p-1
          w-full
          border
          border-gray-600
          rounded-md
        `}
      }

      .dash {
        ${tw`
          mx-2
          w-5
          h-[2px]
          bg-gray-700
        `}
      }
    }
  }

  .filter-price-btn {
    ${tw`
      mt-2
      py-1
      w-full
      text-center
      font-semibold
      bg-yellow-500
      text-gray-200
      rounded-md
      cursor-pointer

      transition
      duration-200
      ease-in-out
    `}

    &:hover {
      ${tw`
        shadow-lg
        bg-yellow-500/90
      `}
    }
  }
`

const ProductContainer = styled.div`
  ${tw`
    flex-grow
    px-2
    pt-28
    min-h-[30rem]
    overflow-y-scroll
    scrollbar-hide
  `}

  h1 {
    ${tw`
        mb-4
        text-xl
        font-semibold
        text-gray-700
    `}
  }

  .grid-container {
    ${tw`
      w-full
      grid
      grid-cols-2 
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      gap-3

      transition-all
      duration-200
      ease-in-out
    `}
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

export default SearchProduct
