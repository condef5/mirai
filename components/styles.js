import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background: #f2f2f2;
    margin: 0;
    color: ${props => (props.whiteColor ? "white" : "black")};
    min-height: 100vh;
  }
  ::-webkit-scrollbar {
    -webkit-border-radius: 5px;
    background-color: transparent;
    border-radius: 5px;
    height: 10px;
    transition: background-color 0.2s linear;
    width: 10px;
  }
  ::-webkit-scrollbar:hover {
    background-color: rgba(0, 0, 0, 0.09);
    transition: background-color 0.2s linear;
  }
  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 5px;
    background: #aaa;
    background-clip: padding-box;
    border: 2px solid transparent;
    border-radius: 5px;
    transition: background-color 0.2s linear;
  }
  ::-webkit-scrollbar-thumb:active {
    -webkit-border-radius: 5px;
    background: rgba(0, 0, 0, 0.4);
    background-clip: padding-box;
    border: 1px solid transparent;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:vertical {
    min-height: 10px;
  }
  ::-webkit-scrollbar-thumb:horizontal {
    min-width: 10px;
  }
`;
