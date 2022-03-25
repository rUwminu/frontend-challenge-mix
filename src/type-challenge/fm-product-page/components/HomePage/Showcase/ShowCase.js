import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

// Components
import SliderList from "./SliderList/SliderList";

const ShowCase = () => {
  return (
    <ShowCaseContainer>
      <div className="inner-container">
        <div className="info-box">
          <h1>50+ Beautiful rooms Inspiration</h1>
          <p>
            Our Designer already made many beautiful prototype of rooms to
            inspire you
          </p>
          <div className="exp-btn">Expore More</div>
        </div>
        <SliderList />
      </div>
    </ShowCaseContainer>
  );
};

const ShowCaseContainer = styled.div`
  ${tw`
    py-12
    w-full
    min-h-[80vh]
    bg-yellow-50
  `}

  .inner-container {
    ${tw`
        mx-auto
        px-4
        lg:px-0
        h-full
        w-full
        max-w-6xl
        flex
        flex-col
        md:flex-row
        items-center
    `}
  }

  .info-box {
    ${tw`
      pb-14
      w-full
      h-full
    `}

    h1 {
      ${tw`
        mb-3
        text-2xl
        md:text-3xl
        lg:text-4xl
        font-semibold
      `}
    }

    p {
      ${tw`
        mb-4
        w-[90%]
        font-semibold
        text-gray-600
      `}
    }

    .exp-btn {
      ${tw`
        py-2
        px-6
        max-w-[10rem]
        text-center
        font-semibold
        text-white
        bg-yellow-500
        cursor-pointer

        transition
        duration-200
        ease-in-out
      `}

      :hover {
        ${tw`
          bg-opacity-80
        `}
      }
    }
  }
`;

export default ShowCase;
