import React from "react";
import styled, { keyframes } from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";
import { useRouter } from "next/router";
import MenuIcon from "./icons/menu";

const animationNav = keyframes` 
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
  `;

export const QUERY_TAGS = gql`
  {
    tags {
      id
      name
    }
  }
`;

const SidebarStyle = styled.nav`
  background: #ffffff;
  box-shadow: 1px 0 16px rgba(102, 118, 222, 0.1);
  width: 200px;
  position: sticky;
  height: 100vh;
  top: 0;
  z-index: 10;
  animation: ${animationNav} 0.25s ease-out forwards;
  @media (max-width: 1000px) {
    display: ${props => (props.active ? "fixed" : "none")};
  }
`;

const WrapStyle = styled.div`
  padding: 16px;
`;

const NavHeader = styled.h2`
  margin-top: 30px;
  color: #212121;
  font-size: 18px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: blue;
  text-transform: capitalize;
  color: ${props => (props.active ? "#5156e5" : "#818c9f")};
  font-family: "Montserrat-Medium";
  font-size: 14px;
  padding: 8px 0;
  display: block;
  &:hover {
    color: #5156e5;
  }
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
  @media (min-width: 1001px) {
    display: none;
  }
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 5;
  height: 100vh;
  width: 100%;
  top: 0;
  background-color: rgba(33, 33, 33, 0.8);
  transition: all 0.1s;
  @media (min-width: 1001px) {
    display: none;
  }
`;

function Sidebar() {
  const { loading, error, data } = useQuery(QUERY_TAGS);
  const [show, setShow] = React.useState(false);
  const router = useRouter();
  const { tag: activeTag } = router.query;

  if (error) return <div>Error</div>;

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {show && <Overlay onClick={() => setShow(false)} />}
      <MobileMenu onClick={() => setShow(true)}>
        <MenuIcon />
      </MobileMenu>
      <SidebarStyle active={show}>
        <WrapStyle>
          <NavHeader>Categories</NavHeader>
          <Link href={{ pathname: "/" }} passHref>
            <StyledLink active={!activeTag}>Home</StyledLink>
          </Link>
          <div>
            {data.tags.map(tag => (
              <div key={tag.id}>
                <Link
                  href={{ pathname: "/", query: { tag: tag.name } }}
                  passHref
                >
                  <StyledLink active={tag.name === activeTag}>
                    {tag.name}
                  </StyledLink>
                </Link>
              </div>
            ))}
          </div>
        </WrapStyle>
      </SidebarStyle>
    </>
  );
}

export default Sidebar;
