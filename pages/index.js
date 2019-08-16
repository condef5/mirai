import Head from "next/head";
import styled from "styled-components";
import Sidebar from "../components/sidebar";
import Main from "../components/main";
import { GlobalStyle } from "../components/styles";

const Wrap = styled.div`
  display: flex;
`;

export default function HomePage() {

  return (
    <main>
      <GlobalStyle />
      <Head>
        <title>Loop | Series for everyone</title>
      </Head>
      <Wrap>
        <Sidebar />
        <Main />
      </Wrap>
    </main>
  );
}
