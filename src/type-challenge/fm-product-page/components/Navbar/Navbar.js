import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeItemFromCart } from '../../redux/actions/cartAction'

// Search Data
import { productSearchData } from '../../assets/dumb-data/productSearchname'

import {
  LogoSvg,
  CartSvg,
  AvatarImg,
  MenuSvg,
  CloseSvg,
  DeleteSvg,
} from '../../assets/index.js'

const Navbar = () => {
  let lastScroll = 0
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const [isActive, setIsActive] = useState(false)
  const [isScrollTop, setIsScrollTop] = useState(true)
  const [isMobile, setIsMobile] = useState()
  const [isSearch, setIsSearch] = useState(false)
  const [input, setInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [isHoverCart, setIsHoverCart] = useState(false)

  const productList = useSelector((state) => state.productList)
  const { allProduct } = productList

  const cartList = useSelector((state) => state.cartList)
  const { myCart } = cartList

  //console.log(myCart);

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
      setIsActive(false)
    }
  }

  const handleScroll = () => {
    const currentTop = window.scrollY

    if (currentTop <= 0) {
      setIsScrollTop(true)
    }
    if (currentTop > lastScroll) {
      setIsScrollTop(false)
    }

    lastScroll = currentTop
  }

  const handleKeyDownSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/sneaker/search/type?name=${input}`)
    }
  }

  const handleSearchItem = (e) => {
    const userInput = e.target.value

    if (userInput === '') {
      setShowSuggestions(false)
      setInput(e.target.value)
      return
    }

    const filterSearchList = allProduct.filter(
      (suggestion) =>
        suggestion.title.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    )

    setInput(e.target.value)
    setFilteredSuggestions(filterSearchList)
    setShowSuggestions(true)
  }

  const handleSelectItemFromList = (id, productName) => {
    setFilteredSuggestions([])
    setInput(productName)
    setShowSuggestions(false)
  }

  const handleRemoveItemFromCart = (id) => {
    dispatch(removeItemFromCart(id))
  }

  useEffect(() => {
    handleResize()
    handleScroll()
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <NavContainer
      className={`${isScrollTop ? 'py-4' : 'py-[10px] bg-white shadow-md'}`}
    >
      <div className={`inner-container`}>
        {isMobile && (
          <Burger
            className={`${isActive && 'line-active'}`}
            onClick={() => setIsActive(!isActive)}
          >
            <div className={`line-1`} />
            <div className={`line-2`} />
            <div className={`line-3`} />
          </Burger>
        )}
        <div className='nav-left-container'>
          <Link to={`/sneaker`}>
            <img className='logo-svg' src={LogoSvg} alt='logo-svg' />
          </Link>
          {!isSearch && (
            <div className='nav-links-box'>
              <Link to='/sneaker' className='nav-item sm:inline-flex'>
                Collections
              </Link>
              <Link to='/sneaker' className='nav-item md:inline-flex'>
                Wearable
              </Link>
              <Link to='/sneaker' className='nav-item md:inline-flex'>
                Daily Use
              </Link>
              <Link to='/sneaker' className='nav-item lg:inline-flex'>
                About
              </Link>
              <Link to='/sneaker' className='nav-item lg:inline-flex'>
                Contact
              </Link>
            </div>
          )}
        </div>
        <div className='nav-right-container'>
          <div className={`search-box ${isSearch && 'active'}`}>
            <img
              onClick={() => setIsSearch(!isSearch)}
              className='search-icon'
              src={isSearch ? CloseSvg : MenuSvg}
              alt='cart-svg'
            />
            <input
              type='text'
              value={input}
              onChange={handleSearchItem}
              onKeyDown={handleKeyDownSearch}
              className='input-box'
            />
            {showSuggestions && (
              <SearchListContainer
                onMouseLeave={() => setShowSuggestions(false)}
              >
                {filteredSuggestions.length ? (
                  <div className='suggestions-box'>
                    {filteredSuggestions.map((suggestion, index) => {
                      const { id, title } = suggestion
                      return (
                        <Link
                          to={`/sneaker/product/${id}`}
                          className={`search-link`}
                          key={index}
                          onClick={() => handleSelectItemFromList(id, title)}
                        >
                          {title}
                        </Link>
                      )
                    })}
                  </div>
                ) : (
                  <em>Don't seen any match your search</em>
                )}
              </SearchListContainer>
            )}
          </div>
          <div className='cart-box' onMouseOver={() => setIsHoverCart(true)}>
            <div className='cart-icon-box'>
              <img className='cart-icon' src={CartSvg} alt='cart-svg' />
              {myCart.length !== 0 && <div className='cart-notify-dot' />}
            </div>
            {isHoverCart && (
              <CartListContainer onMouseLeave={() => setIsHoverCart(false)}>
                <h1 className='cart-title'>Cart</h1>
                {myCart && (
                  <div className='items-container'>
                    {myCart.map((item, index) => {
                      const { id, title, image, price, qty } = item

                      const subtotal = (price / 100) * (100 - 20) * qty

                      return (
                        <div className='item-card' key={id || index}>
                          <div className='banner-box'>
                            <img src={image[0]} alt='banner-img' />
                          </div>
                          <div className='info-box'>
                            <h2>{title}</h2>
                            <h1>
                              ${parseInt(price).toFixed(2)} x {qty}{' '}
                              <span>${subtotal.toFixed(2)}</span>
                            </h1>
                          </div>
                          <div
                            className='del-box'
                            onClick={() => handleRemoveItemFromCart(id)}
                          >
                            <img src={DeleteSvg} alt='del-svg' />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
                {myCart.length === 0 && (
                  <div className='empty-text'>Seen Empty In Cart</div>
                )}
                {myCart.length !== 0 && (
                  <div className='checkout-btn'>Checkout</div>
                )}
              </CartListContainer>
            )}
          </div>
          <div className='avatar-box'>
            <img className='avatar-img' src={AvatarImg} alt='cart-svg' />
          </div>
        </div>
      </div>
      {isMobile && (
        <AbsoluteNav
          className={`${
            isActive ? 'translate-x-0 shadow-md' : '-translate-x-full'
          }`}
        >
          <div className='inner-absolute-container'>
            <Link
              to={`/sneaker`}
              onClick={() => setIsActive(false)}
              className={`nav-item`}
            >
              Collections
            </Link>
            <Link
              to={`/sneaker`}
              onClick={() => setIsActive(false)}
              className={`nav-item`}
            >
              Wearable
            </Link>
            <Link
              to={`/sneaker`}
              onClick={() => setIsActive(false)}
              className={`nav-item`}
            >
              Daily use
            </Link>
            <Link
              to={`/sneaker`}
              onClick={() => setIsActive(false)}
              className={`nav-item`}
            >
              About
            </Link>
            <Link
              to={`/sneaker`}
              onClick={() => setIsActive(false)}
              className={`nav-item`}
            >
              Contact
            </Link>
          </div>
        </AbsoluteNav>
      )}

      {isActive && <div className='bg-cover' />}
    </NavContainer>
  )
}

const NavContainer = styled.div`
  ${tw`
    fixed
    top-0
    left-0
    w-full
    border-b
    border-gray-300

    transition-all
    duration-500
    ease-in-out

    z-30
  `}

  .inner-container {
    ${tw`
      px-6
      xl:px-0
      mx-auto
      w-full
      md:max-w-6xl
      flex
      items-center
      justify-start

      transition-all
      duration-200
      ease-in-out
    `}
  }

  .nav-left-container {
    ${tw`
      flex-grow
      flex
      items-center
      justify-start
    `}

    .logo-svg {
      ${tw`
        mr-8
        h-4
        md:h-6
      `}
    }

    .nav-links-box {
      ${tw`
        flex
        items-center
        justify-center
      `}

      .nav-item {
        ${tw`
          relative
          mx-4
          md:text-lg
          font-semibold
          text-gray-700
          cursor-pointer
          hidden
        `}

        :after {
          content: '';

          ${tw`
            absolute
            bottom-0
            left-0
            w-0
            h-[2.5px]
            bg-yellow-600

            transition-all
            duration-500
            ease-in-out
          `}
        }

        :hover {
          ${tw`
            text-gray-900
          `}

          :after {
            ${tw`
              w-full
            `}
          }
        }
      }
    }
  }

  .nav-right-container {
    ${tw`
      flex
      items-center
      justify-center
    `}

    .search-box {
      ${tw`
        relative
        h-10
        w-10
        rounded-3xl

        transition-all
        duration-500
        ease-in-out
      `}

      .search-icon {
        ${tw`
          absolute
          top-[50%]
          -translate-y-1/2
          left-[50%]
          -translate-x-1/2
          cursor-pointer

          transition-all
          duration-500
          ease-in-out
        `}
      }

      .input-box {
        ${tw`
          w-full
          h-full
          bg-gray-100
          rounded-3xl
          hidden
          pointer-events-none
        `}

        :focus {
          ${tw`
            outline-none
          `}
        }
      }

      :hover {
        ${tw`
          bg-gray-200
        `}
      }
    }

    .search-box.active {
      ${tw`
        w-44
        md:w-60
      `}

      .search-icon {
        ${tw`
          left-3
          translate-x-0
        `}
      }

      .input-box {
        ${tw`
          pl-9
          pr-3
          inline-flex
          pointer-events-auto
        `}
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
      }
    }

    .cart-box {
      ${tw`
        ml-4
        static
        md:relative

        transition-all
        duration-500
        ease-in-out
      `}

      .cart-icon-box {
        ${tw`
          relative
          w-10
          h-10
          p-[0.6rem]
          rounded-full
        `}

        .cart-icon {
          ${tw`
            w-full
            h-full
          `}
        }

        .cart-notify-dot {
          ${tw`
            absolute
            top-1
            right-1
            w-3
            h-3
            bg-yellow-600
            rounded-full
          `}
        }

        :hover {
          ${tw`
          bg-gray-200
        `}
        }
      }
    }

    .avatar-box {
      ${tw`
        w-14
        h-14
        ml-6
        flex
        items-center
        justify-center
        border-[3px]
        border-yellow-600
        rounded-full
      `}

      .avatar-img {
        ${tw`

          w-full
          h-full
        `}
      }
    }
  }

  .bg-cover {
    ${tw`
      absolute
      top-0
      right-0
      h-screen
      w-full
      bg-gray-700
      bg-opacity-50

      transition-all
    `}
    animation: fadeInBg 0.5s ease-in-out alternate forwards;
  }

  // Burger line animation
  .line-active {
    .line-1 {
      ${tw`
        -rotate-45
        translate-x-[0px]
        translate-y-[6px]
        md:translate-x-[-0px]
        md:translate-y-[8px]
      `}//transform: rotate(-45deg) translate(-6px, 6px);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
    }

    .line-2 {
      opacity: 0;
      transform: translate(-100%);
    }

    .line-3 {
      ${tw`
        rotate-45
        translate-x-[-0px]
        translate-y-[-4px]
        md:translate-x-[-0px]
        md:translate-y-[-7.5px]
      `}
    }
  }

  @keyframes fadeInBg {
    from {
      ${tw`
        opacity-0
      `}
    }
    to {
      ${tw`
        opacity-100
      `}
    }
  }
