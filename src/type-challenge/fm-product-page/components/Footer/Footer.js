import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <FooterContainer>
      <div className="inner-container">
        <div className="list-box">
          <h1>SNEAKERS</h1>
          <div className="list-items">
            Worldwide online store since - 2020. We have over 1000+ seller on
            out website.
          </div>
          <div className="list-items">Kuala Lumpur, Malaysia</div>
          <div className="list-items">+60 11 772 6654</div>
        </div>
        <div className="list-box">
          <h1>Menu</h1>
          <div to="/" className="list-items">
            Product
          </div>
          <div to="/" className="list-items">
            Collection
          </div>
          <div to="/" className="list-items">
            Wearable
          </div>
          <div to="/" className="list-items">
            Daily use
          </div>
        </div>
        <div className="list-box">
          <h1>Account</h1>
          <Link
            to="/food-ordering-app-client/user/type?name=profile"
            className="list-items"
          >
            My Cart
          </Link>
          <Link
            to="/food-ordering-app-client/user/type?name=profile"
            className="list-items"
          >
            My Orders
          </Link>
          <Link
            to="/food-ordering-app-client/user/type?name=address"
            className="list-items"
          >
            My Address Book
          </Link>
          <Link
            to="/food-ordering-app-client/user/type?name=order"
            className="list-items"
          >
            My Profile
          </Link>
        </div>
        <div className="list-box">
          <h1>Stay Connected</h1>
          <div className="list-items">Facebook</div>
          <div className="list-items">Instragram</div>
          <div className="list-items">Twitter</div>
        </div>
      </div>
    </FooterContainer>
  )
}

const FooterContainer = styled.div`
  ${tw`
    
    w-full
    pt-14
    pb-10
    border-t-2
    border-gray-200

    transition-all
    duration-200
    ease-in-out
  `}

  .inner-container {
    ${tw`
        mx-auto
        px-6
        xl:px-0
        w-full
        max-w-6xl
        flex
        flex-wrap
      `}

    .list-box {
      ${tw`
        flex
        flex-grow
        flex-col
        items-start
        justify-start
        max-w-[16rem]
      `}

      h1 {
        ${tw`
            mb-3
            text-lg
            font-bold
        `}
      }

      .list-items {
        ${tw`
            mb-1
            text-gray-600
            font-semibold
            cursor-pointer
            
            transition
            duration-200
            ease-in-out
        `}

        :hover {
          ${tw`
            underline
          `}
        }
      }

      :nth-child(3) {
        flex-grow: 2;
      }
    }
  }
`

export default Footer
