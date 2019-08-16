import React from "react";
import styled from "styled-components";
import Series from "./series";

const MainStyle = styled.div`
  width: 100%;
`;

function Main() {
  return (
    <MainStyle>
      <Series />
    </MainStyle>
  );
}

export default Main;