`

const Burger = styled.div`
  ${tw`
    mr-2
    h-10
    w-10
    md:h-12
    md:w-12
    p-3
    flex
    flex-col
    items-center
    justify-around
    cursor-pointer
    bg-opacity-90
    hover:bg-gray-200
    rounded-full
    transition
    duration-200
    ease-in-out
    overflow-hidden
    z-30
  `}

  div {
    ${tw`
      w-5
      md:w-6
      h-[2px]
      bg-gray-900
      transition
      duration-200
      ease-in-out
    `}
  }
`

const AbsoluteNav = styled.div`
  ${tw`
    relative
    absolute
    top-0
    left-0
    w-screen
    h-screen

    transition-all
    duration-500
    ease-in-out
    z-10
  `}

  .inner-absolute-container {
    ${tw`
      pt-24
      px-6
      w-[80%]
      h-full
      flex
      flex-col
      items-start
      bg-white
    `}
    z-index: 5;
  }

  .nav-item {
    ${tw`
      relative
      w-24
      mb-4
      text-lg
      font-semibold
      text-gray-700
      cursor-pointer
    `}

    :after {
      content: '';

      ${tw`
        absolute
        bottom-0
        left-0
        w-0
        h-[2.5px]
        bg-yellow-600

        transition-all
        duration-500
        ease-in-out
      `}
    }

    :hover {
      ${tw`
        text-gray-900
      `}

      :after {
        ${tw`
          w-full
        `}
      }
    }
  }
