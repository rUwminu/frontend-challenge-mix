import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/actions/cartAction";

// Dumb data
import { productData } from "../../assets/dumb-data/productData";

// Components
import { ProductView } from "../../components/index";

// Svg icon
import { MinusSvg, PlusSvg, CartSvg } from "../../assets/index";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [productList, setProductList] = useState([]);
  const [singleProduct, setSingleProduct] = useState();
  const [productInfo, setProductInfo] = useState();

  const getRandomSingleProduct = () => {
    const random = Math.floor(Math.random() * productList.length);

    setSingleProduct(productList[random]);
    setProductInfo({ ...productList[random], qty: 0 });
  };

  const getSelectedSingleProduct = () => {
    const searchedItem = productList.find((item) => item.id === id);

    setSingleProduct(searchedItem);
    setProductInfo({ ...searchedItem, qty: 0 });
  };

  const handleAddQty = () => {
    setProductInfo({ ...productInfo, qty: (productInfo.qty += 1) });
  };

  const handleMinusQty = () => {
    if (productInfo.qty > 0)
      setProductInfo({ ...productInfo, qty: (productInfo.qty -= 1) });
  };

  const handleAddItemToCart = async () => {
    if (productInfo && productInfo.qty > 0) {
      await dispatch(addItemToCart(productInfo));
    }
  };

  useEffect(() => {
    if (productList.length === 0 && productData) {
      setProductList([...productData]);
    }

    if (id === undefined && productList) {
      console.log("new load");
      getRandomSingleProduct();
    }

    if (id && productList) {
      console.log("select load");
      getSelectedSingleProduct();
    }
  }, [productData, productList, id]);

  //console.log(id);
  //console.log(singleProduct);

  return (
    <ProductContainer>
      {singleProduct && (
        <>
          <div className="product-banner-container">
            <ProductView
              productImg={singleProduct.productImg}
              productThumbnail={singleProduct.productThumbnail}
            />
          </div>
          <ProductInfoContainer className="product-info-container">
            <h3>{singleProduct.brand} COMPANY</h3>
            <h1>{singleProduct.productName}</h1>
            <p>{singleProduct.productBio}</p>
            <div className="price-box">
              <div className="price-main">
                <h2>
                  $
                  {(
                    (singleProduct.price / 100) *
                    (100 - singleProduct.discount)
                  ).toFixed(2)}
                </h2>
                {singleProduct.discount > 0 && (
                  <div className="discount-tag">{singleProduct.discount}%</div>
                )}
              </div>
              {singleProduct.discount > 0 && (
                <small>${singleProduct.price.toFixed(2)}</small>
              )}
            </div>
            <div className="addcart-box">
              <div className="am-box">
                <div
                  onClick={() => handleMinusQty()}
                  className={`btn ${productInfo.qty !== 0 && "active"}`}
                >
                  <img src={MinusSvg} alt="am-svg" />
                </div>
                <span>{productInfo.qty}</span>
                <div onClick={() => handleAddQty()} className={`btn active`}>
                  <img src={PlusSvg} alt="am-svg" />
                </div>
              </div>
              <div className="add-btn" onClick={() => handleAddItemToCart()}>
                <img src={CartSvg} className="icons" alt="cart-svg" />
                Add To Cart
              </div>
            </div>
          </ProductInfoContainer>
        </>
      )}
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  ${tw`
    m-auto
    py-10
    w-full
    max-w-6xl
    flex
    flex-col
    sm:flex-row
    items-center
    sm:items-start
    overflow-x-hidden
  `}

  .product-banner-container {
    ${tw`
      px-6
      xl:px-0
      w-full
      h-full
      max-w-sm
      overflow-x-hidden
    `}
  }

  .product-info-container {
    ${tw`
      px-6
      py-6
      xl:pl-20
      w-full
      h-full
    `}
  }
`;

const ProductInfoContainer = styled.div`
  ${tw`
    
  `}

  h3 {
    ${tw`
      mb-2
      font-semibold
      text-yellow-600
    `}
    text-transform: uppercase;
  }

  h1 {
    ${tw`
      mb-8
      text-3xl
      md:text-4xl
      font-semibold
    `}
  }

  p {
    ${tw`
      mb-4
      text-gray-600
      font-semibold
    `}
  }

  .price-box {
    ${tw`
      mb-4
      flex
      flex-col
      items-start
      justify-start
    `}

    .price-main {
      ${tw`
        mb-1
        flex
        items-center
        justify-start
      `}

      h2 {
        ${tw`
          text-lg
          md:text-xl
          font-semibold
        `}
      }
    }

    .discount-tag {
      ${tw`
        ml-4
        py-[0.5px]
        px-[6px]
        text-sm
        bg-yellow-100
        text-yellow-600
        font-semibold
        rounded-md
      `}
    }

    small {
      ${tw`
        font-semibold
        text-gray-600
      `}
    }
  }

  .addcart-box {
    ${tw`
      w-full
      flex
      flex-col
      md:flex-row
      items-start
      md:items-center
    `}

    .am-box {
      ${tw`
        mr-8
        flex
        items-center
        justify-center
      `}

      .btn {
        ${tw`
          flex
          items-center
          justify-center
          py-2
          w-8
          h-8
          md:w-10
          md:h-10
          border
          rounded-md

          transition
          duration-200
          ease-in-out
        `}
      }

      .btn.active {
        ${tw`
          text-gray-600
          border-gray-600
          cursor-pointer
        `}
      }

      span {
        ${tw`
          px-4
          text-lg
          font-semibold
        `}
      }
    }

    .add-btn {
      ${tw`
        flex
        items-center
        justify-center
        mt-4
        md:mt-0
        py-2
        md:py-2
        w-full
        md:max-w-[12rem]
        bg-yellow-500
        text-white
        font-semibold
        rounded-md
        cursor-pointer

        transition
        duration-200
        ease-in-out
      `}

      .icons {
        ${tw`
          mr-2
        `}
        filter: invert(100%) sepia(1%) saturate(11%) hue-rotate(356deg) brightness(195%) contrast(100%);
      }

      :hover {
        ${tw`
          bg-opacity-90
        `}
      }
    }
  }
`;

export default SingleProduct;
