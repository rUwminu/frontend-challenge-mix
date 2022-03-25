import tw from "twin.macro";
import styled from "styled-components";

import MainPage from "./type-challenge/fm-product-page/pages/MainPage";
import StopWatch from "./type-challenge/fm-product-page/pages/StopWatch/StopWatch";

function App() {
  return (
    <MainContainer className="App">
      <MainPage />
      {/* <StopWatch /> */}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  ${tw`
    w-full
  `}
`;

export default App;