`

const SearchListContainer = styled.div`
  ${tw`
    absolute
    right-0
    top-14
    w-72
    min-h-[10rem]
    bg-white
    shadow-xl
    rounded-md
  `}

  .suggestions-box {
    ${tw`
      flex
      flex-col
      w-full
      h-full
      overflow-y-scroll
      scrollbar-hide
    `}

    .search-link {
      ${tw`
        py-2
        px-2
        w-full
        font-semibold
        cursor-pointer
        rounded-sm

        transition
        duration-200
        ease-in-out
      `}

      :hover {
        ${tw`
          bg-gray-100
        `}
      }
    }
  }

  em {
    ${tw`
      py-2
      px-3
      font-semibold
    `}
  }
`

const CartListContainer = styled.div`
  ${tw`
    absolute
    bottom-0
    right-[50%]
    md:right-0
    translate-x-1/2
    md:translate-x-0
    lg:translate-x-1/4
    xl:translate-x-1/3
    translate-y-[100%]
    w-[95%]
    md:w-72
    p-4
    bg-white
    rounded-md
    shadow-lg

    transition-all
    duration-500
    ease-in-out
  `}

  .cart-title {
    ${tw`
      pb-3
      text-lg
      font-semibold
      border-b
      border-gray-300
    `}
  }

  .items-container {
    ${tw`
      w-full
      max-h-[15rem]
      overflow-y-scroll
      scrollbar-hide
    `}
  }

  .item-card {
    ${tw`
      mt-3
      w-full
      flex
      items-center
      justify-start
    `}

    .banner-box {
      ${tw`
        w-12
        min-w-max
        h-12
        rounded-md
        overflow-hidden
      `}

      img {
        ${tw`
            w-full
            h-full
            object-cover
         `}
      }
    }

    .info-box {
      ${tw`
        flex-grow
        flex
        flex-col
        ml-2
      `}

      h2 {
        ${tw`
          text-[13px]
          font-semibold
          text-gray-600
        `}
      }

      h1 {
        ${tw`
          text-sm
          font-semibold
          text-gray-600
        `}

        span {
          ${tw`
            text-[15px]
            font-bold
            text-gray-900
          `}
        }
      }
    }

    .del-box {
      ${tw`
        flex
        items-center
        justify-center
        w-8
        h-8
        p-1
        rounded-md
        cursor-pointer

        transition
        duration-200
        ease-in-out
      `}

      img {
        ${tw`
          transition
          duration-200
          ease-in-out
        `}
      }

      :hover {
        ${tw`
          bg-gray-200
        `}

        img {
          filter: invert(46%) sepia(65%) saturate(6035%) hue-rotate(342deg)
            brightness(99%) contrast(104%);
        }
      }
    }
  }

  .checkout-btn {
    ${tw`
      mt-2
      py-1
      w-full
      text-lg
      text-center
      font-semibold
      bg-yellow-500
      text-white
      rounded-md
      cursor-pointer

      transition
      duration-200
      ease-in-out
    `}

    :hover {
      ${tw`
        bg-yellow-400
        shadow-md
      `}
    }
  }
`

export default Navbar
