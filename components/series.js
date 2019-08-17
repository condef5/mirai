import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/router";

const animationUp = keyframes`
  0% {
    transform: translateY(8%);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const Wrap = styled.div`
  max-width: 1000px;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
`;

const Box = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 6px rgba(47, 83, 151, 0.1);
  border-radius: 6px;
  padding: 16px;
  margin: 1em;
  width: calc(33.3% - 2em);
  box-sizing: border-box;
  animation: ${animationUp} 0.4s ease-out forwards;
  @media (max-width: 768px) {
    width: calc(50% - 2em);
  }
  @media (max-width: 576px) {
    width: calc(100% - 2em);
  }
`;

const Image = styled.img`
  max-width: 100%;
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
`;

export const QUERY_SERIES = gql`
  {
    series {
      id
      image
      name
      tags {
        name
      }
    }
  }
`;

function Series() {
  const { loading, error, data } = useQuery(QUERY_SERIES);
  const router = useRouter();
  const { tag } = router.query;
  if (error) return <div>Error</div>;

  if (loading) return <div>Loading...</div>;

  const { series } = data;

  const filteredSeries = tag
    ? series.filter(serie => serie.tags.some(item => item.name === tag))
    : series;

  return (
    <Wrap>
      {filteredSeries.map(serie => (
        <Box key={serie.id}>
          <Image src={serie.image} style={{ maxWidth: "100%" }} alt="" />
          <h2>{serie.name}</h2>
          <div>
            {serie.tags.map(({ name }) => (
              <span key={name}>#{name} </span>
            ))}
          </div>
        </Box>
      ))}
    </Wrap>
  );
}

export default Series;
